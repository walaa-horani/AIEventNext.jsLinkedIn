import {
  Laptop,
  Music,
  Briefcase,
  HeartPulse,
  GraduationCap,
  Users,
} from "lucide-react"

export const CATEGORIES = [
  {
    id: "tech",
    label: "Technology",
    description: "Meetups, hackathons, and conferences focused on modern technology and software.",
    icon: Laptop,
  },
  {
    id: "music",
    label: "Music",
    description: "Live concerts, DJ events, festivals, and musical performances.",
    icon: Music,
  },
  {
    id: "business",
    label: "Business",
    description: "Networking events, conferences, and startup-related meetups.",
    icon: Briefcase,
  },
  {
    id: "health",
    label: "Health & Wellness",
    description: "Wellness activities, fitness sessions, and mindfulness events.",
    icon: HeartPulse,
  },
  {
    id: "education",
    label: "Education",
    description: "Workshops, talks, and learning-focused experiences.",
    icon: GraduationCap,
  },
  {
    id: "community",
    label: "Community",
    description: "Local gatherings, social events, and community-driven activities.",
    icon: Users,
  },
] as const

export type CategoryId = typeof CATEGORIES[number]["id"]
