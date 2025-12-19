import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    // table USER

    users:defineTable({
        name: v.string(),
        tokenIdentifier: v.string(), // clerk user ID
        email: v.string(),
        imageUrl: v.optional(v.string()),
    
        // Onboarding
        hasCompletedOnboarding: v.boolean(),
        
    // Location
    location: v.optional(
        v.object({
          city: v.string(),
          state: v.optional(v.string()),
          country: v.string(),
        })
      ),
    })
})