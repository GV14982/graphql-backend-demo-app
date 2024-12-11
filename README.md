# GraphQL Server Demo

This is a sample app for understanding a bit more of how GraphQL resolvers function. We are using [@graphql-codegen/cli](https://the-guild.dev/graphql/codegen) for generating types and resolver stubs using the [typescript](https://the-guild.dev/graphql/codegen/plugins/typescript/typescript) and [resolvers](https://the-guild.dev/graphql/codegen/plugins/typescript/typescript-resolvers) plugins.

There are log statements in each reasolver so you can see how resolvers get run based on your operation.

# Requirements

- [NodeJS](https://nodejs.org/en)
- [PNPM](https://pnpm.io/)
- An internet connection

# Setup

Once all the requirements are installed/setup:

1. Install Dependencies
   - `pnpm install --frozen-lockfile`
2. Run GraphQL Codegen CLI
   - `pnpm run codegen`
3. Start the dev server
   - `pnpm run dev`
4. Head to [http://localhost:8000/graphql](http://localhost:8000/graphql) to see the GraphQL playground

> 💙 This package was templated with [`create-typescript-app`](https://github.com/JoshuaKGoldberg/create-typescript-app).
