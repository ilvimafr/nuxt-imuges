import { Prisma, PrismaClient } from '@prisma/client';
import { GraphQLError } from 'graphql'
import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server';
import { Resolvers } from '../../types';
import sharp from 'sharp';

const prisma = new PrismaClient();

if (!process.env.SUPABASE_STORAGE) {
  throw Error("Environment variable `SUPABASE_STORAGE` is undefined.");
}

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
          data: {
            name: args.name,
            description: args.description,
            authorID: user.id,
          }
        });

        const imageBuffer = Buffer.from(args.data.split(';base64,').pop() || '', 'base64url');
        const image = sharp(imageBuffer);
        const metadata = await image.metadata();

        // Resize if bigger than 1000px
        let width = metadata.width || 0;
        let height = metadata.height || 0;
        const maxSize = 1500;

        if (width > maxSize || height > maxSize) {
          if (width > height) {
            height = Math.round(height / (width / maxSize));
            width = maxSize;
          } else {
            width = Math.round(width / (height / maxSize));
            height = maxSize;
          }
          image.resize(width, height);
        }

        // Convert to JPEG and set quality to 85%
        image.jpeg({
          quality: 70
        });

        // Load image to Supabase by ID
        const client = await serverSupabaseClient(context);
        await client.storage
          .from(process.env.SUPABASE_STORAGE || '')
          .upload(result.id + '.jpeg', await image.toBuffer(), {
            contentType: 'image/jpeg'
          });

        return result;
      } catch (_error) {
        throw new GraphQLError("Failed to load image!");
      }
    }
  }
}
