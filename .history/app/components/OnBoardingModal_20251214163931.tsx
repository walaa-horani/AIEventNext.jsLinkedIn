"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CATEGORIES } from "@/lib/data";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function OnBoardingModal({ open, onClose }: Props) {
  const completeOnboarding = useMutation(
    api.users.completeOnboarding
  );

  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  };

  const handleContinue = async () => {
    if (selected.length < 1) return;

    await completeOnboarding({
      interests: selected,
      location: {
        city: "Istanbul",
        country: "TR",
      },
    });

    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            Choose your interests
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const active = selected.includes(cat.id);

            return (
              <div
                key={cat.id}
                onClick={() => toggle(cat.id)}
                className={`cursor-pointer rounded-xl border p-4 flex items-center gap-3
                ${active ? "border-primary bg-primary/5" : ""}`}
              >
                <Icon className="w-5 h-5 text-primary" />
                <span>{cat.label}</span>
              </div>
            );
          })}
        </div>

        <div className="flex justify-end mt-6">
          <Button onClick={handleContinue}>
            Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
