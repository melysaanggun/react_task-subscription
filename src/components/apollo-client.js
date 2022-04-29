import {
    ApolloClient,
    InMemoryCache,
  } from "@apollo/client";

  const client = new ApolloClient({
    uri: 'https://mature-squirrel-42.hasura.app/v1/graphql',
    cache: new InMemoryCache(),
    headers: {
        "x-hasura-admin-secret" : "mlmFfHK5ymxK3M2KCsmfAYH6Tl3bLhlUCbQ922V7a0wds3pn3DhBx31KIrkLZyC8"
    }
  });

  export default client;