import React from 'react'
import {
  // InjectorContextProvider,
  withDependencies
} from 'react-dependency-injection'
import {
  GraphQLInjectionToken,
  GraphQLService
} from '../services/graphql-client.service'

var query = `
query ($id: Int) {
  Media (id: $id, type: ANIME) {
    id    
    title {        
      english
    }
    startDate {
      year
      month
      day
    }
    genres
    source
    popularity
  }
}
`

const AnimeListPage = ({ dependencies }: any) => {
  const graphqlClient: typeof GraphQLService = dependencies[0]

  const [{ fetching, data, error }] = graphqlClient.useQuery({
    query,
    variables: { id: 1 }
  })

  if (error) {
    return <div>Error!</div>
  }

  if (fetching) {
    return <div>Loading...</div>
  }

  if (data) {
    return (
      <React.Fragment>
        <div>{data.Media.id}</div>
        <div>{data.Media.title.english}</div>
        <div>{data.Media.genres}</div>
        <div>{data.Media.source}</div>
        <div>{data.Media.popularity}</div>
      </React.Fragment>
    )
  }

  return null
}

export const AnimeListPageWithDeps = withDependencies(<AnimeListPage />, [
  GraphQLInjectionToken
])

export default AnimeListPageWithDeps

// export default () => {
//   return (
//     <InjectorContextProvider
//       dependencies={[
//         { provide: GraphQLInjectionToken, useValue: GraphQLService }
//       ]}
//     >
//       <React.Suspense fallback={<div>Loading...</div>}>
//         <AnimeListPageWithDeps />
//       </React.Suspense>
//     </InjectorContextProvider>
//   )
// }
