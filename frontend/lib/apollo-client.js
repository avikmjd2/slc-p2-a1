// import { ApolloClient, InMemoryCache } from '@apollo/client';

// export const client = new ApolloClient({
//   uri: 'http://localhost:4000/',
//   cache: new InMemoryCache(),
// });


import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

export const client = new ApolloClient({
  // This tells Apollo to talk to your Docker Gateway
  link: new HttpLink({
    uri: 'http://localhost:4000/', 
  }),
  cache: new InMemoryCache(),
  fetchPolicy: "network-only",
});