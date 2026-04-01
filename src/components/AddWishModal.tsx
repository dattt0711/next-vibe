"use client";

import {
  DialogRoot,
  DialogPortal,
  DialogBackdrop,
  DialogPopup,
  DialogClose,
} from "@/components/ui/dialog";
import { Image, ChevronDown } from "lucide-react";

interface AddWishModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AddWishModal({ open, onClose }: AddWishModalProps) {
  return (
    <DialogRoot open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogPortal>
        <DialogBackdrop />
        <DialogPopup>
          <div className="flex flex-col gap-5 w-[600px] bg-duckie-white border-3 border-duckie-black p-8 shadow-[6px_6px_0_var(--duckie-black)]">
            {/* Title row */}
            <div className="flex items-center gap-2 w-full">
              <h2 className="flex-1 font-mono text-[22px] font-extrabold text-duckie-dark">
                Thêm Danh Sách Mới
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
                Tên danh sách *
              </label>
              <input
                type="text"
                placeholder="VD: Quà sinh nhật của Em, Địa điểm hẹn hò..."
                className="h-12 px-3.5 bg-duckie-white border-2 border-duckie-black text-sm font-geist text-duckie-dark placeholder:text-duckie-brown outline-none focus:ring-2 focus:ring-duckie-primary"
              />
            </div>

            {/* Description field */}
            <div className="flex flex-col gap-1.5 w-full">
              <label className="font-mono text-xs font-bold text-duckie-brown">
                Mô tả (tùy chọn)
              </label>
              <textarea
                placeholder="Mô tả ngắn về danh sách này..."
                className="h-22 p-3.5 bg-duckie-white border-2 border-duckie-black text-sm font-geist text-duckie-dark placeholder:text-duckie-brown outline-none resize-none focus:ring-2 focus:ring-duckie-primary"
              />
            </div>

            {/* Image upload */}
            <div className="flex flex-col gap-1.5 w-full">
              <label className="font-mono text-xs font-bold text-duckie-brown">
                Hình ảnh (tùy chọn)
              </label>
              <div className="flex flex-col items-center justify-center gap-1.5 h-25 w-full bg-duckie-bg border-2 border-duckie-black cursor-pointer">
                <Image size={24} className="text-duckie-brown" />
                <span className="font-mono text-xs font-bold text-duckie-brown">
                  Tải lên hình ảnh
                </span>
                <span className="text-[11px] text-duckie-brown">
                  JPG, PNG · tối đa 10MB
                </span>
              </div>
            </div>

            {/* Category dropdown */}
            <div className="flex flex-col gap-1.5 w-full">
              <label className="font-mono text-xs font-bold text-duckie-brown">
                Danh mục
              </label>
              <div className="flex items-center h-12 px-3.5 bg-duckie-white border-2 border-duckie-black cursor-pointer">
                <span className="flex-1 text-sm text-duckie-brown">
                  Chọn danh mục...
                </span>
                <ChevronDown size={18} className="text-duckie-brown" />
              </div>
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
                ✦ Tạo Danh Sách
              </button>
            </div>
          </div>
        </DialogPopup>
      </DialogPortal>
    </DialogRoot>
  );
}
