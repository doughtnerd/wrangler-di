import React, { useEffect } from 'react'
import { Injector } from './Injector'
import { Provider } from './provider.type'

type InjectorContextType = {
  injector: Injector
}

const InjectorContext = React.createContext<InjectorContextType>({
  injector: new Injector()
})

export type InjectorContextProviderProps = {
  providers: Provider[]
  children: React.ReactElement<any>
}

export const InjectorContextProvider = ({
  providers,
  children
}: InjectorContextProviderProps) => {
  const parentInjector = React.useContext(InjectorContext)
  return (
    <InjectorContext.Provider
      value={{ injector: new Injector(providers, parentInjector.injector) }}
    >
      {children}
    </InjectorContext.Provider>
  )
}

const InjectorContextConsumer = ({
  component: Component,
  dependencyList
}: any) => {
  const { injector } = React.useContext(InjectorContext)
  const [compDeps] = React.useState(() =>
    dependencyList.map((dep: any) => {
      return injector.inject(dep)
    })
  )

  return React.cloneElement(Component, {
    ...Component.props,
    deps: compDeps
  } as any)
}

export const withDependencies = (
  component: any,
  dependencyList: string[]
): any => {
  return React.memo(() =>
    InjectorContextConsumer({ component, dependencyList })
  )
}

export const withInjector = (component: any, providers: Provider[]) => {
  return React.memo(() => {
    return (
      <InjectorContextProvider providers={providers}>
        {component}
      </InjectorContextProvider>
    )
  })
}

export function useInjector() {
  const { injector } = React.useContext(InjectorContext)

  return { injector }
}

export function useProviders(providerList: string[]) {
  const { injector } = React.useContext(InjectorContext)

  const [providers, setProviders] = React.useState<Provider[]>([])

  useEffect(() => {
    setProviders(providerList.map((provider) => injector.inject(provider)))
  }, providerList)

  return providers
}

export type { Provider } from './provider.type'
