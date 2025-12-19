import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const getFeaturedEvents = query({
    args: {
        limit: v.optional(v.number())
    },
    handler: async(ctx,args) => {
        const now = Date.now()
        const  events = await ctx.db.query("events").withIndex("by_start_date").filter((q) => q.gte(q.field("startDate"), now))
        .order("desc")
        .collect()
        return events.slice(0, args.limit ?? 4)
    }
})

export const getEventByLocation = query({
    args:{
       
        city:v.optional(v.string()),
        state:v.optional(v.string()),
        limit:v.optional(v.number()),
    },
    handler: async(ctx,args) => {
        const now = Date.now()
        
        let  events = await ctx.db.query("events").withIndex("by_start_date").filter((q) => q.gte(q.field("startDate"), now))
       
        .collect()

        if(args.city){
            console.log("ARGS:", args)
            events = events.filter((e)=> e.city.toLowerCase() === args.city?.toLowerCase() )
        }else if (args.state){
            events = events.filter((e)=>   e.state &&  e.state.toLowerCase() === args.state?.toLowerCase() )  
        }
        return events.slice(0, args.limit ?? 4);

    }
})




export const getPopularEvents = query({
    args:{
        
        limit:v.optional(v.number()),
    },
    handler: async(ctx,args) => {
        const now = Date.now()
        
        let  events = await ctx.db.query("events").withIndex("by_start_date").filter((q) => q.gte(q.field("startDate"), now))
       
        .collect()

        const popular = events.sort((a,b)=> b.registrationCount  - a.registrationCount).slice(0 , args.limit ?? 6)
        return popular
        

    }
})

export const getEventByCategory = query({
    args: {
      category: v.string(),
      limit: v.optional(v.number()),
    },
    handler: async (ctx, args) => {
      const now = Date.now()
  
      return await ctx.db
        .query("events")
        .withIndex("by_category", (q) =>
          q.eq("category", args.category)
        )
        .filter((q) =>
          q.gte(q.field("startDate"), now)
        )
        .take(args.limit ?? 6)
    },
  })
  
  export const getEventById = query({
    args: {
      id: v.id("events"),
    },
    handler: async (ctx, args) => {
      return await ctx.db.get(args.id)
    },
  })

  export const create = mutation({
    args: {
      title: v.string(),
      description: v.string(),
      category: v.string(),
      tags: v.array(v.string()),
      startDate: v.number(),
      endDate: v.number(),
      timezone: v.string(),
      locationType: v.union(v.literal("physical"), v.literal("online")),
      venue: v.optional(v.string()),
      address: v.optional(v.string()),
      city: v.string(),
      state: v.optional(v.string()),
      country: v.string(),
      capacity: v.number(),
      ticketType: v.union(v.literal("free"), v.literal("paid")),
      ticketPrice: v.optional(v.number()),
      coverImage: v.optional(v.string()),
      themeColor: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
      const identity = await ctx.auth.getUserIdentity();
      if (!identity) {
        throw new Error("Called createEvent without authentication present");
      }

      // Get the current user
      const user = await ctx.db
        .query("users")
        .withIndex("token", (q) =>
          q.eq("tokenIdentifier", identity.tokenIdentifier)
        )
        .unique();

      if (!user) {
        throw new Error("User not found");
      }

      // Generate slug from title
      const slug = args.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") + "-" + Date.now().toString(36);

      const now = Date.now();

      // Create the event
      const eventId = await ctx.db.insert("events", {
        title: args.title,
        description: args.description,
        slug: slug,
        organizerId: user._id,
        organizerName: user.name,
        category: args.category,
        tags: args.tags,
        startDate: args.startDate,
        endDate: args.endDate,
        timezone: args.timezone,
        locationType: args.locationType,
        venue: args.venue,
        address: args.address,
        city: args.city,
        state: args.state,
        country: args.country,
        capacity: args.capacity,
        ticketType: args.ticketType,
        ticketPrice: args.ticketPrice,
        registrationCount: 0,
        coverImage: args.coverImage,
        themeColor: args.themeColor,
        createdAt: now,
        updatedAt: now,
      });

      return eventId;
    },
  });

  