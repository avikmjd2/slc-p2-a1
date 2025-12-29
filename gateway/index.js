const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { ApolloGateway, IntrospectAndCompose } = require('@apollo/gateway');

const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      { name: 'clubs', url: 'http://clubs:8000/graphql' },
      { name: 'events', url: 'http://events:8000/graphql' },
    ],
  }),
});

const server = new ApolloServer({ gateway });

startStandaloneServer(server, { listen: { port: 4000 } }).then(({ url }) => {
  console.log(`🚀 Gateway ready at ${url}`);
});