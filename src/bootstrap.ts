// Import prerequisites
import 'reflect-metadata';
import { config } from 'dotenv';
import { validateEnvironment } from './commons/env.validatation';

config();
validateEnvironment();

// Bootstrap Application
import { Connection, createConnection } from 'typeorm';
import { Container } from 'typedi';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server-express';
import { authChecker } from './authentication/auth.checker';
import { Express } from 'express';
import * as helmet from 'helmet';
import * as jwt from 'express-jwt';

export default async (app: Express, path: string) => {
    const connection: Connection = await createConnection({
        type: 'mongodb',
        host: process.env.MONGO_HOST,
        port: Number(process.env.MONGO_PORT),
        database: process.env.MONGO_COLLECTION,
        useUnifiedTopology: true,
        entities: [`${__dirname}/**/*.entity.[jt]s`],
    });
    Container.set({ id: 'CONNECTION', factory: () => connection });

    // build TypeGraphQL executable schema
    const schema = await buildSchema({
        resolvers: [`${__dirname}/**/*.resolver.[jt]s`],
        container: Container,
        authChecker,
    });

    // Create GraphQL server
    const server = new ApolloServer({
        schema,
        context: ({ req }) => {
            return {
                req,
                user: req?.user,
            };
        },
    });

    // Setup helmet for some basic security


    // Setup JWT path for GraphQL
    app.use(
        path,
        jwt({
            algorithms: ['HS256'],
            secret: process.env.JWT_SECRET || 'test-secret',
            credentialsRequired: false
        })
    );

    // Apply ApolloServer Middleware for Express
    server.applyMiddleware({ app, path: path });

    return { server, connection };
};
