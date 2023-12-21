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