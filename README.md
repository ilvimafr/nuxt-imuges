# imuges

imuges is an online image sharing and image hosting service with a focus on social gossip.

imgues mainly uses: Nuxt 3, Supabase, Supabase Storage, Prisma, GraphQL, Nuxt GraphQL Client, Pinia, Nuxt UI, TailwindCSS.

Demo available on [Vercel](https://nuxt-imuges.vercel.app)

![main-screen](https://raw.githubusercontent.com/ilvimafr/nuxt-imuges/main/.github/assets/main-screen.png)

## Features
- Dark and light modes
- User authorization through GitHub
- Dashboard settings page
- Managing settings with GraphQL

## Getting Started

After cloning the project, use the following command to initialize the project:

```bash
npm install
```

The next thing to do is to add environment variables to connect Supabase and Prisma. To do this, create an `.env` file in the root of the project and add variables: 

```bash
DATABASE_URL="[SUPABASE_POOLING_URL]?pgbouncer=true&connection_limit=1" 
DIRECT_URL="[SUPABASE_DIRECT_URL]"
SUPABASE_URL="[SUPABASE_API_URL]"
SUPABASE_KEY="[SUPABASE_API_KEY]"
```

Don't forget to configure redirect URLs and auth providers in the Supabase dashboard.

Next, you must run `prisma migrate` to create the Prisma-defined structure in your new database.
```bash
npx prisma migrate dev
```

At the end, you need to start the server with the command:
```bash
npm run dev
```

## Deploy on Vercel

To deploy to Vercel, you need to specify your GitHub repository and specify Environment variables.