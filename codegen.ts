import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
	schema: "src/schema.graphql",
	generates: {
		"./src/resolvers-types.generated.ts": {
			config: {
				maybeValue: "T | undefined | null",
				scalars: {
					Url: "URL",
				},
			},
			plugins: ["typescript", "typescript-resolvers"],
		},
	},
};
export default config;
