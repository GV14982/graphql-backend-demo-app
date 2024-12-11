import { readFileSync } from "node:fs";
import { Person, Resolvers } from "./resolvers-types.generated.js";
import { createSchema, createYoga } from "graphql-yoga";
import { createServer } from "node:http";
import { Kind } from "graphql";
import { createLogger, format, transports } from "winston";

const logger = createLogger({
	level: "info",
	format: format.cli(),
	transports: [new transports.Console()],
});

const typeDefs = readFileSync("./src/schema.graphql", "utf8");

const db = new Map<string, Person>([
	[
		"Graham Vasquez",
		{
			name: "Graham Vasquez",
			age: 31,
			photo: new URL("https://gvasquez.dev/profile_pic.png"),
			friends: [],
		},
	],
]);

const resolvers: Resolvers = {
	Query: {
		person: (_, args) => {
			logger.info("Query.person resolver");
			return db.get(args.name);
		},
	},
	Mutation: {
		create: (_, { input }) => {
			logger.info("Mutation.create resolver");
			const missingFriends =
				input.friends?.filter((name) => !db.has(name)) ?? [];
			if (missingFriends.length > 0) {
				throw new Error(
					`Unable to add friends: ${missingFriends.join(",")} because they don't exist`,
				);
			}
			const person = {
				...input,
				friends: input.friends?.map((name) => ({ name, friends: [] })) ?? [],
			};
			db.set(input.name, person);
			// Set friends
			input.friends?.forEach((name) => {
				const friend = db.get(name)!;
				db.set(name, {
					...friend,
					friends: [...friend.friends, { name: input.name, friends: [] }],
				});
			});
			return {
				...person,
				friends: person.friends,
			};
		},
	},
	Person: {
		name: (parent) => {
			logger.info("Person.name resolver");
			return parent.name;
		},
		age: (parent) => {
			logger.info("Person.age resolver");
			return parent.age;
		},
		photo: (parent) => {
			logger.info("Person.photo resolver");
			return parent.photo;
		},
		friends: (parent) => {
			logger.info("Person.friends resolver");
			return parent.friends.map(({ name }) => db.get(name)!);
		},
	},
	Url: {
		[Symbol.toStringTag]: "",
		name: "Url",
		description: null,
		specifiedByURL: null,
		extensions: {},
		astNode: null,
		extensionASTNodes: [],
		parseValue: (value) => {
			if (typeof value !== "string") {
				throw new Error(
					`Invalid input value: ${String(value)}. Expected a URL string`,
				);
			}

			return new URL(value);
		},
		parseLiteral: (value) => {
			if (value.kind !== Kind.STRING) {
				throw new Error(
					`Invalid input value type: ${String(value.kind)}. Expected a URL string`,
				);
			}

			return new URL(value.value);
		},
		serialize: (value) => {
			if (!(value instanceof URL)) {
				throw new Error(
					`Invalid input value: ${String(value)}. Expected a URL string`,
				);
			}

			return value.toString();
		},
		toJSON: () => "",
		toConfig: () => {
			return {
				name: "Url",
				description: null,
				specifiedByURL: null,
				extensions: {},
				astNode: null,
				extensionASTNodes: [],
				parseValue: (value) => {
					if (typeof value !== "string") {
						throw new Error(
							`Invalid input value: ${String(value)}. Expected a URL string`,
						);
					}

					return URL.parse(value);
				},
				parseLiteral: (value) => {
					if (value.kind !== Kind.STRING) {
						throw new Error(
							`Invalid input value type: ${String(value.kind)}. Expected a URL string`,
						);
					}

					return URL.parse(value.value);
				},
				serialize: (value) => {
					if (!(value instanceof URL)) {
						throw new Error(
							`Invalid input value: ${String(value)}. Expected a URL string`,
						);
					}

					return value.toString();
				},
			};
		},
	},
};

const schema = createSchema({ typeDefs, resolvers });
const yoga = createYoga({
	schema,
	context: () => {
		logger.info("New GraphQL Request");
		return {};
	},
});
const server = createServer(yoga.requestListener).listen(
	8081,
	"127.0.0.1",
	() => {
		const address = server.address();
		if (!address) {
			throw new Error("Invalid server address");
		}

		if (typeof address === "string") {
			return logger.info(`Server listening at: http://${address}`);
		}

		return logger.info(
			`Server is listening at: http://${address.address}:${address.port}`,
		);
	},
);
