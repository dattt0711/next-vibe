"use client";

import {
  DialogRoot,
  DialogPortal,
  DialogBackdrop,
  DialogPopup,
  DialogClose,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import type { Wish } from "@/lib/types";

interface WishDetailModalProps {
  wish: Wish | null;
  open: boolean;
  onClose: () => void;
}

export default function WishDetailModal({ wish, open, onClose }: WishDetailModalProps) {
  if (!wish) return null;

  const isDone = wish.status === "done";

  return (
    <DialogRoot open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogPortal>
        <DialogBackdrop />
        <DialogPopup>
          <div className="flex flex-col gap-5 w-[480px] bg-duckie-white border-3 border-duckie-black p-8 shadow-[6px_6px_0_var(--duckie-black)]">
            {/* Title row */}
            <div className="flex items-center gap-2 w-full">
              <h2 className="flex-1 font-mono text-[22px] font-extrabold text-duckie-dark">
                Wish Detail
              </h2>
              <DialogClose
                render={
                  <button className="flex items-center justify-center w-9 h-9 bg-duckie-white border-2 border-duckie-black cursor-pointer font-mono text-base font-bold text-duckie-dark">
                    ✕
                  </button>
                }
              />
            </div>

            {/* Divider */}
            <div className="w-full h-0.5 bg-duckie-black" />

            {/* Status */}
            <div className="flex items-center gap-3">
              <Badge variant={isDone ? "done" : "pending"}>
                {isDone ? "Done ✓" : "Pending"}
              </Badge>
              <span className="text-xs text-duckie-brown">{wish.date}</span>
            </div>

            {/* Image */}
            {wish.imageUrl && (
              <div className="w-full border-2 border-duckie-black overflow-hidden">
                <img src={wish.imageUrl} alt={wish.name} className="w-full h-48 object-cover" />
              </div>
            )}

            {/* Wish name */}
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[10px] font-bold text-duckie-brown tracking-wider">
                WISH NAME
              </span>
              <span className={`text-lg font-extrabold font-geist ${isDone ? "line-through text-duckie-brown" : "text-duckie-dark"}`}>
                {wish.name}
              </span>
            </div>

            {/* Description */}
            {wish.description && (
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[10px] font-bold text-duckie-brown tracking-wider">
                  DESCRIPTION
                </span>
                <p className="text-sm text-duckie-dark font-geist leading-relaxed">
                  {wish.description}
                </p>
              </div>
            )}

            {/* Category */}
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[10px] font-bold text-duckie-brown tracking-wider">
                CATEGORY
              </span>
              <span className="inline-flex items-center gap-2 text-sm text-duckie-dark font-semibold">
                <img src={wish.categoryEmoji} alt="" width={18} height={18} className="inline-block" />
                {wish.category}
              </span>
            </div>

            {/* Owner */}
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[10px] font-bold text-duckie-brown tracking-wider">
                OWNER
              </span>
              <span className="inline-flex items-center gap-2 text-sm text-duckie-dark font-semibold">
                <img
                  src={wish.owner === "chún" ? "/icons/emoji/duck.png" : "/icons/emoji/boo.png"}
                  alt=""
                  width={18}
                  height={18}
                  className="inline-block"
                />
                {wish.owner}
              </span>
            </div>

            {/* Close button */}
            <DialogClose
              render={
                <button className="flex items-center justify-center h-12 bg-duckie-primary border-3 border-duckie-black font-mono text-sm font-extrabold text-duckie-dark shadow-[4px_4px_0_var(--duckie-black)] cursor-pointer">
                  Close
                </button>
              }
            />
          </div>
        </DialogPopup>
      </DialogPortal>
    </DialogRoot>
  );
}
