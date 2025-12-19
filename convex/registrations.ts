import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

/* =========================
   MUTATION: JOIN EVENT (BOOK TICKET)
========================= */
export const create = mutation({
    args: {
        eventId: v.id("events"),
        ticketType: v.literal("free"), // For now, only supporting free via this flow or extend as needed
        attendeeName: v.string(),
        attendeeEmail: v.string(),
    },
    handler: async (ctx, args) => {
        /* ---------- AUTH ---------- */
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Unauthenticated");
        }

        const user = await ctx.db
            .query("users")
            .withIndex("token", (q) =>
                q.eq("tokenIdentifier", identity.tokenIdentifier)
            )
            .unique();

        if (!user) {
            throw new Error("User not found");
        }

        /* ---------- CHECK EXISTING REGISTRATION ---------- */
        const existingRegistration = await ctx.db
            .query("registrations")
            .withIndex("by_event_user", (q) =>
                q.eq("eventId", args.eventId).eq("userId", user._id)
            )
            .unique();

        if (existingRegistration) {
            throw new Error("You are already registered for this event.");
        }

        /* ---------- CHECK EVENT CAPACITY ---------- */
        const event = await ctx.db.get(args.eventId);
        if (!event) {
            throw new Error("Event not found");
        }

        if (event.registrationCount >= event.capacity) {
            throw new Error("Event is sold out.");
        }

        /* ---------- CREATE REGISTRATION ---------- */
        const qrCode = `${args.eventId}-${user._id}-${Date.now()}`; // Simple unique string

        const registrationId = await ctx.db.insert("registrations", {
            eventId: args.eventId,
            userId: user._id,
            attendeeName: args.attendeeName,
            attendeeEmail: args.attendeeEmail,
            qrCode,
            checkedIn: false,
            status: "confirmed",
            registeredAt: Date.now(),
        });

        /* ---------- UPDATE EVENT STATS ---------- */
        await ctx.db.patch(args.eventId, {
            registrationCount: event.registrationCount + 1,
        });

        return registrationId;
    },
});

/* =========================
   QUERY: GET MY TICKETS
========================= */
export const getMyRegistrations = query({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) return [];

        const user = await ctx.db
            .query("users")
            .withIndex("token", (q) =>
                q.eq("tokenIdentifier", identity.tokenIdentifier)
            )
            .unique();

        if (!user) return [];

        const registrations = await ctx.db
            .query("registrations")
            .withIndex("by_user", (q) => q.eq("userId", user._id))
            .collect();

        // Enrich with event data
        const registrationsWithEvents = await Promise.all(
            registrations.map(async (reg) => {
                const event = await ctx.db.get(reg.eventId);
                return {
                    ...reg,
                    event,
                };
            })
        );

        return registrationsWithEvents;
    },
});
