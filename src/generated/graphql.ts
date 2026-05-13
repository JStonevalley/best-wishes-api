import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { User as PrismaUser, Wish as PrismaWish, WishList as PrismaWishList, Share as PrismaShare, ValueObject as PrismaValueObject } from '@prisma/client';
import { Context } from '../context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: any; output: any; }
};

export type Mutation = {
  __typename?: 'Mutation';
  archiveWishList?: Maybe<WishList>;
  changeWish?: Maybe<Wish>;
  changeWishList?: Maybe<WishList>;
  claimWish?: Maybe<Share>;
  createPublicShare?: Maybe<PublicShare>;
  createShare?: Maybe<Share>;
  createUser?: Maybe<User>;
  createWish?: Maybe<Wish>;
  createWishList?: Maybe<WishList>;
  deletePublicShare?: Maybe<PublicShare>;
  redeemPublicShare?: Maybe<Share>;
  removeAWish?: Maybe<Scalars['String']['output']>;
  removeShare?: Maybe<Share>;
  removeWishClaim?: Maybe<Share>;
  sendShareEmails?: Maybe<Scalars['Boolean']['output']>;
  unarchiveWishList?: Maybe<WishList>;
  updateWishOrderForWishList?: Maybe<WishList>;
};


export type MutationArchiveWishListArgs = {
  id: Scalars['String']['input'];
};


export type MutationChangeWishArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  link?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<ValueObjectInput>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  title: Scalars['String']['input'];
};


export type MutationChangeWishListArgs = {
  headline: Scalars['String']['input'];
  id: Scalars['String']['input'];
};


export type MutationClaimWishArgs = {
  id: Scalars['String']['input'];
  wishId: Scalars['String']['input'];
};


export type MutationCreatePublicShareArgs = {
  wishListId: Scalars['String']['input'];
};


export type MutationCreateShareArgs = {
  invitedEmail: Scalars['String']['input'];
  wishListId: Scalars['String']['input'];
};


export type MutationCreateUserArgs = {
  email: Scalars['String']['input'];
};


export type MutationCreateWishArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  link?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<ValueObjectInput>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  title: Scalars['String']['input'];
  wishListId: Scalars['String']['input'];
};


export type MutationCreateWishListArgs = {
  headline: Scalars['String']['input'];
};


export type MutationDeletePublicShareArgs = {
  id: Scalars['String']['input'];
};


export type MutationRedeemPublicShareArgs = {
  publicShareId: Scalars['String']['input'];
};


export type MutationRemoveAWishArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveShareArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveWishClaimArgs = {
  id: Scalars['String']['input'];
  wishId: Scalars['String']['input'];
};


export type MutationSendShareEmailsArgs = {
  shareIds: Array<Scalars['String']['input']>;
};


export type MutationUnarchiveWishListArgs = {
  id: Scalars['String']['input'];
};


export type MutationUpdateWishOrderForWishListArgs = {
  id: Scalars['String']['input'];
  wishOrder: Array<Scalars['String']['input']>;
};

export type PublicShare = {
  __typename?: 'PublicShare';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
  wishList: WishList;
};

export type Query = {
  __typename?: 'Query';
  getCurrentUser?: Maybe<User>;
  getOwnShares?: Maybe<Array<Maybe<Share>>>;
  getOwnWish?: Maybe<Wish>;
  getOwnWishList?: Maybe<WishList>;
  getOwnWishLists?: Maybe<Array<Maybe<WishList>>>;
  getPublicShare?: Maybe<PublicShare>;
  getShare?: Maybe<Share>;
};


export type QueryGetOwnWishArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetOwnWishListArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetPublicShareArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetShareArgs = {
  id: Scalars['String']['input'];
};

export type Share = {
  __typename?: 'Share';
  claimedWishIds: Array<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  invitedEmail: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  wishList: WishList;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  googleUserId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ValueObject = {
  __typename?: 'ValueObject';
  /** Amount in minor units */
  amount: Scalars['Int']['output'];
  /** Currency 3 letter identifier according to ISO 4217 */
  currency: Scalars['String']['output'];
};

export type ValueObjectInput = {
  /** Amount in minor units */
  amount: Scalars['Int']['input'];
  /** Currency 3 letter identifier according to ISO 4217 */
  currency: Scalars['String']['input'];
};

export type Wish = {
  __typename?: 'Wish';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  link?: Maybe<Scalars['String']['output']>;
  price?: Maybe<ValueObject>;
  quantity: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  wishList?: Maybe<WishList>;
};

export type WishList = {
  __typename?: 'WishList';
  archivedAt?: Maybe<Scalars['DateTime']['output']>;
  createdAt: Scalars['DateTime']['output'];
  headline: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  publicShare?: Maybe<PublicShare>;
  shares: Array<Share>;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  wishOrder: Array<Scalars['String']['output']>;
  wishes: Array<Wish>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = Record<PropertyKey, never>, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;





/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<Record<PropertyKey, never>>;
  PublicShare: ResolverTypeWrapper<Omit<PublicShare, 'wishList'> & { wishList: ResolversTypes['WishList'] }>;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  Share: ResolverTypeWrapper<PrismaShare>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  User: ResolverTypeWrapper<PrismaUser>;
  ValueObject: ResolverTypeWrapper<PrismaValueObject>;
  ValueObjectInput: ValueObjectInput;
  Wish: ResolverTypeWrapper<PrismaWish>;
  WishList: ResolverTypeWrapper<PrismaWishList>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  DateTime: Scalars['DateTime']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Mutation: Record<PropertyKey, never>;
  PublicShare: Omit<PublicShare, 'wishList'> & { wishList: ResolversParentTypes['WishList'] };
  Query: Record<PropertyKey, never>;
  Share: PrismaShare;
  String: Scalars['String']['output'];
  User: PrismaUser;
  ValueObject: PrismaValueObject;
  ValueObjectInput: ValueObjectInput;
  Wish: PrismaWish;
  WishList: PrismaWishList;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  archiveWishList?: Resolver<Maybe<ResolversTypes['WishList']>, ParentType, ContextType, RequireFields<MutationArchiveWishListArgs, 'id'>>;
  changeWish?: Resolver<Maybe<ResolversTypes['Wish']>, ParentType, ContextType, RequireFields<MutationChangeWishArgs, 'id' | 'title'>>;
  changeWishList?: Resolver<Maybe<ResolversTypes['WishList']>, ParentType, ContextType, RequireFields<MutationChangeWishListArgs, 'headline' | 'id'>>;
  claimWish?: Resolver<Maybe<ResolversTypes['Share']>, ParentType, ContextType, RequireFields<MutationClaimWishArgs, 'id' | 'wishId'>>;
  createPublicShare?: Resolver<Maybe<ResolversTypes['PublicShare']>, ParentType, ContextType, RequireFields<MutationCreatePublicShareArgs, 'wishListId'>>;
  createShare?: Resolver<Maybe<ResolversTypes['Share']>, ParentType, ContextType, RequireFields<MutationCreateShareArgs, 'invitedEmail' | 'wishListId'>>;
  createUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'email'>>;
  createWish?: Resolver<Maybe<ResolversTypes['Wish']>, ParentType, ContextType, RequireFields<MutationCreateWishArgs, 'title' | 'wishListId'>>;
  createWishList?: Resolver<Maybe<ResolversTypes['WishList']>, ParentType, ContextType, RequireFields<MutationCreateWishListArgs, 'headline'>>;
  deletePublicShare?: Resolver<Maybe<ResolversTypes['PublicShare']>, ParentType, ContextType, RequireFields<MutationDeletePublicShareArgs, 'id'>>;
  redeemPublicShare?: Resolver<Maybe<ResolversTypes['Share']>, ParentType, ContextType, RequireFields<MutationRedeemPublicShareArgs, 'publicShareId'>>;
  removeAWish?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationRemoveAWishArgs, 'id'>>;
  removeShare?: Resolver<Maybe<ResolversTypes['Share']>, ParentType, ContextType, RequireFields<MutationRemoveShareArgs, 'id'>>;
  removeWishClaim?: Resolver<Maybe<ResolversTypes['Share']>, ParentType, ContextType, RequireFields<MutationRemoveWishClaimArgs, 'id' | 'wishId'>>;
  sendShareEmails?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationSendShareEmailsArgs, 'shareIds'>>;
  unarchiveWishList?: Resolver<Maybe<ResolversTypes['WishList']>, ParentType, ContextType, RequireFields<MutationUnarchiveWishListArgs, 'id'>>;
  updateWishOrderForWishList?: Resolver<Maybe<ResolversTypes['WishList']>, ParentType, ContextType, RequireFields<MutationUpdateWishOrderForWishListArgs, 'id' | 'wishOrder'>>;
};

export type PublicShareResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PublicShare'] = ResolversParentTypes['PublicShare']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  wishList?: Resolver<ResolversTypes['WishList'], ParentType, ContextType>;
};

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getCurrentUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  getOwnShares?: Resolver<Maybe<Array<Maybe<ResolversTypes['Share']>>>, ParentType, ContextType>;
  getOwnWish?: Resolver<Maybe<ResolversTypes['Wish']>, ParentType, ContextType, RequireFields<QueryGetOwnWishArgs, 'id'>>;
  getOwnWishList?: Resolver<Maybe<ResolversTypes['WishList']>, ParentType, ContextType, RequireFields<QueryGetOwnWishListArgs, 'id'>>;
  getOwnWishLists?: Resolver<Maybe<Array<Maybe<ResolversTypes['WishList']>>>, ParentType, ContextType>;
  getPublicShare?: Resolver<Maybe<ResolversTypes['PublicShare']>, ParentType, ContextType, RequireFields<QueryGetPublicShareArgs, 'id'>>;
  getShare?: Resolver<Maybe<ResolversTypes['Share']>, ParentType, ContextType, RequireFields<QueryGetShareArgs, 'id'>>;
};

export type ShareResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Share'] = ResolversParentTypes['Share']> = {
  claimedWishIds?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  invitedEmail?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  wishList?: Resolver<ResolversTypes['WishList'], ParentType, ContextType>;
};

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  googleUserId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
};

export type ValueObjectResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ValueObject'] = ResolversParentTypes['ValueObject']> = {
  amount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  currency?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type WishResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Wish'] = ResolversParentTypes['Wish']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  link?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['ValueObject']>, ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  wishList?: Resolver<Maybe<ResolversTypes['WishList']>, ParentType, ContextType>;
};

export type WishListResolvers<ContextType = Context, ParentType extends ResolversParentTypes['WishList'] = ResolversParentTypes['WishList']> = {
  archivedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  headline?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  publicShare?: Resolver<Maybe<ResolversTypes['PublicShare']>, ParentType, ContextType>;
  shares?: Resolver<Array<ResolversTypes['Share']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  wishOrder?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  wishes?: Resolver<Array<ResolversTypes['Wish']>, ParentType, ContextType>;
};

export type Resolvers<ContextType = Context> = {
  DateTime?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  PublicShare?: PublicShareResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Share?: ShareResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  ValueObject?: ValueObjectResolvers<ContextType>;
  Wish?: WishResolvers<ContextType>;
  WishList?: WishListResolvers<ContextType>;
};

