"use client";

import {
  DialogRoot,
  DialogPortal,
  DialogBackdrop,
  DialogPopup,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Sparkles,
  Star,
  X,
  Flame,
  Trophy,
  ClipboardList,
  Check,
} from "lucide-react";
import type { Wish } from "@/lib/types";

interface CelebrationModalProps {
  wish: Wish | null;
  open: boolean;
  onClose: () => void;
}

export default function CelebrationModal({
  wish,
  open,
  onClose,
}: CelebrationModalProps) {
  return (
    <DialogRoot open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogPortal>
        <DialogBackdrop />
        <DialogPopup>
          <div className="flex flex-col w-[400px] bg-duckie-bg border-3 border-duckie-black">
            {/* Top decoration */}
            <div className="flex items-start justify-between px-4 pt-4 pb-0">
              <div className="relative w-[100px] h-[60px]">
                <Sparkles
                  size={28}
                  className="absolute left-2.5 top-1 text-duckie-primary"
                  fill="var(--duckie-primary)"
                />
                <Star
                  size={20}
                  className="absolute left-1 top-9 text-duckie-primary"
                  fill="var(--duckie-primary)"
                />
              </div>
              <div className="flex-1" />
              <div className="relative w-[100px] h-[60px]">
                <Sparkles
                  size={22}
                  className="absolute left-[50px] top-5 text-duckie-primary"
                  fill="var(--duckie-primary)"
                />
                <DialogClose
                  render={
                    <button className="absolute right-0 top-0 flex items-center justify-center w-9 h-9 bg-duckie-bg border-3 border-duckie-black cursor-pointer">
                      <X size={18} />
                    </button>
                  }
                />
              </div>
            </div>

            {/* Hero section */}
            <div className="flex flex-col items-center gap-5 px-8 pb-8">
              <img src="/icons/celebration-duck.png" alt="Duckie" className="w-[100px] h-[100px]" />
              <h2 className="font-mono text-[32px] font-black text-duckie-dark tracking-wider">
                AMAZING!
              </h2>
              <p className="text-[15px] italic text-duckie-brown">
                You've completed a wish!
              </p>
            </div>

            {/* Wish item */}
            <div className="flex items-center gap-2.5 px-6 py-3.5 border-t-2 border-duckie-black/20">
              <div className="flex items-center justify-center w-[22px] h-[22px] bg-duckie-primary border-2 border-duckie-black">
                <Check size={14} strokeWidth={3} />
              </div>
              <span className="inline-flex items-center px-2 py-0.5 bg-duckie-primary border-2 border-duckie-black font-mono text-[10px] font-extrabold text-duckie-dark">
                {wish?.owner === "em bé" ? "em bé" : "chún"}
              </span>
              <span className="text-[15px] font-bold text-duckie-dark">
                {wish?.name} {wish?.categoryEmoji && <img src={wish.categoryEmoji} alt="" width={16} height={16} className="inline-block ml-1" />}
              </span>
            </div>

            {/* Stats row */}
            {/* <div className="flex gap-2 px-5 py-4">
              <div className="flex-1 flex flex-col items-center justify-center gap-1 h-[100px] border-3 border-duckie-black bg-duckie-bg p-3">
                <Flame size={20} className="text-duckie-dark" />
                <span className="font-mono text-[28px] font-black text-duckie-dark">
                  5
                </span>
                <span className="font-mono text-[8px] font-bold text-duckie-brown tracking-wider">
                  NGÀY STREAK
                </span>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center gap-1 h-[100px] border-3 border-duckie-black bg-duckie-primary p-3">
                <Trophy size={20} className="text-duckie-dark" />
                <span className="font-mono text-xs font-black text-duckie-dark">
                  MỚI !
                </span>
                <span className="text-[11px] font-bold text-duckie-dark text-center">
                  Vịt Con Đầu Tiên
                </span>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center gap-1 h-[100px] border-3 border-duckie-black bg-duckie-bg p-3">
                <ClipboardList size={20} className="text-duckie-dark" />
                <span className="font-mono text-[28px] font-black text-duckie-dark">
                  2/7
                </span>
                <span className="font-mono text-[8px] font-bold text-duckie-brown tracking-wider">
                  HOÀN THÀNH
                </span>
              </div>
            </div> */}

            {/* Quote */}
            <div className="flex justify-center px-5 py-2">
              <p className="text-xs italic text-duckie-brown text-center max-w-[340px]">
                &ldquo;Together we fulfill each small wish, building a
                great happiness&rdquo; 🤍
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-2.5 px-5 pt-2 pb-5">
<DialogClose
                render={
                  <button className="flex-1 flex items-center justify-center gap-2 h-12 bg-duckie-dark border-3 border-duckie-black font-mono text-[13px] font-extrabold text-white tracking-wider cursor-pointer">
                    CONTINUE
                  </button>
                }
              />
            </div>
          </div>
        </DialogPopup>
      </DialogPortal>
    </DialogRoot>
  );
}
