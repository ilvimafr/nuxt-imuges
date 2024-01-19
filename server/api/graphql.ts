import { type H3Event, type EventHandlerRequest } from 'h3';
import { createYoga } from "graphql-yoga";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { resolvers } from '../graphql/resolvers';
import schema from '../graphql/schema.graphql';

export const GraphQLServer = async (context: H3Event<EventHandlerRequest>) => {
  return createYoga({
    schema: makeExecutableSchema({
      resolvers: resolvers,
      typeDefs: schema,
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
    const { req, res } = event.node;
    return (await GraphQLServer(event))(req, res);
  }
});