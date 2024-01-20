import { Prisma, PrismaClient } from '@prisma/client';
import { Resolvers } from '../../types';
import { serverSupabaseUser } from '#supabase/server';
import { GraphQLError } from 'graphql'

const prisma = new PrismaClient();

export const resolvers: Resolvers = {
  Query: {
    async getUser(_, args, context) {
      try {
        let imugesUser = await prisma.user.findFirst({
          where: {
            id: args.id,
          }
        });

        if (imugesUser) {
          return imugesUser;
        }

        // Insert new user if not founded & id is equals to current user
        const user = await serverSupabaseUser(context);
        if (!user || user.id !== args.id) {
          return null;
        }

        // Generate nickname
        const name = user.user_metadata?.preferred_username || user.user_metadata?.user_name || 'CustomName';

        imugesUser = await prisma.user.create({
          data: {
            id: user.id,
            name: name,
          }
        });

        return imugesUser;
      } catch (_error) {
        return null;
      }
    }
  },

  Mutation: {
    async changeUserName(_, args, context) {
      if (!args.name) {
        throw new GraphQLError("Name is not provided!");
      }

      let user = null;
      try {
        user = await serverSupabaseUser(context);
        if (!user) {
          throw new Error();
        }
      } catch (_error) {
        throw new GraphQLError("Something went wrong!");
      }

      try {
        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            name: args.name,
          }
        });
        return true;
      } catch (_error) {
        throw new GraphQLError("The username is already taken!");
      }
    }
  }
}
