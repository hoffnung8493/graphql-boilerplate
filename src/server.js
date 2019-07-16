const { GraphQLServer, PubSub } = require('graphql-yoga');
const prisma = require('./prisma');
const { resolvers, fragmentReplacements } = require('./resolvers');
const pubsub = new PubSub();
const server = new GraphQLServer({
    typeDefs:'./src/schema.graphql',
    resolvers,
    context(request){
        return{
            pubsub,
            prisma,
            request
        }        
    },
    fragmentReplacements
})

module.exports = server;