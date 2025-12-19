import { v } from "convex/values";
import { query } from "./_generated/server";

export const getFeaturedEvents = query({
    args: {
        limit: v.optional(v.number())
    },
    handler: async(ctx,args) => {
        const now = Date.now()
        const  events = await ctx.db.query("events").withIndex("by_start_date").filter((q) => q.gte(q.field("startDate"), now))
        .order("desc")
        .collect()
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
            events = events.filter((e)=> e.city.toLowerCase() === args.city?.toLowerCase() )
        }else if (args.state){
            events = events.filter((e)=>   e.state &&  e.state.toLowerCase() === args.state?.toLowerCase() )  
        }
        return events.slice(0, args.limit ?? 4);

    }
})