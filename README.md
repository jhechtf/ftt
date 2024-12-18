## Getting Started

First, copy the `.env.example` file to `.env`.

Next, go https://themoviedb.org/ and create an account. Then go to https://themoviedb.org/settings/api and get your API key. We are looking for the **API Read Access Token**. Paste this into the `.env` file

For other docs, see https://developer.themoviedb.org/docs/getting-started

## Running Locally

After following the [Getting Started](#getting-started) steps, run the following commands:

```bash
pnpm i --frozen-lockfile
pnpm dev
```

You should see a local server running at `http://localhost:3000`