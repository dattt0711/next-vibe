"use client";

import { useRef, useState } from "react";
import {
  DialogRoot,
  DialogPortal,
  DialogBackdrop,
  DialogPopup,
  DialogClose,
} from "@/components/ui/dialog";
import { Image, X } from "lucide-react";
import { toast } from "sonner";
import { useCreateCategory } from "@/hooks/use-categories";
import { config } from "@/lib/config";

interface AddCategoryModalProps {
  open: boolean;
  onClose: () => void;
  pageType: "wishes" | "locations";
}

export default function AddCategoryModal({ open, onClose, pageType }: AddCategoryModalProps) {
  const [name, setName] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const createCategory = useCreateCategory();

  const apiType = pageType === "wishes" ? "wish" : "location";

  function reset() {
    setName("");
    setImagePreview(null);
    setImageFile(null);
    setError(null);
  }

  function handleClose() {
    reset();
    onClose();
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  function removeImage() {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleSubmit() {
    if (!name.trim()) {
      setError("Category name is required");
      return;
    }

    setError(null);

    try {
      let emojiImg: string | null = null;

      // Upload image first if provided
      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);
        const uploadRes = await fetch(`${config.apiBaseUrl}/upload`, {
          method: "POST",
          body: formData,
        });
        if (!uploadRes.ok) throw new Error("Failed to upload image");
        const uploadData = await uploadRes.json();
        emojiImg = uploadData.url || uploadData.path || null;
      }

      await createCategory.mutateAsync({
        name: name.trim(),
        type: apiType,
        emoji_img: emojiImg,
      });

      toast.success("Category created successfully!");
      reset();
      onClose();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to create category";
      setError(message);
      toast.error(message);
    }
  }

  return (
    <DialogRoot open={open} onOpenChange={(o) => !o && handleClose()}>
      <DialogPortal>
        <DialogBackdrop />
        <DialogPopup>
          <div className="flex flex-col gap-5 w-[440px] bg-duckie-white border-3 border-duckie-black p-8 shadow-[6px_6px_0_var(--duckie-black)]">
            {/* Title row */}
            <div className="flex items-center gap-2 w-full">
              <h2 className="flex-1 font-mono text-[22px] font-extrabold text-duckie-dark">
                New {pageType === "wishes" ? "Wish" : "Location"} Category
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

            {/* Error */}
            {error && (
              <div className="px-3 py-2 bg-red-50 border-2 border-red-300 text-xs font-semibold text-red-600">
                {error}
              </div>
            )}

            {/* Name field */}
            <div className="flex flex-col gap-1.5 w-full">
              <label className="font-mono text-xs font-bold text-duckie-brown">
                Category name *
              </label>
              <input
                type="text"
                placeholder={pageType === "wishes" ? "e.g. Travel, Food, Gift..." : "e.g. Cafe, Restaurant, Park..."}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12 px-3.5 bg-duckie-white border-2 border-duckie-black text-sm font-geist text-duckie-dark placeholder:text-duckie-brown outline-none focus:ring-2 focus:ring-duckie-primary"
              />
            </div>

            {/* Image upload */}
            <div className="flex flex-col gap-1.5 w-full">
              <label className="font-mono text-xs font-bold text-duckie-brown">
                Category image (optional)
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg"
                className="hidden"
                onChange={handleFileChange}
              />
              {imagePreview ? (
                <div className="relative flex items-center justify-center h-25 w-full bg-duckie-bg border-2 border-duckie-black">
                  <img src={imagePreview} alt="Preview" className="h-20 w-20 object-contain" />
                  <button
                    className="absolute top-1.5 right-1.5 flex items-center justify-center w-6 h-6 bg-duckie-white border-2 border-duckie-black cursor-pointer"
                    onClick={removeImage}
                  >
                    <X size={12} />
                  </button>
                </div>
              ) : (
                <div
                  className="flex flex-col items-center justify-center gap-1.5 h-25 w-full bg-duckie-bg border-2 border-duckie-black cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Image size={24} className="text-duckie-brown" />
                  <span className="font-mono text-xs font-bold text-duckie-brown">
                    Upload image
                  </span>
                  <span className="text-[11px] text-duckie-brown">
                    JPG, PNG · max 10MB
                  </span>
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-3 w-full">
              <DialogClose
                render={
                  <button className="flex-1 flex items-center justify-center h-12 bg-duckie-white border-2 border-duckie-black font-mono text-sm font-bold text-duckie-dark cursor-pointer">
                    Cancel
                  </button>
                }
              />
              <button
                className="flex-1 flex items-center justify-center h-12 bg-duckie-primary border-3 border-duckie-black font-mono text-sm font-extrabold text-duckie-dark shadow-[4px_4px_0_var(--duckie-black)] cursor-pointer disabled:opacity-50"
                onClick={handleSubmit}
                disabled={createCategory.isPending}
              >
                {createCategory.isPending ? "Creating..." : "Create Category"}
              </button>
            </div>
          </div>
        </DialogPopup>
      </DialogPortal>
    </DialogRoot>
  );
}
