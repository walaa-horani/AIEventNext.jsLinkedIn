"use client";

import { Button } from "@/components/ui/button";
import { useStoreUserEffect } from "@/hooks/user-store";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Calendar, DotIcon, Search, Ticket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BarLoader } from "react-spinners";


export default function Header() {

    const {isLoading} = useStoreUserEffect()
      return (
    <header className="fixed top-0 inset-x-0 z-50 border-b p-3 border-white/10 bg-black/80 backdrop-blur-md">
      {isLoading && (
        <div className="absolute bottom-0 left-0 right-0 w-full">
          <BarLoader 
            color="#22c55e" 
            height={3} 
            width={1000} 
            loading={isLoading}
            cssOverride={{ width: '100%', display: 'block' }}
          />
        </div>
      )}
      <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link href="/" >
          <Image alt="image" width={90} height={90} src="/logo.png"/>
        
        </Link>

        {/* Search + Filters (desktop only) */}
        <div className="hidden md:flex flex-1 max-w-xl items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 h-10">
          <Search className="w-4 h-4 text-white/60" />

          <input
            placeholder="Search events..."
            className="bg-transparent flex-1 text-sm text-white placeholder:text-white/40 outline-none"
          />

          <div className="flex items-center gap-2 text-sm text-white/70">
            <button className="hover:text-white">State</button>
            <span>/</span>
            <button className="hover:text-white">City</button>
          </div>
        </div>

        {/* Right links */}
        <nav className="flex items-center gap-4 text-sm text-white/80">
          <Link href="/pricing" className="hidden sm:block hover:text-white">
            Pricing
          </Link>
          <Link href="/explore" className="hidden sm:block hover:text-white">
            Explore
          </Link>
          <Link href="/create-event" className="hidden sm:block hover:text-white">
            Create Event
          </Link>

          <SignedOut>
              <SignInButton  mode="modal">

              <Button className="bg-green-500 text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  Signin
                </Button>     
              </SignInButton>
              <SignUpButton  mode="modal">
                <Button className="bg-green-500 text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  Sign Up
                </Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton>
                <UserButton.MenuItems>
                  <UserButton.Link
                    label="My Events"
                    labelIcon={<Calendar />}
                    href="/my-events"
                  />
                </UserButton.MenuItems>

                <UserButton.MenuItems>
                  <UserButton.Link
                    label="My Tickets"
                    labelIcon={<Ticket />}
                    href="/my-tickets"
                  />
                </UserButton.MenuItems>
              </UserButton>
            </SignedIn>
        </nav>

      </div>
    </header> 
  );
}
