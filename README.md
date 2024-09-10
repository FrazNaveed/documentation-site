# Flare Network Front End and CMS
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

This repository contains the [Next.js](https://nextjs.org/docs) front end and [Payload](https://payloadcms.com/docs/getting-started/what-is-payload)-based CMS for the Flare Network website at [https://flare.network](https://flare.network).


## Attributes

- **Database**: postgres
- **Storage Adapter**: localDisk

## Getting Started

1. Run `nvm i` to install the node version specified in `.nvmrc` (you must have [nvm](https://github.com/nvm-sh/nvm) installed for this).

1. Have a Docker runtime on your machine and make sure you can run `docker compose` commands for local dev.

    You can then use the `DATABASE_URI` environment variable in your application to connect to your local database.

1. Install dependencies with `npm i`. Use the `--force` flag if you run into any version conflicts.

1. Create a `.env` file in the root of this project and add the following environment variables and respective values:

    ```
    DATABASE_URI=postgres://postgres@127.0.0.1:5432/postgres
    PAYLOAD_SECRET=payload
    PG_USERNAME=postgres
    PG_PASSWORD=postgres
    PG_DBNAME=postgres
    ```

1. In a new terminal window, run `docker compose up` from this project's root directory.

1. Run the development server with `npm run dev`.

## Local Development

1. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

1. Open [http://localhost:3000/admin](http://localhost:3000/admin) to see the Payload CMS. Create a user to log in and start using the CMS.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

To learn more about Payload, take a look at the [Payload CMS Documentation](https://payloadcms.com/).

---

Note: We are currently running a [3.0 beta](https://payloadcms.com/blog/30-beta-install-payload-into-any-nextjs-app-with-one-line) version of Payload that installs Payload into a Next.js app. A stable version is projected to be released mid-September 2024.

See [demo repo](https://github.com/payloadcms/payload-3.0-demo) for additional information.
