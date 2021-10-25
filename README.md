# Wranger DI
> A React library for Angular style dependency injection

[![NPM](https://img.shields.io/npm/v/@doughtnerd/wrangler-di.svg)](https://www.npmjs.com/package/@doughtnerd/wrangler-di) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


## What is it? 
This library seeks a way to bring dependency injection to React.

## Install

Npm:
```bash
npm install --save @doughtnerd/wrangler-di
```

Yarn:
```bash
npm add @doughtnerd/wrangler-di
```

## Live Example

The example app is a very tiny example of this library being used to query anime character data from anime list.

https://doughtnerd.github.io/wrangler-di/#/anime-character-details

## Live Example source code

Best way to see how this is used is looking at the Example App source code:
[Found here](./example/src)

## Usage


### withInjector
This library provides a wrapper Higher-order component function called withInjector. It will create the injection context that can be used by the component tree

#### App.jsx
```jsx
import React from 'react'

import { withInjector } from '@doughtnerd/wrangler-di'

import { HTTP_SERVICE, AxiosHTTP } from './services/axiosHttp'

const appProviders = [
  { provide: HTTP_SERVICE, useClass: AxiosHttp } }
]

const App = () => {
  return (
    // The rest of your app
  )
}

export default withInjector(App, appProviders)
```



### withProviders
This Higher order function will handle injecting providers into a component

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

export const SignInPageWithDeps = withProviders(SignInPage, [ AUTH_SERIVCE ])
```
## License

MIT © [doughtnerd](https://github.com/doughtnerd)
