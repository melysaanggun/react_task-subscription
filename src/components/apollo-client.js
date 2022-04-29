import {
    ApolloClient,
    InMemoryCache,
  } from "@apollo/client";
import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

const httpLink = new HttpLink({
  uri: 'https://mature-squirrel-42.hasura.app/v1/graphql',
  headers: {
    "x-hasura-admin-secret" : "mlmFfHK5ymxK3M2KCsmfAYH6Tl3bLhlUCbQ922V7a0wds3pn3DhBx31KIrkLZyC8"
  }
});

const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://mature-squirrel-42.hasura.app/v1/graphql',
  connectionParams: {
    headers: {
      "x-hasura-admin-secret" : "mlmFfHK5ymxK3M2KCsmfAYH6Tl3bLhlUCbQ922V7a0wds3pn3DhBx31KIrkLZyC8"
    }
  }
}));

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

  const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache()
  });

  export default client;