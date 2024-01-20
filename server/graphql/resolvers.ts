import { Prisma, PrismaClient } from '@prisma/client';
import { GraphQLError } from 'graphql'
import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server';
import { Resolvers, Image as TImage } from '../../types';
import { Image } from './image';

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
        // Temporary solution for generation
        const name = user.user_metadata?.preferred_username ||
          user.user_metadata?.user_name ||
          `UndefinedFrog_${(Math.round(Math.random() * 10000))}`;

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
      const user = await serverSupabaseUser(context);
      if (!user) {
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
    },

    async createImage(_, args, context) {
      const user = await serverSupabaseUser(context);
      if (!user) {
        throw new GraphQLError("Something went wrong!");
      }

      try {
        // Insert new image and get generated uniqe ID
        const result = await prisma.image.create({
          include: {
            author: true,
          },
          data: {
            name: args.name,
            description: args.description,
            authorID: user.id,
          }
        });

        // Process and load image to supabase
        const image = Image.createFromBase64(args.data);
        await Image.resizeByMaxSize(image, 1500);
        Image.setQuality(image, 70);
        await Image.loadToSupabase(image, result.id, context);

        // Process and load preview to supabase
        const preview = Image.createFromBase64(args.data);
        await Image.resizeByWidth(preview, 400);
        Image.setQuality(preview, 70);
        await Image.loadToSupabase(preview, 'preview_' + result.previewID, context);

        const gqlResult = result as unknown as TImage;
        gqlResult.createdAt = result.createdAt.toDateString();
        return gqlResult;
      } catch (_error) {
        throw new GraphQLError("Failed to load image!");
      }
    }
  }
}
