import { Prisma, PrismaClient } from '@prisma/client';
import { Resolvers } from '../../types';

const prisma = new PrismaClient();
prisma.$connect();

export const resolvers: Resolvers = {
  Query: {
    users() {
      return [];
    }
  },
  Mutation: {
    // Append Supabase user in Prisma table if it's not already there
    async addUser(_, args) {
      try {
        await prisma.user.create({
          data: {
            id: args.id,
            name: "",
            email: args.email,
          }
        });
        return true;
      } catch (err) {}

      return false;
    }
  }
}
