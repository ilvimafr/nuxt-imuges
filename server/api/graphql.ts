import {type H3Event, type EventHandlerRequest} from 'h3';
import { createYoga } from "graphql-yoga";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { typeDefs } from '../graphql/schema';
import { resolvers } from '../graphql/resolvers';

export const GraphQLServer = (context: H3Event<EventHandlerRequest>) => {
  return createYoga({
    schema: makeExecutableSchema({
      resolvers: resolvers,
      typeDefs: typeDefs,
    }),
    context,
    graphqlEndpoint: "/api/graphql",
    landingPage: false,
    multipart: true,
    cors: true,
    logging: "debug",
  });
};

export default defineEventHandler(async (event) => {
  if (getRequestURL(event).pathname.startsWith("/api/graphql")) {
    console.log('API CALLED');
    const { req, res } = event.node;
    return GraphQLServer(event)(req, res);
  }
});