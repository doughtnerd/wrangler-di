import React, { ReactNode } from 'react'
import { Injector } from './Injector'
import { InjectionToken, Provider } from './provider.type'

type InjectorContextType = {
  injector: Injector
}

const InjectorContext = React.createContext<InjectorContextType | null>(null)

export type InjectorContextProviderProps = {
  providers: Provider[]
  children: React.ReactElement<any>
}

export const InjectorContextProvider = ({
  providers,
  children
}: InjectorContextProviderProps): JSX.Element => {
  const parentInjector = React.useContext(InjectorContext)
  return (
    <InjectorContext.Provider
      value={{ injector: new Injector(providers, parentInjector?.injector) }}
    >
      {children}
    </InjectorContext.Provider>
  )
}

type InjectorContextConsumerProps<
  ComponentPropType extends Record<string, any> & { deps: ProviderTypes },
  ProviderTypes extends Array<any>
> = {
  component: React.FC<ComponentPropType>
  providerList: InjectionToken[]
  props: Omit<ComponentPropType, 'deps'>
}

const InjectorContextConsumer = <
  ComponentPropType extends Record<string, any> & { deps: ProviderTypes },
  ProviderTypes extends Array<any>
>({
  component: Component,
  providerList,
  props
}: InjectorContextConsumerProps<ComponentPropType, ProviderTypes>): JSX.Element => {
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
    providerList.map((dep: InjectionToken) => {
      return injector.inject(dep)
    })
  )

  const propsWithDeps = { ...props, deps: compDeps } as ComponentPropType & {
    deps: ProviderTypes
  } & { children: ReactNode }

  return <Component {...propsWithDeps} />
}

export const withProviders = <
  ComponentPropType extends Record<string, any> & { deps: ProviderTypes },
  ProviderTypes extends Array<any>
>(
  component: React.FC<ComponentPropType>,
  providerList: string[]
): React.FC<Omit<ComponentPropType, 'deps'>> => {
  console.log('REACHEd')
  return (props: Omit<ComponentPropType, 'deps'>) => (
    <React.Fragment>
      {InjectorContextConsumer<ComponentPropType, ProviderTypes>({
        component,
        providerList,
        props
      })}
    </React.Fragment>
  )
}

export const withInjector = (Component: React.ReactElement, providers: Provider[]) => {
  if (React.isValidElement(Component)) {
    return () => (
      <InjectorContextProvider providers={providers}>{Component}</InjectorContextProvider>
    )
  }

  return () => <InjectorContextProvider providers={providers}>{Component}</InjectorContextProvider>
}

export type { Provider } from './provider.type'
// eslint-disable-next-line prettier/prettier

