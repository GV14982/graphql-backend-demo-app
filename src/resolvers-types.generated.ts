import {
	GraphQLResolveInfo,
	GraphQLScalarType,
	GraphQLScalarTypeConfig,
} from "graphql";
export type Maybe<T> = T | undefined | null;
export type InputMaybe<T> = T | undefined | null;
export type Exact<T extends { [key: string]: unknown }> = {
	[K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
	T extends { [key: string]: unknown },
	K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
	| T
	| {
			[P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
	  };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
	[P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: { input: string; output: string };
	String: { input: string; output: string };
	Boolean: { input: boolean; output: boolean };
	Int: { input: number; output: number };
	Float: { input: number; output: number };
	Url: { input: URL; output: URL };
};

export type Business = NamedEntity & {
	__typename?: "Business";
	name: Scalars["String"]["output"];
	type: BusinessType;
};

export enum BusinessType {
	Hospitality = "Hospitality",
	Retail = "Retail",
	Service = "Service",
}

export type Comment = {
	__typename?: "Comment";
	author: Person;
	body: Scalars["String"]["output"];
};

export type CreatePersonInput = {
	age?: InputMaybe<Scalars["Int"]["input"]>;
	friends?: InputMaybe<Array<Scalars["String"]["input"]>>;
	name: Scalars["String"]["input"];
	photo?: InputMaybe<Scalars["Url"]["input"]>;
};

export type Mutation = {
	__typename?: "Mutation";
	create?: Maybe<Person>;
};

export type MutationCreateArgs = {
	input: CreatePersonInput;
};

export type NamedEntity = {
	name: Scalars["String"]["output"];
};

export type Person = NamedEntity & {
	__typename?: "Person";
	age?: Maybe<Scalars["Int"]["output"]>;
	friends: Array<Person>;
	name: Scalars["String"]["output"];
	photo?: Maybe<Scalars["Url"]["output"]>;
};

export type Photo = {
	__typename?: "Photo";
	height?: Maybe<Scalars["Int"]["output"]>;
	width?: Maybe<Scalars["Int"]["output"]>;
};

export type Query = {
	__typename?: "Query";
	person?: Maybe<Person>;
};

export type QueryPersonArgs = {
	name: Scalars["String"]["input"];
};

export type SearchResult = Comment | Photo;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
	resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
	| ResolverFn<TResult, TParent, TContext, TArgs>
	| ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
	TResult,
	TKey extends string,
	TParent,
	TContext,
	TArgs,
> {
	subscribe: SubscriptionSubscribeFn<
		{ [key in TKey]: TResult },
		TParent,
		TContext,
		TArgs
	>;
	resolve?: SubscriptionResolveFn<
		TResult,
		{ [key in TKey]: TResult },
		TContext,
		TArgs
	>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
	subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
	resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
	TResult,
	TKey extends string,
	TParent,
	TContext,
	TArgs,
> =
	| SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
	| SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
	TResult,
	TKey extends string,
	TParent = {},
	TContext = {},
	TArgs = {},
> =
	| ((
			...args: any[]
	  ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
	| SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
	parent: TParent,
	context: TContext,
	info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
	obj: T,
	context: TContext,
	info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
	TResult = {},
	TParent = {},
	TContext = {},
	TArgs = {},
> = (
	next: NextResolverFn<TResult>,
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping of union types */
export type ResolversUnionTypes<_RefType extends Record<string, unknown>> = {
	SearchResult: Comment | Photo;
};

/** Mapping of interface types */
export type ResolversInterfaceTypes<_RefType extends Record<string, unknown>> =
	{
		NamedEntity: Business | Person;
	};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
	Boolean: ResolverTypeWrapper<Scalars["Boolean"]["output"]>;
	Business: ResolverTypeWrapper<Business>;
	BusinessType: BusinessType;
	Comment: ResolverTypeWrapper<Comment>;
	CreatePersonInput: CreatePersonInput;
	Int: ResolverTypeWrapper<Scalars["Int"]["output"]>;
	Mutation: ResolverTypeWrapper<{}>;
	NamedEntity: ResolverTypeWrapper<
		ResolversInterfaceTypes<ResolversTypes>["NamedEntity"]
	>;
	Person: ResolverTypeWrapper<Person>;
	Photo: ResolverTypeWrapper<Photo>;
	Query: ResolverTypeWrapper<{}>;
	SearchResult: ResolverTypeWrapper<
		ResolversUnionTypes<ResolversTypes>["SearchResult"]
	>;
	String: ResolverTypeWrapper<Scalars["String"]["output"]>;
	Url: ResolverTypeWrapper<Scalars["Url"]["output"]>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
	Boolean: Scalars["Boolean"]["output"];
	Business: Business;
	Comment: Comment;
	CreatePersonInput: CreatePersonInput;
	Int: Scalars["Int"]["output"];
	Mutation: {};
	NamedEntity: ResolversInterfaceTypes<ResolversParentTypes>["NamedEntity"];
	Person: Person;
	Photo: Photo;
	Query: {};
	SearchResult: ResolversUnionTypes<ResolversParentTypes>["SearchResult"];
	String: Scalars["String"]["output"];
	Url: Scalars["Url"]["output"];
};

export type BusinessResolvers<
	ContextType = any,
	ParentType extends
		ResolversParentTypes["Business"] = ResolversParentTypes["Business"],
> = {
	name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
	type?: Resolver<ResolversTypes["BusinessType"], ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentResolvers<
	ContextType = any,
	ParentType extends
		ResolversParentTypes["Comment"] = ResolversParentTypes["Comment"],
> = {
	author?: Resolver<ResolversTypes["Person"], ParentType, ContextType>;
	body?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<
	ContextType = any,
	ParentType extends
		ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"],
> = {
	create?: Resolver<
		Maybe<ResolversTypes["Person"]>,
		ParentType,
		ContextType,
		RequireFields<MutationCreateArgs, "input">
	>;
};

export type NamedEntityResolvers<
	ContextType = any,
	ParentType extends
		ResolversParentTypes["NamedEntity"] = ResolversParentTypes["NamedEntity"],
> = {
	__resolveType: TypeResolveFn<"Business" | "Person", ParentType, ContextType>;
	name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
};

export type PersonResolvers<
	ContextType = any,
	ParentType extends
		ResolversParentTypes["Person"] = ResolversParentTypes["Person"],
> = {
	age?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
	friends?: Resolver<Array<ResolversTypes["Person"]>, ParentType, ContextType>;
	name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
	photo?: Resolver<Maybe<ResolversTypes["Url"]>, ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PhotoResolvers<
	ContextType = any,
	ParentType extends
		ResolversParentTypes["Photo"] = ResolversParentTypes["Photo"],
> = {
	height?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
	width?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
	ContextType = any,
	ParentType extends
		ResolversParentTypes["Query"] = ResolversParentTypes["Query"],
> = {
	person?: Resolver<
		Maybe<ResolversTypes["Person"]>,
		ParentType,
		ContextType,
		RequireFields<QueryPersonArgs, "name">
	>;
};

export type SearchResultResolvers<
	ContextType = any,
	ParentType extends
		ResolversParentTypes["SearchResult"] = ResolversParentTypes["SearchResult"],
> = {
	__resolveType: TypeResolveFn<"Comment" | "Photo", ParentType, ContextType>;
};

export interface UrlScalarConfig
	extends GraphQLScalarTypeConfig<ResolversTypes["Url"], any> {
	name: "Url";
}

export type Resolvers<ContextType = any> = {
	Business?: BusinessResolvers<ContextType>;
	Comment?: CommentResolvers<ContextType>;
	Mutation?: MutationResolvers<ContextType>;
	NamedEntity?: NamedEntityResolvers<ContextType>;
	Person?: PersonResolvers<ContextType>;
	Photo?: PhotoResolvers<ContextType>;
	Query?: QueryResolvers<ContextType>;
	SearchResult?: SearchResultResolvers<ContextType>;
	Url?: GraphQLScalarType;
};
