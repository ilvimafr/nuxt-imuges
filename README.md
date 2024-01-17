# imuges

imuges is an online image sharing and image hosting service with a focus on social gossip.

imgues mainly uses: Nuxt 3, Prisma, Supabase, NuxtUI and Pinia.

Demo available on [Vercel](https://nuxt-imuges.vercel.app)

![main-screen](https://raw.githubusercontent.com/ilvimafr/nuxt-imuges/main/.github/assets/main-screen.png)

## Features
- User authorization through GitHub
- Dark and light modes

## Getting Started

After cloning the project, use the following command to initialize the project:

```bash
npm install
```

The next thing to do is to add environment variables to connect Prisma to Supabase. To do this, create an `.env` file in the root of the project and add `DATABASE_URL` and `DIRECT_URL` variables: 

```bash
DATABASE_URL="postgres://postgres.[SUPABASE-URL]:6543/postgres?pgbouncer=true&connection_limit=1" 
DIRECT_URL="postgres://postgres.[SUPABASE-URL]:5432/postgres"
```

Next you need to add `SUPABASE_URL` and `SUPABASE_KEY` for user authorization:

```bash
SUPABASE_URL="[API-URL]"
SUPABASE_KEY="[API-KEY]"
```


Next, you must run `prisma migrate` to create the Prisma-defined structure in your new database.
```bash
npx prisma migrate dev
```

At the end, you need to start the server with the command:
```bash
npm run dev
```