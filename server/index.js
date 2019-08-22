require('dotenv').config()
const  MongoClient  = require('mongodb').MongoClient
const express = require('express');
const Server = require('mongodb').Server;
const cors = require('cors');
const { ApolloServer, gql } = require('apollo-server-express');

const dbName = process.env.DATABASE_NAME

const start = async () => {
    try {
        // const client = new MongoClient(new Server("localhost", 27017), {useNewUrlParser: true})
        const client = new MongoClient('mongodb://localhost/testdb', {useNewUrlParser: true})
        const db = await client.connect()
        const User = client.db(dbName).collection('users')

        const typeDefs = gql`
            type User {
                id: ID!
                userName: String
                email: String
            }
            
            type Query {
                hello: String
                test: [User]
            }
            
            type Mutation {
                addUser(userName: String!, email: String!): User
            }
        `;

        const resolvers = {
            Query: {
                hello: () => 'Hello World!',
                test: () => {
                    return User.find({}).toArray()
                }
            },
            Mutation: {
                addUser: async (_, args) => {
                    console.log(args)
                    try {
                        let response = await User.insertOne(args);

                        // return response.ops[0];
                    } catch (e) {
                        return e.message;
                    }
                }
            }
        };

        const server = new ApolloServer({typeDefs, resolvers});
        const app = express();
        app.use(cors())
        server.applyMiddleware({app});

        app.listen({port: 4100}, () =>
            console.log(`🚀Server ready at http://localhost:${process.env.PORT}/graphql`)
        );
    } catch (error) {
        console.log(error)
    }
}

start();
