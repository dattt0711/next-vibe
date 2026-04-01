"use client";

import {
  DialogRoot,
  DialogPortal,
  DialogBackdrop,
  DialogPopup,
  DialogClose,
} from "@/components/ui/dialog";
import { MapPin, ChevronDown } from "lucide-react";

interface AddLocationModalProps {
  open: boolean;
  onClose: () => void;
}

const categories = [
  { emoji: "/icons/emoji/restaurant.png", name: "Nhà hàng" },
  { emoji: "/icons/emoji/cafe.png", name: "Cafe" },
  { emoji: "/icons/emoji/fun.png", name: "Vui chơi" },
  { emoji: "/icons/emoji/travel.png", name: "Du lịch" },
  { emoji: "/icons/emoji/shopping.png", name: "Mua sắm" },
  { emoji: "/icons/emoji/beach.png", name: "Biển" },
  { emoji: "/icons/emoji/mountain.png", name: "Núi" },
  { emoji: "/icons/emoji/culture.png", name: "Văn hóa" },
];

export default function AddLocationModal({
  open,
  onClose,
}: AddLocationModalProps) {
  return (
    <DialogRoot open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogPortal>
        <DialogBackdrop />
        <DialogPopup>
          <div className="flex flex-col gap-5 w-[600px] bg-duckie-white border-3 border-duckie-black p-8 shadow-[6px_6px_0_var(--duckie-black)]">
            {/* Title row */}
            <div className="flex items-center gap-2 w-full">
              <h2 className="flex-1 font-mono text-[22px] font-extrabold text-duckie-dark">
                Thêm Địa Điểm Mới
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

            {/* Name field */}
            <div className="flex flex-col gap-1.5 w-full">
              <label className="font-mono text-xs font-bold text-duckie-brown">
                Tên địa điểm *
              </label>
              <input
                type="text"
                placeholder="VD: Phở Thìn Lò Đúc, Café Cộng..."
                className="h-12 px-3.5 bg-duckie-white border-2 border-duckie-black text-sm font-geist text-duckie-dark placeholder:text-duckie-brown outline-none focus:ring-2 focus:ring-duckie-primary"
              />
            </div>

            {/* Category + Owner row */}
            <div className="flex gap-4 w-full">
              {/* Category dropdown */}
              <div className="flex-1 flex flex-col gap-1.5">
                <label className="font-mono text-xs font-bold text-duckie-brown">
                  Loại địa điểm
                </label>
                <div className="flex items-center h-12 px-3.5 bg-duckie-white border-2 border-duckie-black cursor-pointer">
                  <span className="flex-1 text-sm text-duckie-brown">
                    Chọn loại...
                  </span>
                  <ChevronDown size={18} className="text-duckie-brown" />
                </div>
              </div>

              {/* Owner */}
              <div className="flex-1 flex flex-col gap-1.5">
                <label className="font-mono text-xs font-bold text-duckie-brown">
                  Đề xuất bởi
                </label>
                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-1.5 h-12 bg-duckie-primary border-3 border-duckie-black font-mono text-sm font-bold text-duckie-dark cursor-pointer shadow-[3px_3px_0_var(--duckie-black)]">
                    <img
                      src="/icons/emoji/duck.png"
                      alt=""
                      width={16}
                      height={16}
                    />
                    chún
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-1.5 h-12 bg-duckie-white border-2 border-duckie-black font-mono text-sm font-bold text-duckie-dark cursor-pointer">
                    <img
                      src="/icons/emoji/boo.png"
                      alt=""
                      width={16}
                      height={16}
                    />
                    em bé
                  </button>
                </div>
              </div>
            </div>

            {/* Address field */}
            <div className="flex flex-col gap-1.5 w-full">
              <label className="font-mono text-xs font-bold text-duckie-brown">
                Địa chỉ (tùy chọn)
              </label>
              <div className="flex items-center h-12 px-3.5 bg-duckie-white border-2 border-duckie-black">
                <MapPin size={16} className="text-duckie-brown mr-2" />
                <input
                  type="text"
                  placeholder="VD: 13 Lò Đúc, Hai Bà Trưng, Hà Nội"
                  className="flex-1 bg-transparent text-sm font-geist text-duckie-dark placeholder:text-duckie-brown outline-none"
                />
              </div>
            </div>

            {/* Note field */}
            <div className="flex flex-col gap-1.5 w-full">
              <label className="font-mono text-xs font-bold text-duckie-brown">
                Ghi chú (tùy chọn)
              </label>
              <textarea
                placeholder="Lý do muốn đi, tip hay ho..."
                className="h-20 p-3.5 bg-duckie-white border-2 border-duckie-black text-sm font-geist text-duckie-dark placeholder:text-duckie-brown outline-none resize-none focus:ring-2 focus:ring-duckie-primary"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 w-full">
              <DialogClose
                render={
                  <button className="flex-1 flex items-center justify-center h-12 bg-duckie-white border-2 border-duckie-black font-mono text-sm font-bold text-duckie-dark cursor-pointer">
                    Hủy bỏ
                  </button>
                }
              />
              <button className="flex-1 flex items-center justify-center h-12 bg-duckie-primary border-3 border-duckie-black font-mono text-sm font-extrabold text-duckie-dark shadow-[4px_4px_0_var(--duckie-black)] cursor-pointer">
                ✦ Thêm Địa Điểm
              </button>
            </div>
          </div>
        </DialogPopup>
      </DialogPortal>
    </DialogRoot>
  );
}
