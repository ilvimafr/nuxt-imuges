import {type H3Event, type EventHandlerRequest} from 'h3';
import { loadFiles } from '@graphql-tools/load-files';
import { createYoga } from "graphql-yoga";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { resolvers } from '../graphql/resolvers';


export const GraphQLServer = async (context: H3Event<EventHandlerRequest>) => {
  return createYoga({
    schema: makeExecutableSchema({
      resolvers: resolvers,
      typeDefs: await loadFiles('./server/graphql/schema.graphql'),
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