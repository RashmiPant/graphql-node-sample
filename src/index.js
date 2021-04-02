const { PrismaClient } = require('.prisma/client');
const { ApolloServer, PubSub } = require('apollo-server');
const resolvers = require('./resolvers');
const fs = require('fs');
const path = require('path');
const { getUserId } = require('./utils');

const pubsub = new PubSub
const prisma = new PrismaClient
const server = new ApolloServer({
    typeDefs: fs.readFileSync(
        path.join(__dirname, 'schema.graphql'),
        'utf-8'
    ),
    resolvers,
    context: ({ req }) => {
        return {
            ...req,
            prisma,
            pubsub,
            userId:
                req && req.headers.authorization ? getUserId(req) : null
        }
    }
})

server.listen().then(({ url }) => console.log(`Server id running on ${url}`));