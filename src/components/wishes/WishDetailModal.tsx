"use client";

import { useState, useEffect, useRef } from "react";
import { resolveUploadUrl } from "@/lib/config";
import {
  DialogRoot,
  DialogPortal,
  DialogBackdrop,
  DialogPopup,
  DialogClose,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Pencil, ChevronDown, Image, X } from "lucide-react";
import { toast } from "sonner";
import { useCategories } from "@/hooks/use-categories";
import { useUpdateWish } from "@/hooks/use-wishes";
import { config } from "@/lib/config";
import type { Wish } from "@/lib/types";
import type { CategoryItem } from "@/lib/api";

interface WishDetailModalProps {
  wish: Wish | null;
  open: boolean;
  onClose: () => void;
}

export default function WishDetailModal({ wish, open, onClose }: WishDetailModalProps) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [owner, setOwner] = useState<"duckie" | "baby">("duckie");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: categories } = useCategories("wish");
  const updateWish = useUpdateWish();

  // Populate form when wish changes or edit mode is entered
  useEffect(() => {
    if (wish && editing) {
      setName(wish.name);
      setDescription(wish.description ?? "");
      setBudget(wish.budget != null ? String(wish.budget) : "");
      setOwner(wish.owner === "chún" ? "duckie" : "baby");
      setImagePreview(wish.imageUrl);
      setImageFile(null);
      setError(null);
      // Resolve category name to ID
      const cat = categories?.find((c: CategoryItem) => c.name === wish.category);
      setSelectedCategoryId(cat?.id ?? null);
    }
  }, [wish, editing, categories]);

  function resetEdit() {
    setEditing(false);
    setDropdownOpen(false);
    setImageFile(null);
    setImagePreview(null);
    setError(null);
  }

  function handleClose() {
    resetEdit();
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

  async function handleSave() {
    if (!wish) return;
    if (!name.trim()) {
      setError("Wish name is required");
      return;
    }
    if (!selectedCategoryId) {
      setError("Please select a category");
      return;
    }
    setError(null);

    try {
      let imageUrl: string | null | undefined = undefined;

      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);
        const uploadRes = await fetch(`${config.apiBaseUrl}/upload`, {
          method: "POST",
          body: formData,
        });
        if (!uploadRes.ok) throw new Error("Failed to upload image");
        const uploadData = await uploadRes.json();
        imageUrl = uploadData.data?.url || uploadData.url || uploadData.path || null;
      } else if (!imagePreview && wish.imageUrl) {
        // Image was removed
        imageUrl = null;
      }

      await updateWish.mutateAsync({
        id: wish.id,
        payload: {
          name: name.trim(),
          description: description.trim() || null,
          budget: budget.trim() ? Number(budget) : null,
          category_id: selectedCategoryId,
          owner,
          ...(imageUrl !== undefined && { image_url: imageUrl }),
        },
      });

      toast.success("Wish updated!");
      resetEdit();
      onClose();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to update wish";
      setError(message);
      toast.error(message);
    }
  }

  if (!wish) return null;

  const isDone = wish.status === "done";
  const selectedCat = categories?.find((c: CategoryItem) => c.id === selectedCategoryId);

  if (editing) {
    return (
      <DialogRoot open={open} onOpenChange={(o) => !o && handleClose()}>
        <DialogPortal>
          <DialogBackdrop />
          <DialogPopup>
            <div className="flex flex-col gap-5 w-150 bg-duckie-white border-3 border-duckie-black p-8 shadow-[6px_6px_0_var(--duckie-black)]">
              {/* Title row */}
              <div className="flex items-center gap-2 w-full">
                <h2 className="flex-1 font-mono text-[22px] font-extrabold text-duckie-dark">
                  Edit Wish
                </h2>
                <button
                  className="flex items-center justify-center w-9 h-9 bg-duckie-white border-2 border-duckie-black cursor-pointer font-mono text-base font-bold text-duckie-dark"
                  onClick={handleClose}
                >
                  ✕
                </button>
              </div>

              <div className="w-full h-0.5 bg-duckie-black" />

              {error && (
                <div className="px-3 py-2 bg-red-50 border-2 border-red-300 text-xs font-semibold text-red-600">
                  {error}
                </div>
              )}

              {/* Name */}
              <div className="flex flex-col gap-1.5 w-full">
                <label className="font-mono text-xs font-bold text-duckie-brown">
                  Wish name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-12 px-3.5 bg-duckie-white border-2 border-duckie-black text-sm font-geist text-duckie-dark placeholder:text-duckie-brown outline-none focus:ring-2 focus:ring-duckie-primary"
                />
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1.5 w-full">
                <label className="font-mono text-xs font-bold text-duckie-brown">
                  Description (optional)
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="h-22 p-3.5 bg-duckie-white border-2 border-duckie-black text-sm font-geist text-duckie-dark placeholder:text-duckie-brown outline-none resize-none focus:ring-2 focus:ring-duckie-primary"
                />
              </div>

              {/* Budget */}
              <div className="flex flex-col gap-1.5 w-full">
                <label className="font-mono text-xs font-bold text-duckie-brown">
                  Budget (optional)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 500000"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="h-12 px-3.5 bg-duckie-white border-2 border-duckie-black text-sm font-geist text-duckie-dark placeholder:text-duckie-brown outline-none focus:ring-2 focus:ring-duckie-primary"
                />
              </div>

              {/* Image upload */}
              <div className="flex flex-col gap-1.5 w-full">
                <label className="font-mono text-xs font-bold text-duckie-brown">
                  Image (optional)
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

              {/* Category dropdown */}
              <div className="flex flex-col gap-1.5 w-full">
                <label className="font-mono text-xs font-bold text-duckie-brown">
                  Category *
                </label>
                <div className="relative">
                  <div
                    className="flex items-center h-12 px-3.5 bg-duckie-white border-2 border-duckie-black cursor-pointer"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    {selectedCat ? (
                      <span className="flex-1 flex items-center gap-2 text-sm text-duckie-dark font-semibold">
                        {selectedCat.emoji_img && (
                          <img src={resolveUploadUrl(selectedCat.emoji_img) || selectedCat.emoji_img} alt="" width={16} height={16} className="inline-block" />
                        )}
                        {selectedCat.name}
                      </span>
                    ) : (
                      <span className="flex-1 text-sm text-duckie-brown">
                        Select category...
                      </span>
                    )}
                    <ChevronDown size={18} className={`text-duckie-brown transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                  </div>
                  {dropdownOpen && (
                    <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-duckie-white border-2 border-duckie-black shadow-[4px_4px_0_var(--duckie-black)] max-h-48 overflow-y-auto">
                      {categories?.map((cat: CategoryItem) => (
                        <button
                          key={cat.id}
                          className={`flex items-center gap-2 w-full px-3.5 py-2.5 text-sm font-geist text-left cursor-pointer hover:bg-duckie-bg ${
                            selectedCategoryId === cat.id ? "bg-duckie-primary font-bold" : ""
                          }`}
                          onClick={() => {
                            setSelectedCategoryId(cat.id);
                            setDropdownOpen(false);
                          }}
                        >
                          {cat.emoji_img && (
                            <img src={resolveUploadUrl(cat.emoji_img) || cat.emoji_img} alt="" width={16} height={16} className="inline-block" />
                          )}
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Owner */}
              <div className="flex flex-col gap-1.5 w-full">
                <label className="font-mono text-xs font-bold text-duckie-brown">
                  Owner *
                </label>
                <div className="flex gap-2">
                  <button
                    className={`flex-1 flex items-center justify-center gap-2 h-12 border-3 border-duckie-black cursor-pointer text-sm font-bold font-geist ${
                      owner === "duckie" ? "bg-duckie-primary" : "bg-duckie-white"
                    }`}
                    onClick={() => setOwner("duckie")}
                  >
                    <img src="/icons/emoji/duck.png" alt="" width={16} height={16} />
                    chún
                  </button>
                  <button
                    className={`flex-1 flex items-center justify-center gap-2 h-12 border-3 border-duckie-black cursor-pointer text-sm font-bold font-geist ${
                      owner === "baby" ? "bg-duckie-primary" : "bg-duckie-white"
                    }`}
                    onClick={() => setOwner("baby")}
                  >
                    <img src="/icons/emoji/boo.png" alt="" width={16} height={16} />
                    em bé
                  </button>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 w-full">
                <button
                  className="flex-1 flex items-center justify-center h-12 bg-duckie-white border-2 border-duckie-black font-mono text-sm font-bold text-duckie-dark cursor-pointer"
                  onClick={() => resetEdit()}
                >
                  Cancel
                </button>
                <button
                  className="flex-1 flex items-center justify-center h-12 bg-duckie-primary border-3 border-duckie-black font-mono text-sm font-extrabold text-duckie-dark shadow-[4px_4px_0_var(--duckie-black)] cursor-pointer disabled:opacity-50"
                  onClick={handleSave}
                  disabled={updateWish.isPending}
                >
                  {updateWish.isPending ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </DialogPopup>
        </DialogPortal>
      </DialogRoot>
    );
  }

  return (
    <DialogRoot open={open} onOpenChange={(o) => !o && handleClose()}>
      <DialogPortal>
        <DialogBackdrop />
        <DialogPopup>
          <div className="flex flex-col gap-5 w-[480px] bg-duckie-white border-3 border-duckie-black p-8 shadow-[6px_6px_0_var(--duckie-black)]">
            {/* Title row */}
            <div className="flex items-center gap-2 w-full">
              <h2 className="flex-1 font-mono text-[22px] font-extrabold text-duckie-dark">
                Wish Detail
              </h2>
              {/* Edit button — desktop only */}
              <button
                className="hidden md:flex items-center justify-center w-9 h-9 bg-duckie-white border-2 border-duckie-black cursor-pointer text-duckie-dark hover:bg-duckie-bg"
                onClick={() => setEditing(true)}
              >
                <Pencil size={14} />
              </button>
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

            {/* Budget */}
            {wish.budget != null && (
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[10px] font-bold text-duckie-brown tracking-wider">
                  BUDGET
                </span>
                <span className="text-sm text-duckie-dark font-semibold font-geist">
                  {wish.budget.toLocaleString("vi-VN")} VND
                </span>
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
