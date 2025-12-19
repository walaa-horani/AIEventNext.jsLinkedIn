// Event Categories
export const CATEGORIES = [
    {
      id: "tech",
      label: "Technology",
      description: "Meetups, hackathons, and conferences focused on modern technology and software.",
    },
    {
      id: "music",
      label: "Music",
      description: "Live concerts, DJ events, festivals, and musical performances.",
    },
    {
      id: "business",
      label: "Business",
      description: "Networking events, conferences, and startup-related meetups.",
    },
    {
      id: "health",
      label: "Health & Wellness",
      description: "Wellness activities, fitness sessions, and mindfulness events.",
    },
    {
      id: "education",
      label: "Education",
      description: "Workshops, talks, and learning-focused experiences.",
    },
    {
      id: "community",
      label: "Community",
      description: "Local gatherings, social events, and community-driven activities.",
    },
  ] as const;
  
  // ✅ DEFINE THE TYPE HERE
  export type CategoryId = typeof CATEGORIES[number]["id"];
  
  // Get category by ID
  export const getCategoryById = (id: CategoryId) => {
    return CATEGORIES.find((cat) => cat.id === id);
  };
  
  // Get category label by ID
  export const getCategoryLabel = (id: CategoryId) => {
    const category = getCategoryById(id);
    return category ? category.label : id;
  };
  