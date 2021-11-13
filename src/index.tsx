import React from 'react'
import { Injector } from './Injector'
import { Provider } from './provider.type'

type InjectorContextType = {
  injector: Injector
}

const InjectorContext = React.createContext<InjectorContextType | null>(null)

export type InjectorContextProviderProps = {
  providers: Provider[]
  children: React.ReactElement<any>
}

export const InjectorContextProvider = ({ providers, children }: InjectorContextProviderProps) => {
  const parentInjector = React.useContext(InjectorContext)

  return (
    <InjectorContext.Provider
      value={{ injector: new Injector(providers, parentInjector?.injector) }}
    >
      {children}
    </InjectorContext.Provider>
  )
}

const InjectorContextConsumer = ({
  component: Component,
  providerList
}: {
  component: any
  providerList: string[]
}): React.ReactElement<any | { deps: any[] }> => {
  const injectorContext = React.useContext(InjectorContext)

  const injector = injectorContext?.injector
  if (!injector) {
    throw new Error(
      `withProviders used without Injector Context Provider. 
      Cannot locate providers: ${providerList}
      `
    )
  }

  const [compDeps] = React.useState(() =>
    providerList.map((dep: any) => {
      return injector.inject(dep)
    })
  )

  if (!React.isValidElement(Component)) {
    Component = React.createElement(Component)
  }

  return React.cloneElement(Component, {
    ...Component.props,

    deps: compDeps
  } as any)
}

export const withProviders = <T extends unknown>(component: T, providerList: string[]) => {
  return () => InjectorContextConsumer({ component, providerList })
}

export const withInjector = (Component: any, providers: Provider[]) => {
  if (React.isValidElement(Component)) {
    return () => (
      <InjectorContextProvider providers={providers}>{Component}</InjectorContextProvider>
    )
  }

  return () => (
    <InjectorContextProvider providers={providers}>
      <Component />
    </InjectorContextProvider>
  )
}

export type { Provider } from './provider.type'
// eslint-disable-next-line prettier/prettier

