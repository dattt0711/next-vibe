"use client";

import {
  DialogRoot,
  DialogPortal,
  DialogBackdrop,
  DialogPopup,
  DialogClose,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import type { Location } from "@/lib/types";

interface LocationDetailModalProps {
  location: Location | null;
  open: boolean;
  onClose: () => void;
}

export default function LocationDetailModal({ location, open, onClose }: LocationDetailModalProps) {
  if (!location) return null;
  const isVisited = location.status === "visited";

  return (
    <DialogRoot open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogPortal>
        <DialogBackdrop />
        <DialogPopup>
          <div className="flex flex-col gap-5 w-[480px] bg-duckie-white border-3 border-duckie-black p-8 shadow-[6px_6px_0_var(--duckie-black)]">
            {/* Title row */}
            <div className="flex items-center gap-2 w-full">
              <h2 className="flex-1 font-mono text-[22px] font-extrabold text-duckie-dark">
                Location Detail
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

            {/* Image */}
            {location.locationImg && (
              <div className="w-full border-2 border-duckie-black overflow-hidden">
                <img src={location.locationImg} alt={location.name} className="w-full h-48 object-cover" />
              </div>
            )}

            {/* Status */}
            <div className="flex items-center gap-3">
              <Badge variant={isVisited ? "done" : "pending"}>
                {isVisited ? "Visited ✓" : "Want to go"}
              </Badge>
              <span className="text-xs text-duckie-brown">{location.date}</span>
            </div>

            {/* Location name */}
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[10px] font-bold text-duckie-brown tracking-wider">
                LOCATION
              </span>
              <span className={`text-lg font-extrabold font-geist ${isVisited ? "line-through text-duckie-brown" : "text-duckie-dark"}`}>
                {location.name}
              </span>
            </div>

            {/* Type */}
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[10px] font-bold text-duckie-brown tracking-wider">
                TYPE
              </span>
              <span className="inline-flex items-center gap-2 text-sm text-duckie-dark font-semibold">
                <img src={location.typeEmoji} alt="" width={18} height={18} className="inline-block" />
                {location.type}
              </span>
            </div>

            {/* Proposed by */}
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[10px] font-bold text-duckie-brown tracking-wider">
                PROPOSED BY
              </span>
              <span className="inline-flex items-center gap-2 text-sm text-duckie-dark font-semibold">
                <img
                  src={location.proposedBy === "anh" ? "/icons/emoji/duck.png" : "/icons/emoji/boo.png"}
                  alt=""
                  width={18}
                  height={18}
                  className="inline-block"
                />
                {location.proposedBy === "anh" ? "chún" : "em bé"}
              </span>
            </div>

            {/* Address */}
            {location.address && (
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[10px] font-bold text-duckie-brown tracking-wider">
                  ADDRESS
                </span>
                <p className="text-sm text-duckie-dark font-geist">
                  {location.address}
                </p>
              </div>
            )}

            {/* Note */}
            {location.note && (
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[10px] font-bold text-duckie-brown tracking-wider">
                  NOTE
                </span>
                <p className="text-sm text-duckie-dark font-geist leading-relaxed">
                  {location.note}
                </p>
              </div>
            )}

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
