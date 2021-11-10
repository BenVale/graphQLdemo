const { ApolloServer, gql } = require('apollo-server');
const faker = require('faker');

// The GraphQL schema
const typeDefs = gql`
  type Query {
    "A simple type for getting started!"
    hello: String
    user(count: Int = 1): [User]
  }

  type User {
    # this is the users first and last name
    name: String
    username: String
    email: String
    address: Address
    lastOnline: String
  }

  type Address {
    street: String
    suite: String
    city: String
    zipcode: String
    geo: Geo
  }

  type Geo {
    lat: Float
    lng: Float
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    hello: () => 'world',
    user: (_, {count}) => new Array(count).fill({}).map(item => ({...faker.helpers.userCard(), lastOnline: faker.date.past()}))
  },
  User: {
    lastOnline: (root, {}) => {
      return new Date(root.lastOnline).toUTCString()
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});