import * as NexusCore from 'nexus/dist/core'

//
//
// TYPES
// TYPES
// TYPES
// TYPES
//
//

// Models

/**
  * Generated Nexus `objectType` configuration based on your Prisma schema's model `Wish`.
  *
  * ### ️⚠️ You have not written documentation for model Wish
  *
  * Replace this default advisory JSDoc with your own documentation about model Wish
  * by documenting it in your Prisma schema. For example:
  *
  * ```prisma
  * /// Lorem ipsum dolor sit amet...
  * model Wish {
  *   foo  String
  * }
  * ```
  *
  * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
  *
  * @example
  *
  * import { objectType } from 'nexus'
  * import { Wish } from 'nexus-prisma'
  *
  * objectType({
  *   name: Wish.$name
  *   description: Wish.$description
  *   definition(t) {
  *     t.field(Wish.id)
  *   }
  * })
  */
export interface Wish {
  $name: 'Wish'
  $description: undefined
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Wish.id`.
    *
    * ### ️⚠️ You have not written documentation for model Wish
    *
    * Replace this default advisory JSDoc with your own documentation about model Wish
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Wish {
    *   /// Lorem ipsum dolor sit amet.
    *   id  String
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Wish } from 'nexus-prisma'
    *
    * objectType({
    *   name: Wish.$name
    *   description: Wish.$description
    *   definition(t) {
    *     t.field(Wish.id)
    *   }
    * })
    */
  id: {
    /**
     * The name of this field.
     */
    name: 'id'
  
    /**
     * The type of this field.
     */
    type: 'ID' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'ID' & NexusCore.GetGen<'allNamedTypes', string>>
    : 'Warning/Error: The type \'ID\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'ID\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Wish', 'id'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Wish.createdAt`.
    *
    * ### ️⚠️ You have not written documentation for model Wish
    *
    * Replace this default advisory JSDoc with your own documentation about model Wish
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Wish {
    *   /// Lorem ipsum dolor sit amet.
    *   createdAt  DateTime
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Wish } from 'nexus-prisma'
    *
    * objectType({
    *   name: Wish.$name
    *   description: Wish.$description
    *   definition(t) {
    *     t.field(Wish.createdAt)
    *   }
    * })
    */
  createdAt: {
    /**
     * The name of this field.
     */
    name: 'createdAt'
  
    /**
     * The type of this field.
     */
    type: 'DateTime' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'DateTime' & NexusCore.GetGen<'allNamedTypes', string>>
    : 'Warning/Error: The type \'DateTime\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'DateTime\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Wish', 'createdAt'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Wish.updatedAt`.
    *
    * ### ️⚠️ You have not written documentation for model Wish
    *
    * Replace this default advisory JSDoc with your own documentation about model Wish
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Wish {
    *   /// Lorem ipsum dolor sit amet.
    *   updatedAt  DateTime
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Wish } from 'nexus-prisma'
    *
    * objectType({
    *   name: Wish.$name
    *   description: Wish.$description
    *   definition(t) {
    *     t.field(Wish.updatedAt)
    *   }
    * })
    */
  updatedAt: {
    /**
     * The name of this field.
     */
    name: 'updatedAt'
  
    /**
     * The type of this field.
     */
    type: 'DateTime' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'DateTime' & NexusCore.GetGen<'allNamedTypes', string>>
    : 'Warning/Error: The type \'DateTime\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'DateTime\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Wish', 'updatedAt'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Wish.title`.
    *
    * ### ️⚠️ You have not written documentation for model Wish
    *
    * Replace this default advisory JSDoc with your own documentation about model Wish
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Wish {
    *   /// Lorem ipsum dolor sit amet.
    *   title  String
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Wish } from 'nexus-prisma'
    *
    * objectType({
    *   name: Wish.$name
    *   description: Wish.$description
    *   definition(t) {
    *     t.field(Wish.title)
    *   }
    * })
    */
  title: {
    /**
     * The name of this field.
     */
    name: 'title'
  
    /**
     * The type of this field.
     */
    type: 'String' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'String' & NexusCore.GetGen<'allNamedTypes', string>>
    : 'Warning/Error: The type \'String\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'String\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Wish', 'title'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Wish.description`.
    *
    * ### ️⚠️ You have not written documentation for model Wish
    *
    * Replace this default advisory JSDoc with your own documentation about model Wish
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Wish {
    *   /// Lorem ipsum dolor sit amet.
    *   description  String?
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Wish } from 'nexus-prisma'
    *
    * objectType({
    *   name: Wish.$name
    *   description: Wish.$description
    *   definition(t) {
    *     t.field(Wish.description)
    *   }
    * })
    */
  description: {
    /**
     * The name of this field.
     */
    name: 'description'
  
    /**
     * The type of this field.
     */
    type: 'String' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNullDef<'String' & NexusCore.GetGen<'allNamedTypes', string>>
    : 'Warning/Error: The type \'String\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'String\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Wish', 'description'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Wish.price`.
    *
    * ### ️⚠️ You have not written documentation for model Wish
    *
    * Replace this default advisory JSDoc with your own documentation about model Wish
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Wish {
    *   /// Lorem ipsum dolor sit amet.
    *   price  ValueObject?
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Wish } from 'nexus-prisma'
    *
    * objectType({
    *   name: Wish.$name
    *   description: Wish.$description
    *   definition(t) {
    *     t.field(Wish.price)
    *   }
    * })
    */
  price: {
    /**
     * The name of this field.
     */
    name: 'price'
  
    /**
     * The type of this field.
     */
    type: 'ValueObject' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNullDef<'ValueObject' & NexusCore.GetGen<'allNamedTypes', string>>
    : 'Warning/Error: The type \'ValueObject\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'ValueObject\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Wish', 'price'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Wish.quantity`.
    *
    * ### ️⚠️ You have not written documentation for model Wish
    *
    * Replace this default advisory JSDoc with your own documentation about model Wish
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Wish {
    *   /// Lorem ipsum dolor sit amet.
    *   quantity  Int
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Wish } from 'nexus-prisma'
    *
    * objectType({
    *   name: Wish.$name
    *   description: Wish.$description
    *   definition(t) {
    *     t.field(Wish.quantity)
    *   }
    * })
    */
  quantity: {
    /**
     * The name of this field.
     */
    name: 'quantity'
  
    /**
     * The type of this field.
     */
    type: 'Int' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'Int' & NexusCore.GetGen<'allNamedTypes', string>>
    : 'Warning/Error: The type \'Int\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'Int\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Wish', 'quantity'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Wish.link`.
    *
    * ### ️⚠️ You have not written documentation for model Wish
    *
    * Replace this default advisory JSDoc with your own documentation about model Wish
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Wish {
    *   /// Lorem ipsum dolor sit amet.
    *   link  String?
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Wish } from 'nexus-prisma'
    *
    * objectType({
    *   name: Wish.$name
    *   description: Wish.$description
    *   definition(t) {
    *     t.field(Wish.link)
    *   }
    * })
    */
  link: {
    /**
     * The name of this field.
     */
    name: 'link'
  
    /**
     * The type of this field.
     */
    type: 'String' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNullDef<'String' & NexusCore.GetGen<'allNamedTypes', string>>
    : 'Warning/Error: The type \'String\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'String\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Wish', 'link'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Wish.image`.
    *
    * ### ️⚠️ You have not written documentation for model Wish
    *
    * Replace this default advisory JSDoc with your own documentation about model Wish
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Wish {
    *   /// Lorem ipsum dolor sit amet.
    *   image  String?
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Wish } from 'nexus-prisma'
    *
    * objectType({
    *   name: Wish.$name
    *   description: Wish.$description
    *   definition(t) {
    *     t.field(Wish.image)
    *   }
    * })
    */
  image: {
    /**
     * The name of this field.
     */
    name: 'image'
  
    /**
     * The type of this field.
     */
    type: 'String' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNullDef<'String' & NexusCore.GetGen<'allNamedTypes', string>>
    : 'Warning/Error: The type \'String\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'String\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Wish', 'image'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Wish.wishList`.
    *
    * ### ️⚠️ You have not written documentation for model Wish
    *
    * Replace this default advisory JSDoc with your own documentation about model Wish
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Wish {
    *   /// Lorem ipsum dolor sit amet.
    *   wishList  WishList?
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Wish } from 'nexus-prisma'
    *
    * objectType({
    *   name: Wish.$name
    *   description: Wish.$description
    *   definition(t) {
    *     t.field(Wish.wishList)
    *   }
    * })
    */
  wishList: {
    /**
     * The name of this field.
     */
    name: 'wishList'
  
    /**
     * The type of this field.
     */
    type: 'WishList' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNullDef<'WishList' & NexusCore.GetGen<'allNamedTypes', string>>
    : 'Warning/Error: The type \'WishList\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'WishList\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Wish', 'wishList'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Wish.wishListId`.
    *
    * ### ️⚠️ You have not written documentation for model Wish
    *
    * Replace this default advisory JSDoc with your own documentation about model Wish
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Wish {
    *   /// Lorem ipsum dolor sit amet.
    *   wishListId  String?
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Wish } from 'nexus-prisma'
    *
    * objectType({
    *   name: Wish.$name
    *   description: Wish.$description
    *   definition(t) {
    *     t.field(Wish.wishListId)
    *   }
    * })
    */
  wishListId: {
    /**
     * The name of this field.
     */
    name: 'wishListId'
  
    /**
     * The type of this field.
     */
    type: 'String' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNullDef<'String' & NexusCore.GetGen<'allNamedTypes', string>>
    : 'Warning/Error: The type \'String\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'String\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Wish', 'wishListId'>
  }
}

/**
  * Generated Nexus `objectType` configuration based on your Prisma schema's model `Share`.
  *
  * ### ️⚠️ You have not written documentation for model Share
  *
  * Replace this default advisory JSDoc with your own documentation about model Share
  * by documenting it in your Prisma schema. For example:
  *
  * ```prisma
  * /// Lorem ipsum dolor sit amet...
  * model Share {
  *   foo  String
  * }
  * ```
  *
  * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
  *
  * @example
  *
  * import { objectType } from 'nexus'
  * import { Share } from 'nexus-prisma'
  *
  * objectType({
  *   name: Share.$name
  *   description: Share.$description
  *   definition(t) {
  *     t.field(Share.id)
  *   }
  * })
  */
export interface Share {
  $name: 'Share'
  $description: undefined
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Share.id`.
    *
    * ### ️⚠️ You have not written documentation for model Share
    *
    * Replace this default advisory JSDoc with your own documentation about model Share
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Share {
    *   /// Lorem ipsum dolor sit amet.
    *   id  String
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Share } from 'nexus-prisma'
    *
    * objectType({
    *   name: Share.$name
    *   description: Share.$description
    *   definition(t) {
    *     t.field(Share.id)
    *   }
    * })
    */
  id: {
    /**
     * The name of this field.
     */
    name: 'id'
  
    /**
     * The type of this field.
     */
    type: 'ID' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'ID' & NexusCore.GetGen<'allNamedTypes', string>>
    : 'Warning/Error: The type \'ID\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'ID\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Share', 'id'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Share.createdAt`.
    *
    * ### ️⚠️ You have not written documentation for model Share
    *
    * Replace this default advisory JSDoc with your own documentation about model Share
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Share {
    *   /// Lorem ipsum dolor sit amet.
    *   createdAt  DateTime
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Share } from 'nexus-prisma'
    *
    * objectType({
    *   name: Share.$name
    *   description: Share.$description
    *   definition(t) {
    *     t.field(Share.createdAt)
    *   }
    * })
    */
  createdAt: {
    /**
     * The name of this field.
     */
    name: 'createdAt'
  
    /**
     * The type of this field.
     */
    type: 'DateTime' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'DateTime' & NexusCore.GetGen<'allNamedTypes', string>>
    : 'Warning/Error: The type \'DateTime\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'DateTime\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Share', 'createdAt'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Share.updatedAt`.
    *
    * ### ️⚠️ You have not written documentation for model Share
    *
    * Replace this default advisory JSDoc with your own documentation about model Share
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Share {
    *   /// Lorem ipsum dolor sit amet.
    *   updatedAt  DateTime
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Share } from 'nexus-prisma'
    *
    * objectType({
    *   name: Share.$name
    *   description: Share.$description
    *   definition(t) {
    *     t.field(Share.updatedAt)
    *   }
    * })
    */
  updatedAt: {
    /**
     * The name of this field.
     */
    name: 'updatedAt'
  
    /**
     * The type of this field.
     */
    type: 'DateTime' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'DateTime' & NexusCore.GetGen<'allNamedTypes', string>>
    : 'Warning/Error: The type \'DateTime\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'DateTime\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Share', 'updatedAt'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Share.invitedEmail`.
    *
    * ### ️⚠️ You have not written documentation for model Share
    *
    * Replace this default advisory JSDoc with your own documentation about model Share
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Share {
    *   /// Lorem ipsum dolor sit amet.
    *   invitedEmail  String
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Share } from 'nexus-prisma'
    *
    * objectType({
    *   name: Share.$name
    *   description: Share.$description
    *   definition(t) {
    *     t.field(Share.invitedEmail)
    *   }
    * })
    */
  invitedEmail: {
    /**
     * The name of this field.
     */
    name: 'invitedEmail'
  
    /**
     * The type of this field.
     */
    type: 'String' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'String' & NexusCore.GetGen<'allNamedTypes', string>>
    : 'Warning/Error: The type \'String\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'String\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Share', 'invitedEmail'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Share.wishList`.
    *
    * ### ️⚠️ You have not written documentation for model Share
    *
    * Replace this default advisory JSDoc with your own documentation about model Share
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Share {
    *   /// Lorem ipsum dolor sit amet.
    *   wishList  WishList
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Share } from 'nexus-prisma'
    *
    * objectType({
    *   name: Share.$name
    *   description: Share.$description
    *   definition(t) {
    *     t.field(Share.wishList)
    *   }
    * })
    */
  wishList: {
    /**
     * The name of this field.
     */
    name: 'wishList'
  
    /**
     * The type of this field.
     */
    type: 'WishList' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'WishList' & NexusCore.GetGen<'allNamedTypes', string>>
    : 'Warning/Error: The type \'WishList\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'WishList\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Share', 'wishList'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Share.wishListId`.
    *
    * ### ️⚠️ You have not written documentation for model Share
    *
    * Replace this default advisory JSDoc with your own documentation about model Share
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Share {
    *   /// Lorem ipsum dolor sit amet.
    *   wishListId  String
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Share } from 'nexus-prisma'
    *
    * objectType({
    *   name: Share.$name
    *   description: Share.$description
    *   definition(t) {
    *     t.field(Share.wishListId)
    *   }
    * })
    */
  wishListId: {
    /**
     * The name of this field.
     */
    name: 'wishListId'
  
    /**
     * The type of this field.
     */
    type: 'String' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'String' & NexusCore.GetGen<'allNamedTypes', string>>
    : 'Warning/Error: The type \'String\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'String\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Share', 'wishListId'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Share.claimedWishIds`.
    *
    * ### ️⚠️ You have not written documentation for model Share
    *
    * Replace this default advisory JSDoc with your own documentation about model Share
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Share {
    *   /// Lorem ipsum dolor sit amet.
    *   claimedWishIds  String
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Share } from 'nexus-prisma'
    *
    * objectType({
    *   name: Share.$name
    *   description: Share.$description
    *   definition(t) {
    *     t.field(Share.claimedWishIds)
    *   }
    * })
    */
  claimedWishIds: {
    /**
     * The name of this field.
     */
    name: 'claimedWishIds'
  
    /**
     * The type of this field.
     */
    type: 'String' extends NexusCore.GetGen<'allNamedTypes', string>
    ? (NexusCore.NexusListDef<'String' & NexusCore.GetGen<'allNamedTypes', string>> | NexusCore.NexusNonNullDef<'String' & NexusCore.GetGen<'allNamedTypes', string>>)
    : 'Warning/Error: The type \'String\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'String\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Share', 'claimedWishIds'>
  }
}

/**
  * Generated Nexus `objectType` configuration based on your Prisma schema's model `WishList`.
  *
  * ### ️⚠️ You have not written documentation for model WishList
  *
  * Replace this default advisory JSDoc with your own documentation about model WishList
  * by documenting it in your Prisma schema. For example:
  *
  * ```prisma
  * /// Lorem ipsum dolor sit amet...
  * model WishList {
  *   foo  String
  * }
  * ```
  *
  * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
  *
  * @example
  *
  * import { objectType } from 'nexus'
  * import { WishList } from 'nexus-prisma'
  *
  * objectType({
  *   name: WishList.$name
  *   description: WishList.$description
  *   definition(t) {
  *     t.field(WishList.id)
  *   }
  * })
  */
export interface WishList {
  $name: 'WishList'
  $description: undefined
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `WishList.id`.
    *
    * ### ️⚠️ You have not written documentation for model WishList
    *
    * Replace this default advisory JSDoc with your own documentation about model WishList
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model WishList {
    *   /// Lorem ipsum dolor sit amet.
    *   id  String
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { WishList } from 'nexus-prisma'
    *
    * objectType({
    *   name: WishList.$name
    *   description: WishList.$description
    *   definition(t) {
    *     t.field(WishList.id)
    *   }
    * })
    */
  id: {
    /**
     * The name of this field.
     */
    name: 'id'
  
    /**
     * The type of this field.
     */
    type: 'ID' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'ID' & NexusCore.GetGen<'allNamedTypes', string>>
    : 'Warning/Error: The type \'ID\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'ID\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'WishList', 'id'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `WishList.createdAt`.
    *
    * ### ️⚠️ You have not written documentation for model WishList
    *
    * Replace this default advisory JSDoc with your own documentation about model WishList
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model WishList {
    *   /// Lorem ipsum dolor sit amet.
    *   createdAt  DateTime
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { WishList } from 'nexus-prisma'
    *
    * objectType({
    *   name: WishList.$name
    *   description: WishList.$description
    *   definition(t) {
    *     t.field(WishList.createdAt)
    *   }
    * })
    */
  createdAt: {
    /**
     * The name of this field.
     */
    name: 'createdAt'
  
    /**
     * The type of this field.
     */
    type: 'DateTime' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'DateTime' & NexusCore.GetGen<'allNamedTypes', string>>
    : 'Warning/Error: The type \'DateTime\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'DateTime\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'WishList', 'createdAt'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `WishList.updatedAt`.
    *
    * ### ️⚠️ You have not written documentation for model WishList
    *
    * Replace this default advisory JSDoc with your own documentation about model WishList
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model WishList {
    *   /// Lorem ipsum dolor sit amet.
    *   updatedAt  DateTime
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { WishList } from 'nexus-prisma'
    *
    * objectType({
    *   name: WishList.$name
    *   description: WishList.$description
    *   definition(t) {
    *     t.field(WishList.updatedAt)
    *   }
    * })
    */
  updatedAt: {
    /**
     * The name of this field.
     */
    name: 'updatedAt'
  
    /**
     * The type of this field.
     */
    type: 'DateTime' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'DateTime' & NexusCore.GetGen<'allNamedTypes', string>>
    : 'Warning/Error: The type \'DateTime\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'DateTime\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'WishList', 'updatedAt'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `WishList.archivedAt`.
    *
    * ### ️⚠️ You have not written documentation for model WishList
    *
    * Replace this default advisory JSDoc with your own documentation about model WishList
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model WishList {
    *   /// Lorem ipsum dolor sit amet.
    *   archivedAt  DateTime?
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { WishList } from 'nexus-prisma'
    *
    * objectType({
    *   name: WishList.$name
    *   description: WishList.$description
    *   definition(t) {
    *     t.field(WishList.archivedAt)
    *   }
    * })
    */
  archivedAt: {
    /**
     * The name of this field.
     */
    name: 'archivedAt'
  
    /**
     * The type of this field.
     */
    type: 'DateTime' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNullDef<'DateTime' & NexusCore.GetGen<'allNamedTypes', string>>
    : 'Warning/Error: The type \'DateTime\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'DateTime\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'WishList', 'archivedAt'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `WishList.headline`.
    *
    * ### ️⚠️ You have not written documentation for model WishList
    *
    * Replace this default advisory JSDoc with your own documentation about model WishList
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model WishList {
    *   /// Lorem ipsum dolor sit amet.
    *   headline  String
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { WishList } from 'nexus-prisma'
    *
    * objectType({
    *   name: WishList.$name
    *   description: WishList.$description
    *   definition(t) {
    *     t.field(WishList.headline)
    *   }
    * })
    */
  headline: {
    /**
     * The name of this field.
     */
    name: 'headline'
  
    /**
     * The type of this field.
     */
    type: 'String' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'String' & NexusCore.GetGen<'allNamedTypes', string>>
    : 'Warning/Error: The type \'String\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'String\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'WishList', 'headline'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `WishList.wishes`.
    *
    * ### ️⚠️ You have not written documentation for model WishList
    *
    * Replace this default advisory JSDoc with your own documentation about model WishList
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model WishList {
    *   /// Lorem ipsum dolor sit amet.
    *   wishes  Wish
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { WishList } from 'nexus-prisma'
    *
    * objectType({
    *   name: WishList.$name
    *   description: WishList.$description
    *   definition(t) {
    *     t.field(WishList.wishes)
    *   }
    * })
    */
  wishes: {
    /**
     * The name of this field.
     */
    name: 'wishes'
  
    /**
     * The type of this field.
     */
    type: 'Wish' extends NexusCore.GetGen<'allNamedTypes', string>
    ? (NexusCore.NexusListDef<'Wish' & NexusCore.GetGen<'allNamedTypes', string>> | NexusCore.NexusNonNullDef<'Wish' & NexusCore.GetGen<'allNamedTypes', string>>)
    : 'Warning/Error: The type \'Wish\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'Wish\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'WishList', 'wishes'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `WishList.wishOrder`.
    *
    * ### ️⚠️ You have not written documentation for model WishList
    *
    * Replace this default advisory JSDoc with your own documentation about model WishList
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model WishList {
    *   /// Lorem ipsum dolor sit amet.
    *   wishOrder  String
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { WishList } from 'nexus-prisma'
    *
    * objectType({
    *   name: WishList.$name
    *   description: WishList.$description
    *   definition(t) {
    *     t.field(WishList.wishOrder)
    *   }
    * })
    */
  wishOrder: {
    /**
     * The name of this field.
     */
    name: 'wishOrder'
  
    /**
     * The type of this field.
     */
    type: 'String' extends NexusCore.GetGen<'allNamedTypes', string>
    ? (NexusCore.NexusListDef<'String' & NexusCore.GetGen<'allNamedTypes', string>> | NexusCore.NexusNonNullDef<'String' & NexusCore.GetGen<'allNamedTypes', string>>)
    : 'Warning/Error: The type \'String\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'String\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'WishList', 'wishOrder'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `WishList.shares`.
    *
    * ### ️⚠️ You have not written documentation for model WishList
    *
    * Replace this default advisory JSDoc with your own documentation about model WishList
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model WishList {
    *   /// Lorem ipsum dolor sit amet.
    *   shares  Share
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { WishList } from 'nexus-prisma'
    *
    * objectType({
    *   name: WishList.$name
    *   description: WishList.$description
    *   definition(t) {
    *     t.field(WishList.shares)
    *   }
    * })
    */
  shares: {
    /**
     * The name of this field.
     */
    name: 'shares'
  
    /**
     * The type of this field.
     */
    type: 'Share' extends NexusCore.GetGen<'allNamedTypes', string>
    ? (NexusCore.NexusListDef<'Share' & NexusCore.GetGen<'allNamedTypes', string>> | NexusCore.NexusNonNullDef<'Share' & NexusCore.GetGen<'allNamedTypes', string>>)
    : 'Warning/Error: The type \'Share\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'Share\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'WishList', 'shares'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `WishList.user`.
    *
    * ### ️⚠️ You have not written documentation for model WishList
    *
    * Replace this default advisory JSDoc with your own documentation about model WishList
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model WishList {
    *   /// Lorem ipsum dolor sit amet.
    *   user  User
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { WishList } from 'nexus-prisma'
    *
    * objectType({
    *   name: WishList.$name
    *   description: WishList.$description
    *   definition(t) {
    *     t.field(WishList.user)
    *   }
    * })
    */
  user: {
    /**
     * The name of this field.
     */
    name: 'user'
  
    /**
     * The type of this field.
     */
    type: 'User' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'User' & NexusCore.GetGen<'allNamedTypes', string>>
    : 'Warning/Error: The type \'User\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'User\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'WishList', 'user'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `WishList.userId`.
    *
    * ### ️⚠️ You have not written documentation for model WishList
    *
    * Replace this default advisory JSDoc with your own documentation about model WishList
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model WishList {
    *   /// Lorem ipsum dolor sit amet.
    *   userId  String
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { WishList } from 'nexus-prisma'
    *
    * objectType({
    *   name: WishList.$name
    *   description: WishList.$description
    *   definition(t) {
    *     t.field(WishList.userId)
    *   }
    * })
    */
  userId: {
    /**
     * The name of this field.
     */
    name: 'userId'
  
    /**
     * The type of this field.
     */
    type: 'String' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'String' & NexusCore.GetGen<'allNamedTypes', string>>
    : 'Warning/Error: The type \'String\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'String\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'WishList', 'userId'>
  }
}

/**
  * Generated Nexus `objectType` configuration based on your Prisma schema's model `User`.
  *
  * ### ️⚠️ You have not written documentation for model User
  *
  * Replace this default advisory JSDoc with your own documentation about model User
  * by documenting it in your Prisma schema. For example:
  *
  * ```prisma
  * /// Lorem ipsum dolor sit amet...
  * model User {
  *   foo  String
  * }
  * ```
  *
  * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
  *
  * @example
  *
  * import { objectType } from 'nexus'
  * import { User } from 'nexus-prisma'
  *
  * objectType({
  *   name: User.$name
  *   description: User.$description
  *   definition(t) {
  *     t.field(User.id)
  *   }
  * })
  */
export interface User {
  $name: 'User'
  $description: undefined
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `User.id`.
    *
    * ### ️⚠️ You have not written documentation for model User
    *
    * Replace this default advisory JSDoc with your own documentation about model User
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model User {
    *   /// Lorem ipsum dolor sit amet.
    *   id  String
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { User } from 'nexus-prisma'
    *
    * objectType({
    *   name: User.$name
    *   description: User.$description
    *   definition(t) {
    *     t.field(User.id)
    *   }
    * })
    */
  id: {
    /**
     * The name of this field.
     */
    name: 'id'
  
    /**
     * The type of this field.
     */
    type: 'ID' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'ID' & NexusCore.GetGen<'allNamedTypes', string>>
    : 'Warning/Error: The type \'ID\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'ID\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'User', 'id'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `User.googleUserId`.
    *
    * ### ️⚠️ You have not written documentation for model User
    *
    * Replace this default advisory JSDoc with your own documentation about model User
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model User {
    *   /// Lorem ipsum dolor sit amet.
    *   googleUserId  String
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { User } from 'nexus-prisma'
    *
    * objectType({
    *   name: User.$name
    *   description: User.$description
    *   definition(t) {
    *     t.field(User.googleUserId)
    *   }
    * })
    */
  googleUserId: {
    /**
     * The name of this field.
     */
    name: 'googleUserId'
  
    /**
     * The type of this field.
     */
    type: 'String' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'String' & NexusCore.GetGen<'allNamedTypes', string>>
    : 'Warning/Error: The type \'String\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'String\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'User', 'googleUserId'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `User.createdAt`.
    *
    * ### ️⚠️ You have not written documentation for model User
    *
    * Replace this default advisory JSDoc with your own documentation about model User
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model User {
    *   /// Lorem ipsum dolor sit amet.
    *   createdAt  DateTime
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { User } from 'nexus-prisma'
    *
    * objectType({
    *   name: User.$name
    *   description: User.$description
    *   definition(t) {
    *     t.field(User.createdAt)
    *   }
    * })
    */
  createdAt: {
    /**
     * The name of this field.
     */
    name: 'createdAt'
  
    /**
     * The type of this field.
     */
    type: 'DateTime' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'DateTime' & NexusCore.GetGen<'allNamedTypes', string>>
    : 'Warning/Error: The type \'DateTime\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'DateTime\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'User', 'createdAt'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `User.updatedAt`.
    *
    * ### ️⚠️ You have not written documentation for model User
    *
    * Replace this default advisory JSDoc with your own documentation about model User
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model User {
    *   /// Lorem ipsum dolor sit amet.
    *   updatedAt  DateTime
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { User } from 'nexus-prisma'
    *
    * objectType({
    *   name: User.$name
    *   description: User.$description
    *   definition(t) {
    *     t.field(User.updatedAt)
    *   }
    * })
    */
  updatedAt: {
    /**
     * The name of this field.
     */
    name: 'updatedAt'
  
    /**
     * The type of this field.
     */
    type: 'DateTime' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'DateTime' & NexusCore.GetGen<'allNamedTypes', string>>
    : 'Warning/Error: The type \'DateTime\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'DateTime\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'User', 'updatedAt'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `User.email`.
    *
    * ### ️⚠️ You have not written documentation for model User
    *
    * Replace this default advisory JSDoc with your own documentation about model User
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model User {
    *   /// Lorem ipsum dolor sit amet.
    *   email  String
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { User } from 'nexus-prisma'
    *
    * objectType({
    *   name: User.$name
    *   description: User.$description
    *   definition(t) {
    *     t.field(User.email)
    *   }
    * })
    */
  email: {
    /**
     * The name of this field.
     */
    name: 'email'
  
    /**
     * The type of this field.
     */
    type: 'String' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'String' & NexusCore.GetGen<'allNamedTypes', string>>
    : 'Warning/Error: The type \'String\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'String\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'User', 'email'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `User.wishLists`.
    *
    * ### ️⚠️ You have not written documentation for model User
    *
    * Replace this default advisory JSDoc with your own documentation about model User
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model User {
    *   /// Lorem ipsum dolor sit amet.
    *   wishLists  WishList
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { User } from 'nexus-prisma'
    *
    * objectType({
    *   name: User.$name
    *   description: User.$description
    *   definition(t) {
    *     t.field(User.wishLists)
    *   }
    * })
    */
  wishLists: {
    /**
     * The name of this field.
     */
    name: 'wishLists'
  
    /**
     * The type of this field.
     */
    type: 'WishList' extends NexusCore.GetGen<'allNamedTypes', string>
    ? (NexusCore.NexusListDef<'WishList' & NexusCore.GetGen<'allNamedTypes', string>> | NexusCore.NexusNonNullDef<'WishList' & NexusCore.GetGen<'allNamedTypes', string>>)
    : 'Warning/Error: The type \'WishList\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'WishList\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'User', 'wishLists'>
  }
}

// Enums

// N/A –– You have not defined any enums in your Prisma schema file.


//
//
// TERMS
// TERMS
// TERMS
// TERMS
//
//

//
//
// EXPORTS: PRISMA MODELS
// EXPORTS: PRISMA MODELS
// EXPORTS: PRISMA MODELS
// EXPORTS: PRISMA MODELS
//
//

export const Wish: Wish

export const Share: Share

export const WishList: WishList

export const User: User

//
//
// EXPORTS: PRISMA ENUMS
// EXPORTS: PRISMA ENUMS
// EXPORTS: PRISMA ENUMS
// EXPORTS: PRISMA ENUMS
//
//

// N/A –– You have not defined any enums in your Prisma schema file.

//
//
// EXPORTS: OTHER
// EXPORTS: OTHER
// EXPORTS: OTHER
// EXPORTS: OTHER
//
//

import type { Settings } from 'nexus-prisma/dist-cjs/generator/Settings/index'

/**
 * Adjust Nexus Prisma's [runtime settings](https://pris.ly/nexus-prisma/docs/settings/runtime).
 *
 * @example
 *
 *     import { PrismaClient } from '@prisma/client'
 *     import { ApolloServer } from '@apollo/server'
 *     import { startStandaloneServer } from '@apollo/server/standalone'   
 *     import { makeSchema } from 'nexus'
 *     import { User, Post, $settings } from 'nexus-prisma'
 *
 *     const apolloServer = new ApolloServer({
 *       schema: makeSchema({
 *         types: [],
 *       }),
 *     })
 *     startStandaloneServer(apolloServer, {
 *       context: async () => {
 *         return {
 *           db: new PrismaClient(), // <-- You put Prisma client on the "db" context property
 *         }
 *       },
 *     }).then(({ url }) => {
 *       console.log('GraphQL API ready at', url)
 *     })
 *
 *     $settings({
 *       prismaClientContextField: 'db', // <-- Tell Nexus Prisma
 *     })
 *
 * @remarks This is _different_ than Nexus Prisma's [_gentime_ settings](https://pris.ly/nexus-prisma/docs/settings/gentime).
 */
export const $settings: Settings.Runtime.Manager['change']
