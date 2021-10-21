/* eslint-disable new-cap */
import { DepGraph, DepGraphCycleError } from 'dependency-graph'
import { ConstructorProvider, InjectionToken, Provider, ProviderConfigs } from './provider.type'

export class Injector {
  private dependencyGraph = new DepGraph<any>()

  constructor(dependencies: Provider[] = [], private parentInjector: Injector | null = null) {
    dependencies.forEach((dep: any) => this.registerProvider(dep))
    this.resolveDependencies()
  }

  private registerProvider(dependency: Provider): void {
    const { provide: providerToken, ...configs } = dependency
    this.dependencyGraph.addNode(providerToken, configs)
  }

  private markDependencies(): void {
    this.dependencyGraph
      .overallOrder()
      .map((dep) => [dep, this.dependencyGraph.getNodeData(dep)])
      .forEach(([token, configs]) => {
        const deps = (configs as any).deps ? (configs as any).deps : []

        deps.forEach((dep: string) => {
          try {
            this.dependencyGraph.addDependency(token, dep)
          } catch (e) {
            if (e instanceof DepGraphCycleError) {
              throw e
            }
            if ((e as Error).message.includes('Node does not exist')) {
              let parentInjector = this.parentInjector
              let parentDep
              while (parentInjector) {
                try {
                  parentDep = parentInjector.inject(dep)
                  break
                } catch (e) {
                  parentInjector = parentInjector.parentInjector
                }
              }

              if (parentDep) {
                this.dependencyGraph.addNode(dep, { instance: parentDep })
                this.dependencyGraph.addDependency(token, dep)
              } else {
                throw new Error(`Could not resolve dependency: ${dep} for Injectable: ${token}`)
              }
            }
          }
        })
      })
  }

  private getConstructorFunc(providerToken: string, providerConfig: ProviderConfigs): Function {
    let constructorFunc
    if (Object.prototype.hasOwnProperty.call(providerConfig, 'useClass')) {
      constructorFunc = (...deps: any) => {
        return new (
          this.dependencyGraph.getNodeData(providerToken) as ConstructorProvider
        ).useClass({ deps })
      }
    }

    if (Object.prototype.hasOwnProperty.call(providerConfig, 'useFactory')) {
      constructorFunc = this.dependencyGraph.getNodeData(providerToken).useFactory
    }

    if (Object.prototype.hasOwnProperty.call(providerConfig, 'useValue')) {
      constructorFunc = () => this.dependencyGraph.getNodeData(providerToken).useValue
    }

    return constructorFunc
  }

  private resolveDependencies(): void {
    this.markDependencies()

    this.dependencyGraph.overallOrder().forEach((providerToken: string) => {
      const providerConfig = this.dependencyGraph.getNodeData(providerToken)

      const constructorFunc = this.getConstructorFunc(providerToken, providerConfig)

      let deps = (providerConfig as any).deps ? (providerConfig as any).deps : []
      deps = deps.map((dep: string) => this.dependencyGraph.getNodeData(dep).instance)

      if (providerConfig?.instance == null) {
        const instance = constructorFunc(...deps)

        this.dependencyGraph.setNodeData(providerToken, {
          ...providerConfig,
          instance
        })
      }
    })
  }

  public inject(service: InjectionToken) {
    const dep = this.dependencyGraph.getNodeData(service).instance

    if (!dep) {
      throw new Error(`Could not find provider :${service}`)
    }

    return dep
  }
}
