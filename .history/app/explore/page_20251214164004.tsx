"use client";

import { useEffect, useState } from "react";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

import FeaturedCarouesel from "../components/FeaturedCarouesel";
import FeaturedEvents from "../components/FeaturedEvents";
import { NearbyEvents } from "../components/NearbyEvents";
import CategoriesEvent from "../components/CategoriesEvent";
import { PopularEvents } from "../components/PopularEvents";
import OnBoardingModal from "../components/OnBoardingModal";

export default function Explore() {
  const user = useQuery(api.users.getMe);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (user && !user.hasCompletedOnboarding) {
      setOpen(true);
    }
  }, [user]);

  if (!user) return null;

  return (
    <>
      <OnBoardingModal
        open={open}
        onClose={() => setOpen(false)}
      />

      <div className={open ? "blur-sm pointer-events-none" : ""}>
        <FeaturedCarouesel />
        <FeaturedEvents />
        <NearbyEvents />
        <CategoriesEvent />
        <PopularEvents />
      </div>
    </>
  );
}
