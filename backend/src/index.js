const { GraphQLServer } = require("graphql-yoga");
const { prisma } = require("../generated/prisma-client");

const Query = require("./resolver/Query");
const Mutation = require("./resolver/Mutation");
const Post = require("./resolver/Post");
const Subscription = require("./resolver/Subscription");

const resolvers = {
  Query,
  Mutation,
  Subscription,
  Post
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: request => {
    return {
      ...request,
      prisma
    };
  }
});

// const testfun = () => {
//   prisma.$subscribe.post({node:{postedBy},mutation_in:[]})
// };

server.start(() => console.log(`Server is running on http://localhost:4466`));
