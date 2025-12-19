"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type OnBoardingModalProps = {
  open: boolean
  onClose: () => void
}

function OnBoardingModal({ open, onClose }: OnBoardingModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            Personalize your experience
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
         
          <div className="rounded-xl border p-4 hover:bg-muted cursor-pointer">
            🎵 Music
          </div>
          <div className="rounded-xl border p-4 hover:bg-muted cursor-pointer">
            💻 Technology
          </div>
          <div className="rounded-xl border p-4 hover:bg-muted cursor-pointer">
            🧘 Health
          </div>
        </div>

      </DialogContent>
    </Dialog>
  )
}

export default OnBoardingModal
