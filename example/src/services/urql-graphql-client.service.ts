import { Client, CombinedError, createClient, OperationResult } from 'urql';

export const GRAPHQL_API = 'GraphQLService'

export interface IGraphQLClient {
  query<Data, Variables>(
    query: string,
    variables?: Variables
  ): Promise<{ data: Data; error: CombinedError }>
  mutation<Data, Variables>(
    query: string,
    variables?: any
  ): Promise<OperationResult<Data, Variables>>
}

export class UrqlGraphQLService {
  private client: Client

  constructor(url: string) {
    this.client = createClient({
      url
    })
  }

  public async query<Data, Variables extends object = {}>(
    query: string,
    variables?: Variables | undefined
  ): Promise<{ data?: Data; error?: CombinedError }> {
    const result = await this.client.query<Data, Variables>(query, variables).toPromise()

    return {
      data: result.data,
      error: result.error
    }
  }

  public async mutation<Data, Variables extends object = {}>(
    query: string,
    variables?: Variables | undefined
  ): Promise<OperationResult<Data, Variables>> {
    return this.client.mutation<Data, Variables>(query, variables).toPromise()
  }
}
