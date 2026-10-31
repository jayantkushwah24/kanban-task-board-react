# Kinboard

A responsive Kanban task board built with React, Vite, and Tailwind CSS.

## Run locally

```sh
npm install
npm run dev
```

## Deploy to Vercel

1. Push the repository to GitHub, GitLab, or Bitbucket.
2. In Vercel, select **Add New → Project** and import the repository.
3. Use the Vite settings: build command `npm run build`, output directory
   `dist`, and install command `npm install`.
4. Deploy. The included `vercel.json` routes app URLs back to the entry point
   so React Router can load routes directly and on refresh.

Alternatively, deploy with the Vercel CLI:

```sh
npx vercel
npx vercel --prod
```

## Verify before deploying

```sh
npm run lint
npm run build
```

Tasks are stored in browser local storage. They persist in the same browser,
but are not shared across devices or users.