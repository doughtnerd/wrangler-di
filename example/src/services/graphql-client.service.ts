import { useMutation, useQuery } from 'urql'

export const GraphQLInjectionToken = 'GraphQLService'

export const GraphQLService = {
  useQuery,
  useMutation
}
