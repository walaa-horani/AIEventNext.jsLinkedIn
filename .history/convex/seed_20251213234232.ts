import { internalMutation } from "./_generated/server";

/* =========================================================
   SEED EVENTS DATA (ONLY 4 EVENTS)
========================================================= */

const SEED_EVENTS = [
  {
    title: "Modern React & Next.js Workshop",
    description:
      "A hands-on workshop focused on building modern web applications using React and Next.js. Learn best practices, performance optimizations, and real-world patterns used in production apps.",
    category: "tech",
    tags: ["tech", "react", "nextjs"],
    city: "Bangalore",
    state: "Karnataka",
    venue: "https://maps.google.com/?q=WeWork+Embassy+Golf+Links",
    address: "WeWork Embassy Golf Links, Domlur, Bangalore",
    capacity: 50,
    ticketType: "free",
    coverImage:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&q=80",
    themeColor: "#4c1d95",
  },
  {
    title: "AI Product Building Meetup",
    description:
      "Learn how to design and build AI-powered products using modern APIs and tools. This meetup covers real use cases, product strategy, and practical demos.",
    category: "tech",
    tags: ["tech", "ai", "product"],
    city: "Hyderabad",
    state: "Telangana",
    venue: "https://maps.google.com/?q=T-Hub+Hyderabad",
    address: "T-Hub, IIIT Hyderabad Campus, Gachibowli",
    capacity: 80,
    ticketType: "free",
    coverImage:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80",
    themeColor: "#1e3a8a",
  },
  {
    title: "Startup Networking Breakfast",
    description:
      "Connect with founders, investors, and professionals in a relaxed networking environment. Share ideas, build connections, and learn from real startup experiences.",
    category: "business",
    tags: ["business", "startup", "networking"],
    city: "Gurgaon",
    state: "Haryana",
    venue: "https://maps.google.com/?q=91springboard+Gurgaon",
    address: "91springboard, Sector 44, Gurgaon",
    capacity: 40,
    ticketType: "paid",
    ticketPrice: 299,
    coverImage:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=80",
    themeColor: "#065f46",
  },
  {
    title: "Wellness & Mindfulness Morning Session",
    description:
      "Start your day with guided mindfulness and wellness practices. This session focuses on stress reduction, mental clarity, and building healthy daily habits.",
    category: "health",
    tags: ["health", "wellness", "mindfulness"],
    city: "Jaipur",
    state: "Rajasthan",
    venue: "https://maps.google.com/?q=Central+Park+Jaipur",
    address: "Central Park, C-Scheme, Jaipur",
    capacity: 30,
    ticketType: "paid",
    ticketPrice: 399,
    coverImage:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&q=80",
    themeColor: "#831843",
  },
];

/* =========================================================
   HELPER FUNCTIONS
========================================================= */

function generateFutureStartDate(minDays = 7, maxDays = 60) {
  const now = Date.now();
  const randomDays = Math.floor(Math.random() * (maxDays - minDays) + minDays);
  return now + randomDays * 24 * 60 * 60 * 1000;
}

function calculateEventEndDate(startTime: number) {
  const durationHours = Math.floor(Math.random() * 3) + 2;
  return startTime + durationHours * 60 * 60 * 1000;
}

function generateUniqueSlug(title: string) {
  return (
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") +
    `-${Date.now()}`
  );
}

/* =========================================================
   SEED EVENTS MUTATION
========================================================= */
// Run from Convex Dashboard → Functions → seedEvents → Run
export const seedEvents = internalMutation({
  handler: async (ctx) => {
    // Get or create default organizer
    let organizer = await ctx.db.query("users").first();

    if (!organizer) {
      const organizerId = await ctx.db.insert("users", {
        email: "organizer@eventra.ai",
        tokenIdentifier: "seed-organizer",
        name: "Eventra AI Team",
        hasCompletedOnboarding: true,
        location: {
          city: "Bangalore",
          state: "Karnataka",
          country: "India",
        },
        interests: ["tech", "business", "health"],
        freeEventsCreated: 0,
      
      });

      organizer = await ctx.db.get(organizerId);
    }

    const createdEvents: string[] = [];

    for (const eventData of SEED_EVENTS) {
        const startDate = generateFutureStartDate();
        const endDate = calculateEventEndDate(startDate);
      
        const registrationCount = Math.floor(
          Math.random() * eventData.capacity * 0.6
        );
      
        await ctx.db.insert("events", {
            title: eventData.title,
            description: eventData.description,
            slug: generateUniqueSlug(eventData.title),
          
            organizerId: organizer!._id,
            organizerName: organizer!.name,
          
            category: eventData.category,
            tags: eventData.tags,
          
            startDate,
            endDate,
            timezone: "Asia/Kolkata",
          
            locationType: "physical",
            venue: eventData.venue,
            address: eventData.address,
            city: eventData.city,
            state: eventData.state,
            country: "India",
          
            capacity: eventData.capacity,
            ticketType: eventData.ticketType,
            ticketPrice:
              eventData.ticketType === "paid"
                ? eventData.ticketPrice
                : undefined,
          
            registrationCount,
          
            coverImage: eventData.coverImage,
            themeColor: eventData.themeColor,
          
            createdAt: Date.now(),
            updatedAt: Date.now(),
          });
          
      }

    return {
      success: true,
      count: createdEvents.length,
      events: createdEvents,
    };
  },
});

/* =========================================================
   CLEAR EVENTS (OPTIONAL)
========================================================= */
export const clearEvents = internalMutation({
  handler: async (ctx) => {
    const events = await ctx.db.query("events").collect();
    let deleted = 0;

    for (const event of events) {
      await ctx.db.delete(event._id);
      deleted++;
    }

    return { success: true, deleted };
  },
});
