# School Management Dashboard to learn Next.js

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Database Setup

Ensure that the database is running via Docker. You can check the status of the database container to confirm it is running:

```bash
docker ps
```

To apply database migrations, you can use the following command:

```bash
npx prisma migrate dev --name init
```

This command initializes the database with the current schema defined in your Prisma schema file. It creates a new migration file with the specified name (`init` in this case) and applies it to the database. This ensures that your database schema is in sync with your application models.


Make sure to configure your application to connect to the Dockerized database.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js](https://nextjs.org/learn)