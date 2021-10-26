# Wrangler DI
> A React library for Angular style dependency injection

[![NPM](https://img.shields.io/npm/v/@doughtnerd/wrangler-di.svg)](https://www.npmjs.com/package/@doughtnerd/wrangler-di) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Live Example

The example app is a very tiny example of this library being used to query anime character data from anime list.

https://doughtnerd.github.io/wrangler-di/#/anime-character-details

## Live Example source code

Best way to see how this is used is looking at the Example App source code:
[Found here](./example/src)

## Install

Npm:
```bash
npm install --save @doughtnerd/wrangler-di
```

Yarn:
```bash
npm add @doughtnerd/wrangler-di
```

## Usage


### withInjector
This Higher Order Component is what creates the injector.

#### App.jsx
```jsx
import React from 'react'

import { withInjector } from '@doughtnerd/wrangler-di'

import { HTTP_SERVICE, AxiosHTTP } from './services/axiosHttp'

import { AUTH_SERVICE, AuthService } from './services/authService'

const appProviders = [
  { provide: HTTP_SERVICE, useClass: AxiosHttp },
  { provide: AUTH_SERVICE, useFactory: (httpService) => new AuthService(httpService), deps: [HTTP_SERVICE] }
]

const App = () => {
  return (
    // The rest of your app
  )
}

export default withInjector(App, appProviders)
```



### withProviders
This Higher Order Component consumes providers that have been injected.

```jsx
import React from 'react'

import { withProviders } from '@doughtnerd/wrangler-di'

import { AUTH_SERIVCE } from './services/authService'

const SignInPage = ({deps: [authService]}) => {

  return (
    <form onSubmit={(e) => {
        e.preventDefault()
        authService.login(e.target.username.value, e.target.password.value)
      }
    }>
      <input name="username" type="text"></input>
      <input name="password" type="password"></input>

      <button type="submit">Sign In</button>
    </form>
  )
}

export default withProviders(SignInPage, [ AUTH_SERVICE ])
```

## API

### Injection Token
An injection token is a string that the injector uses to uniquely identify providers. 
This string can be anything you like but __MUST__ be unique within a single injector.

A Provider object's ```provide``` key is an Injection Token.

It is recommended that this string get set to some constant in order to reduce mistyping or 'magic string' issues.

```js
{ 
  provide: 'HttpService', // <- This is an injection token
  useClass: MyHttpService 
}
```

### Provider
A provider is something that the injector will use to create the services that are consumed within an app.

There are three different types of providers.

#### Value Provider
> Used to provide value objects or functions.
```js
{ provide: 'FooBarProvider', useValue: { foo: 'bar' } }
```

#### Constructor Provider
> Used to provide a class that the injector will create for you
```js
{ provide: 'HttpService', useClass: MyHttpService }
```

#### Factory Provider
> Used to provide a factory function that will control how the provider is created.
> Can be used with ```deps```, which is an array of injection tokens of other providers.
```js
{ provide: 'AuthService', useFactory: (httpService) => new AuthService(httpService), deps: ['HttpService'] }
```
If deps are used, the function assigned to ```useFactory``` will be called with deps in the same order as they are in the ```deps``` array.
```js
{ 
  provide: 'AuthService', 
  useFactory: (httpService, graphqlService) => { // Notice httpService and graphqlService are in the same order as 'deps'
    return new ApiService(httpService, graphqlService)
  }, 
  deps: ['HttpService', 'GraphqlService'] 
}
```

### withInjector
This function takes two parameters: The component you want to wrap with an injector and the array of providers you want to Inject
```jsx
const appProviders = [
  { provide: HTTP_SERVICE, useClass: AxiosHttp },
  { provide: AUTH_SERVICE, useFactory: (httpService) => new AuthService(httpService), deps: [HTTP_SERVICE] }
]

// This is correct
withInjector(App, appProviders)

// This is also correct
withInjector(<App />, appProviders)

// So is this
withInjector(<App initialAppConfig={ {foo: "bar"} } />, appProviders)
```

You don't have to provide everything in one injector. If you have a service that only needs to be injected for one page, provide it at that page level. This library is smart enough to resolve hierarchical dependencies. 

Example:
```jsx
// App.jsx
import MyFavoritesPage from './MyFavoritesPage'

const appProviders = [
  { provide: HTTP_SERVICE, useClass: AxiosHttp }
]

const App = () => {
  return (
    <MyFavoritesPage />
  )
}
export default withInjector(<App />, appProviders)
// ------------ END OF FILE ----------------------

// MyFavoritesPage.jsx
import { FavoritesApi } from './favoritesApi'

const pageProviders = [ 
  { provide: 'FavoritesApi', useFactory: (httpService) => new FavoritesApi(httpService), deps: [HTTP_SERVICE] } 
]

const MyFavoritesPage = ({deps: [favoritesApi]}) => {
  return (
    <ul>
      {favoritesApi.getFavorites().map(favorite => <li key={favorite}>{favorite}</li>)}
    </ul>
  )
}

const MyFavoritesPageWithDeps = withProviders(MyFavoritesPage, [ 'FavoritesApi' ])

export default withInjector(MyFavoritesPageWithDeps, pageProviders)
// ------------ END OF FILE ----------------------
```

### withProviders
This function takes two parameters: The component you wish to inject with dependencies, and an array of Injection Tokens
```jsx
// This is correct, as long as 'AuthService' is injected somewhere above this component in the dom tree
withProviders(SignInPage, [ 'AuthService' ])

// Same for this
withProviders(<SignInPage disableGoogleSignIn={true} />, [ 'AuthService' ])
```

## Warnings - Possible errors if you don't follow
- Don't update the array used in withProviders at runtime
- Don't update the array used in withInjector at runtime
- Don't mutate Value Providers
- Don't use ```deps``` with Constructor Providers


## License

MIT © [doughtnerd](https://github.com/doughtnerd)
