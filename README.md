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

## Seeding Data
After the above set up, you will have random users and data seeded into your local Payload instance. If you'd like to add more, you can simply run `npm run seed:news` to add more users and news, as long as the stack is running. 

There are helper functions to seed localized data as well:
- `npm run seed:news-types-de` and then `npm run seed:news-de` for German
- `npm run seed:news-types-es` and then `npm run seed:news-es` for Spanish

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
