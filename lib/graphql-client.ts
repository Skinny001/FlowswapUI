import { Client, cacheExchange, fetchExchange } from 'urql';

const SUBGRAPH_URL = process.env.NEXT_PUBLIC_SUBGRAPH_URL!;

export const graphqlClient = new Client({
  url: SUBGRAPH_URL,
  exchanges: [cacheExchange, fetchExchange],
  fetchOptions: () => ({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  }),
  requestPolicy: 'network-only', // Force fresh requests to avoid cache issues
});

export default graphqlClient;