import { v } from "convex/values";

import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

/**
 * @description creating a document having field names inside schema
 */
export const createNote = mutation({
  args: {
    title: v.string(),
    parentDocument: v.optional(v.id("documents")),
  },

  //implementation function to asynchronously create document, throws err if user unauthorized
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized user!");
    }

    const userId = identity.subject;

    const document = await ctx.db.insert("documents", {
      title: args.title,
      parentDocument: args.parentDocument,
      userId: userId,
      isArchived: false,
      isPublished: false,
    });

    return document;
  },
});

/**
 * @description get all notes
 */
export const getAllNotes = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized user!");
    }

    const documents = ctx.db.query("documents").collect();

    return documents;
  },
});

/**
 * @description show documents list inside sidebar
 */
export const getSidebar = query({
  args: {
    parentDocument: v.optional(v.id("documents")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized user!");
    }

    const userId = identity.subject;

    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user_parent", (q) =>
        q.eq("userId", userId).eq("parentDocument", args.parentDocument)
      )
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect();

    return documents;
  },
});

/**
 * @description archive documents
 */
export const archiveDocuments = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized user!");
    }

    const userId = identity.subject;

    const existingDocument = await ctx.db.get(args.id);

    //if document not exist then throw error and exit
    if (!existingDocument) {
      throw new Error("Document not found!");
    }

    //if documents exist and userId not equal to extracted userId in the url, then unauthorizes access and exit
    if (existingDocument.userId !== userId) {
      throw new Error("Unauthorized access!");
    }

    //archive all the child documents
    const recursiveArchive = async (documentId: Id<"documents">) => {
      const children = await ctx.db
        .query("documents")
        .withIndex("by_user_parent", (q) =>
          q.eq("userId", userId).eq("parentDocument", documentId)
        )
        .collect();

      //archive the documents by querying all the child documents and setting isArchived property to true
      for (const child of children) {
        await ctx.db.patch(child._id, {
          isArchived: true,
        });

        await recursiveArchive(child._id);
      }
    };

    const document = await ctx.db.patch(args.id, {
      isArchived: true,
    });

    return document;
  },
});
