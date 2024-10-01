# Flare Network Front End and CMS
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

This repository contains the [Next.js](https://nextjs.org/docs) front end and [Payload](https://payloadcms.com/docs/getting-started/what-is-payload)-based CMS for the Flare Network website at [https://flare.network](https://flare.network).


## Attributes
- **Database**: postgres
- **Storage Adapter**: localDisk

## Getting Started
1. Run `nvm i` to install the node version specified in `.nvmrc` (you must have [nvm](https://github.com/nvm-sh/nvm) installed for this).

1. Have a Docker runtime on your machine and make sure you can run `docker compose` commands for local dev.
2. Install dependencies with `npm i --legacy-peer-deps`.
3. Create a `.env` file in the root of this project and add the following environment variables and respective values:
    ```
    POSTGRES_URL=postgres://postgres:postgres@127.0.0.1:5432/postgres
    PAYLOAD_SECRET=payload
    ```
4. In a new terminal window, run `npm run docker:init` from this project's root directory. This will bootstrap a Postgres Database, 
   seed it with the necessary data for Payload, and start a Postgres container.
5. Run the development server with `npm run dev`.

You will see the local dev build at [http://localhost:3000](http://localhost:3000). You can log into Payload at [http://localhost:3000/admin](http://localhost:3000/admin) using the default Payload admin user (username: `test@alephsf.com`, password: `password`).

## Environments + Options
After following the steps above, your local dev environment is entirely self-contained, and will run the following:
- A Postgres database container (for Payload) running on `localhost` on port `5432` with password, username and db name all set to `postgres`.
- NextJS and Payload running side-by-side at [https://localhost:3000](https://localhost:3000) and [https://localhost:3000/admin](https://localhost:3000/admin) respectively. This part of the stack can be run in NodeJS for development (with `npm run dev`) or in Docker Compose (with `npm run docker:up`).

To change the database your local instance of Payload (and NextJS) is pointing at, you simply modify your local `.env` file
and change `POSTGRES_URL`. 

**NB!** If your local environment is pointing at a remote database, **all operations, including seeding data, will happen on that database.**  This is useful for seeding remote staging Payload instances, but bad if you're doing it to the production site! We will try and make this impossible in a future release.

## CMS Fields + Migrations
We're using Postgres as our backing database for this project. PayloadCMS ships with the Drizzle ORM package and manages this
connection transparently for us. One of the more important core concepts here is that any changes to fields in your schema (adding a new field, changing a field's type, etc.) should be done via migrations. Migrations can be managed with Payload native tooling but we must follow a fairly strict workflow around migrations and field changes to properly utilize it and minimize the risk of data loss or corruption.

### Why we use migrations
Migrations are the only way to safely modify your database schema. They allow PayloadCMS to track changes made to your schema and apply them in a safe and consistent manner. This is important because it ensures that all developers working on your project have access to the same version of the database schema, which can prevent data loss or corruption.

Payload allows you to create pretty much any type of field in your database, which is powerful but also brittle. It means that
if you add a field to Payload/Postgres locally, your application won't run, or even deploy, if the exact same field is not 
present in the database you are deploying to. The tools that Payload/Postgres ships with are pretty smart and make this relatively easy by automatically tracking any changes you make to your local schema and creating a migration file that you can run in production. It also keeps track of the migrations you've run, and everything remains idempotent.

### Order of operations
1. Build a feature that requires changes to the PayloadCMS schema. (see below)
2. Pay close attention to the console where Payload is running. It may need confirmation before certain types of schema
   changes. 
3. When your changes are stable and ready to be deployed, run `npm run migrate:create`, and Payload will track all of your
   the changes that need to be made to the remote database, writing a new migration script (with a timestamp) to the 
   `/migrations` folder. 
4. Commit your migration file(s) to version control along with the feature you're pushing. Before the build, we will run
   the `npm run payload migrate` command in a CI/CD pipeline. This will apply all unapplied migrations in order to the 
   destination database during the deployment process.

If all goes well, your database will be compatible with the new schema, and the deployment will run just fine. 

### When to create a migration
In general, you will need to create a new migration (manually, on your dev environment) when:
- Adding or removing a field from your schema
- Changing the type of a field (for example, changing a string to an integer)
- Changing the default value for a field
- Changing the options for a field (for example, changing a select field's options)
- Changing the relationship between two collections (for example, changing a one-to-many relationship to a many-to-many)

...and so on. Pretty much anything that changes your schema in Postgres.

### Making Schema Changes the Right Way
Payload closely aligns itself with the requirements of Postgres, so it's important to understand how any schema changes
will affect your database, **especially when it comes to non-nullable fields**. These fields are automatically set as 
**non-nullable** in Postgres if they are marked as required in your schema, and Postgres will not allow you to create
a required field without providing a default value unless you wipe the entire collection. 

In general, there are a few types of schema changes that we do. Here's how we handle each:
- **Adding non-required fields** is pretty straightforward. Just add the field to your schema and it will 
  automatically be created as nullable in Postgres locally and should appear immediately on the Payload admin.
- **Adding required fields** to an existing collection is tricky if you already have items in your collection. Since 
  these fields are non-nullable, you will need to specify the `defaultValue` for the field. Payload will then immediately
  create the field (on your local Postgres) and fill it with default values for all existing items. **NB!** if you are
  creating a new collection or have nothing in the collection yet, you don't need to set a default value!
- **Removing any type of field** is pretty easy to do, but you will likely need to confirm the chance of data loss
  in the terminal where Next/Payload is running, since removing the field will completely remove the whole column in
  Postgres.

Once you've made these changes, the migration you create will duplicate these exact decisions on the destination database,
and all will be right in the world.

## Docker Notes
While we will be doing most of our local development in Node with HMR and such, the production build of the NextJS/Payload stack
will run in a Docker container. If there are issues with any of the cloud deployments you should be able to replicate them by
running that container locally, which can be done at any time with `npm run docker:up:next`. To run the full stack including Postgres, use `npm run docker:up` instead.

# Remote Builds and Deployments
Our Docker environment is meant to be entirely portable, and should be able to be built and run on any Docker-compatible runtime or
orchestration platform. You will need to make sure the following two environment variables are present **both at build time as
arguments and at runtime as env vars**:
- `PAYLOAD_SECRET`: A secret string used for signing tokens and other cryptographic operations. This should be a random, long string of characters, and should be unique per environment.
- `POSTGRES_URL`: The URL to your Postgres database instance. This is in the format `postgres://username:password@hostname/dbname`.

(These are extremely sensitive credentials that should not be exposed publicly or committed to version control.)

## Linting
You will not be able to run a build with eslint or TypeScript errors in the `src/app/(app)` directory. To see all the eslint errors and warnings from the terminal run `npm run lint` from the project root. You can run `npm run lint --fix` to fix errors that can be automatically fixed. To see all the TypeScript errors in the terminal run `npx tsc --noEmit` from the project root.

We use husky to check for eslint, TypeScript, and stylelint errors before committing. `lint-staged` is used to run `next lint` only on files that are staged for commit. However, we must check for TypeScript errors in all files because types changed in a staged file could affect and cause errors in other files that import them. stylelint is run for all staged style files within the entire directory.

Sometimes when removing directories they are still cached in the `.next` build directory and you will get an error that the module cannot be found when trying to commit. To fix, delete the `.next` directory.

Many Payload types and files are automatically generated. When modifying Payload fields or the database you may run into typescript errors when trying to commit. To fix, restart the development server (`control + c` then `npm run dev`).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

To learn more about Payload, take a look at the [Payload CMS Documentation](https://payloadcms.com/).

---

Note: We are currently running a [3.0 beta](https://payloadcms.com/blog/30-beta-install-payload-into-any-nextjs-app-with-one-line) version of Payload that installs Payload into a Next.js app. A stable version is projected to be released mid-September 2024.

See [demo repo](https://github.com/payloadcms/payload-3.0-demo) for additional information.
