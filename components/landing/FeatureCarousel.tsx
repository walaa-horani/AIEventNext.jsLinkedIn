'use client';

import * as React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const FEATURED_IMAGES = [
    {
        src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop",
        alt: "Music Concert",
        title: "Live Concerts"
    },
    {
        src: "/TechConferences.jpg",
        alt: "Tech Conference",
        title: "Tech Conferences"
    },
    {
        src: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2069&auto=format&fit=crop",
        alt: "Networking",
        title: "Networking Events"
    },
    {
        src: "/creative.jpg",
        alt: "Workshops",
        title: "Creative Workshops"
    },
];

export default function FeatureCarousel() {
    const plugin = React.useRef(
        Autoplay({ delay: 3000, stopOnInteraction: true })
    );

    return (
        <div className="w-full  py-12 bg-muted/30">
            <div className="container px-4 md:px-6">
                <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">Experience the Magic</h2>
                <Carousel
                    plugins={[plugin.current]}
                    className="w-full mx-auto"
                    onMouseEnter={plugin.current.stop}
                    onMouseLeave={plugin.current.reset}
                >
                    <CarouselContent>
                        {FEATURED_IMAGES.map((image, index) => (
                            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/1 pl-4">
                                <div className="p-1">
                                    <Card className="overflow-hidden border-0 shadow-lg">
                                        <CardContent className="flex aspect-[21/9] items-center justify-center p-0 relative">
                                            <Image
                                                src={image.src}
                                                alt={image.alt}
                                                fill
                                                className="object-cover transition-transform hover:scale-105 duration-500"
                                            />
                                            <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors" />
                                            <h3 className="absolute bottom-4 left-4 text-white font-bold text-xl drop-shadow-md">
                                                {image.title}
                                            </h3>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="hidden md:flex" />
                    <CarouselNext className="hidden md:flex" />
                </Carousel>
            </div>
        </div>
    );
}
