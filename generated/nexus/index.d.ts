/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context } from "./../../src/context"
import type { Wish } from "./../../node_modules/@prisma/client/index"




declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  ValueObjectInput: { // input type
    amount: number; // Int!
    currency: string; // String!
  }
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  DateTime: any
}

export interface NexusGenObjects {
  Mutation: {};
  Query: {};
  Share: { // root type
    claimedWishIds: string[]; // [String!]!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: string; // ID!
    invitedEmail: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  User: { // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    email: string; // String!
    googleUserId: string; // String!
    id: string; // ID!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  ValueObject: { // root type
    amount: number; // Int!
    currency: string; // String!
  }
  Wish: Wish;
  WishList: { // root type
    archivedAt?: NexusGenScalars['DateTime'] | null; // DateTime
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    headline: string; // String!
    id: string; // ID!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    wishOrder: string[]; // [String!]!
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  Mutation: { // field return type
    archiveWishList: NexusGenRootTypes['WishList'] | null; // WishList
    changeWish: NexusGenRootTypes['Wish'] | null; // Wish
    changeWishList: NexusGenRootTypes['WishList'] | null; // WishList
    claimWish: NexusGenRootTypes['Share'] | null; // Share
    createShare: NexusGenRootTypes['Share'] | null; // Share
    createUser: NexusGenRootTypes['User'] | null; // User
    createWish: NexusGenRootTypes['Wish'] | null; // Wish
    createWishList: NexusGenRootTypes['WishList'] | null; // WishList
    removeAWish: string | null; // String
    removeShare: NexusGenRootTypes['Share'] | null; // Share
    removeWishClaim: NexusGenRootTypes['Share'] | null; // Share
    sendShareEmails: boolean | null; // Boolean
    unarchiveWishList: NexusGenRootTypes['WishList'] | null; // WishList
    updateWishOrderForWishList: NexusGenRootTypes['WishList'] | null; // WishList
  }
  Query: { // field return type
    getCurrentUser: NexusGenRootTypes['User'] | null; // User
    getOwnShares: Array<NexusGenRootTypes['Share'] | null> | null; // [Share]
    getOwnWish: NexusGenRootTypes['Wish'] | null; // Wish
    getOwnWishList: NexusGenRootTypes['WishList'] | null; // WishList
    getOwnWishLists: Array<NexusGenRootTypes['WishList'] | null> | null; // [WishList]
    getShare: NexusGenRootTypes['Share'] | null; // Share
  }
  Share: { // field return type
    claimedWishIds: string[]; // [String!]!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: string; // ID!
    invitedEmail: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    wishList: NexusGenRootTypes['WishList']; // WishList!
  }
  User: { // field return type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    email: string; // String!
    googleUserId: string; // String!
    id: string; // ID!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  ValueObject: { // field return type
    amount: number; // Int!
    currency: string; // String!
  }
  Wish: { // field return type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    description: string | null; // String
    id: string; // ID!
    image: string | null; // String
    link: string | null; // String
    price: NexusGenRootTypes['ValueObject'] | null; // ValueObject
    quantity: number; // Int!
    title: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    wishList: NexusGenRootTypes['WishList'] | null; // WishList
  }
  WishList: { // field return type
    archivedAt: NexusGenScalars['DateTime'] | null; // DateTime
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    headline: string; // String!
    id: string; // ID!
    shares: NexusGenRootTypes['Share'][]; // [Share!]!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    user: NexusGenRootTypes['User']; // User!
    wishOrder: string[]; // [String!]!
    wishes: NexusGenRootTypes['Wish'][]; // [Wish!]!
  }
}

export interface NexusGenFieldTypeNames {
  Mutation: { // field return type name
    archiveWishList: 'WishList'
    changeWish: 'Wish'
    changeWishList: 'WishList'
    claimWish: 'Share'
    createShare: 'Share'
    createUser: 'User'
    createWish: 'Wish'
    createWishList: 'WishList'
    removeAWish: 'String'
    removeShare: 'Share'
    removeWishClaim: 'Share'
    sendShareEmails: 'Boolean'
    unarchiveWishList: 'WishList'
    updateWishOrderForWishList: 'WishList'
  }
  Query: { // field return type name
    getCurrentUser: 'User'
    getOwnShares: 'Share'
    getOwnWish: 'Wish'
    getOwnWishList: 'WishList'
    getOwnWishLists: 'WishList'
    getShare: 'Share'
  }
  Share: { // field return type name
    claimedWishIds: 'String'
    createdAt: 'DateTime'
    id: 'ID'
    invitedEmail: 'String'
    updatedAt: 'DateTime'
    wishList: 'WishList'
  }
  User: { // field return type name
    createdAt: 'DateTime'
    email: 'String'
    googleUserId: 'String'
    id: 'ID'
    updatedAt: 'DateTime'
  }
  ValueObject: { // field return type name
    amount: 'Int'
    currency: 'String'
  }
  Wish: { // field return type name
    createdAt: 'DateTime'
    description: 'String'
    id: 'ID'
    image: 'String'
    link: 'String'
    price: 'ValueObject'
    quantity: 'Int'
    title: 'String'
    updatedAt: 'DateTime'
    wishList: 'WishList'
  }
  WishList: { // field return type name
    archivedAt: 'DateTime'
    createdAt: 'DateTime'
    headline: 'String'
    id: 'ID'
    shares: 'Share'
    updatedAt: 'DateTime'
    user: 'User'
    wishOrder: 'String'
    wishes: 'Wish'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    archiveWishList: { // args
      id: string; // String!
    }
    changeWish: { // args
      description?: string | null; // String
      id: string; // String!
      image?: string | null; // String
      link?: string | null; // String
      price?: NexusGenInputs['ValueObjectInput'] | null; // ValueObjectInput
      quantity?: number | null; // Int
      title: string; // String!
    }
    changeWishList: { // args
      headline: string; // String!
      id: string; // String!
    }
    claimWish: { // args
      id: string; // String!
      wishId: string; // String!
    }
    createShare: { // args
      invitedEmail: string; // String!
      wishListId: string; // String!
    }
    createUser: { // args
      email: string; // String!
    }
    createWish: { // args
      description?: string | null; // String
      image?: string | null; // String
      link?: string | null; // String
      price?: NexusGenInputs['ValueObjectInput'] | null; // ValueObjectInput
      quantity?: number | null; // Int
      title: string; // String!
      wishListId: string; // String!
    }
    createWishList: { // args
      headline: string; // String!
    }
    removeAWish: { // args
      id: string; // String!
    }
    removeShare: { // args
      id: string; // String!
    }
    removeWishClaim: { // args
      id: string; // String!
      wishId: string; // String!
    }
    sendShareEmails: { // args
      shareIds: string[]; // [String!]!
    }
    unarchiveWishList: { // args
      id: string; // String!
    }
    updateWishOrderForWishList: { // args
      id: string; // String!
      wishOrder: string[]; // [String!]!
    }
  }
  Query: {
    getOwnWish: { // args
      id: string; // String!
    }
    getOwnWishList: { // args
      id: string; // String!
    }
    getShare: { // args
      id: string; // String!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}