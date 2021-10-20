export type InjectionToken = string // | Type<any>

export interface AbstractType<T> extends Function {
  prototype: T
}

export interface Type<T> extends Function {
  new (...args: any[]): T
}

export type ValueProvider = {
  provide: InjectionToken
  useValue: any
}

export type ConstructorProvider = {
  provide: InjectionToken
  useClass: any
  deps?: InjectionToken[]
}

export type StaticClassProvider = {
  provide: InjectionToken
  useStaticClass: any
  deps?: InjectionToken[]
}

export type FactoryProvider = {
  provide: InjectionToken
  useFactory: Function
  deps?: InjectionToken[]
}

export type Provider =
  | ValueProvider
  | ConstructorProvider
  | FactoryProvider
  | StaticClassProvider

export type ProviderConfigs =
  | Omit<ValueProvider, 'provide'>
  | Omit<ConstructorProvider, 'provide'>
  | Omit<FactoryProvider, 'provide'>
  | Omit<StaticClassProvider, 'provide'>
