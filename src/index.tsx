import React from 'react'

type InjectionToken = string

type ValueProvider = {
  provide: InjectionToken
  useValue: any
}

type ConstructorProvider = {
  provide: InjectionToken
  useClass: any
}

type FactoryProvider = {
  provide: InjectionToken
  useFactory: any
  deps?: InjectionToken[]
}

type Provider = ValueProvider | ConstructorProvider | FactoryProvider

const injector = (dependencies: Provider[] = []) => {
  const dependencyMap = new Map<any, any>()

  function provide(dependency: Provider) {
    let token
    let dep

    if (Object.hasOwnProperty.call(dependency, 'useValue')) {
      token = (dependency as ValueProvider).provide
      dep = (dependency as ValueProvider).useValue
    }
    if (Object.hasOwnProperty.call(dependency, 'useClass')) {
      token = (dependency as ConstructorProvider).provide
      // eslint-disable-next-line new-cap
      dep = new (dependency as ConstructorProvider).useClass()
    }

    if (Object.hasOwnProperty.call(dependency, 'useFactory')) {
      token = (dependency as FactoryProvider).provide
      dep = (dependency as FactoryProvider).useFactory()
    }

    if (typeof dependency === 'function') {
      dep = new (dependency as any)()
      token = dependency
    }

    dependencyMap.set(token, dep)
  }

  dependencies.forEach((dep: any) => provide(dep))

  const get = (dependency: any) => {
    const dep = dependencyMap.get(dependency)

    if (!dep) {
      throw new Error(`Missing Dependency`)
    }

    return dep
  }

  return { get }
}

type InjectorContextType = {
  injector: {
    get: (dependency: any) => {}
  }
}

export const InjectorContext = React.createContext<InjectorContextType>({
  injector: injector()
})

export const InjectorContextProvider = ({ dependencies, children }: any) => {
  return (
    <InjectorContext.Provider value={{ injector: injector(dependencies) }}>
      {children}
    </InjectorContext.Provider>
  )
}

const InjectorContextConsumer = ({
  component: Component,
  dependencyList
}: any) => {
  const { injector } = React.useContext(InjectorContext)

  const compDeps = dependencyList.map((dep: any) => {
    return injector.get(dep)
  })

  return React.cloneElement(Component, {
    ...Component.props,
    dependencies: compDeps
  } as any)
}

export const withDependencies = (
  component: any,
  dependencyList: any[]
): any => {
  return React.memo(() =>
    InjectorContextConsumer({ component, dependencyList })
  )
}
