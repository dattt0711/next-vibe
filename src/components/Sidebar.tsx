import { Search } from "lucide-react";

const categories = [
  { emoji: "🎁", name: "All Wishes", count: 108, active: true },
  { emoji: "🍽️", name: "Restaurants", count: 24 },
  { emoji: "✈️", name: "Travel", count: 18 },
  { emoji: "🎬", name: "Movies", count: 15 },
  { emoji: "🛍️", name: "Shopping", count: 14 },
  { emoji: "🎮", name: "Activities", count: 12 },
  { emoji: "📚", name: "Books", count: 10 },
  { emoji: "🏠", name: "Home", count: 8 },
  { emoji: "💪", name: "Fitness", count: 7 },
];

export default function Sidebar() {
  return (
    <aside className="flex flex-col gap-4 w-[260px] shrink-0 p-5 bg-(--color-white) border-r-3 border-(--color-black) font-geist overflow-y-auto">
      {/* Search */}
      <div className="flex items-center gap-2 h-10 px-3 border-3 border-(--color-black)">
        <Search size={16} className="text-(--color-black)" />
        <span className="text-[13px] text-(--color-black)">Search wishes...</span>
      </div>

      {/* Stats */}
      <div className="flex gap-2 w-full">
        <div className="flex-1 flex flex-col items-center justify-center gap-0.5 h-14 p-2 bg-(--color-primary) border-3 border-(--color-black)">
          <span className="font-mono text-lg font-black text-(--color-black)">108</span>
          <span className="text-[10px] font-semibold text-(--color-black)">Total</span>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center gap-0.5 h-14 p-2 bg-(--color-white) border-3 border-(--color-black)">
          <span className="font-mono text-lg font-black text-(--color-black)">42</span>
          <span className="text-[10px] font-semibold text-(--color-black)">Done</span>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center gap-0.5 h-14 p-2 bg-(--color-white) border-3 border-(--color-black)">
          <span className="font-mono text-lg font-black text-(--color-black)">66</span>
          <span className="text-[10px] font-semibold text-(--color-black)">Pending</span>
        </div>
      </div>

      {/* Categories */}
      <span className="font-mono text-[11px] font-extrabold tracking-[1.5px] text-(--color-black)">
        CATEGORIES
      </span>
      <div className="flex flex-col gap-0.5 w-full">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className={`flex items-center justify-between h-8 px-2 ${
              cat.active
                ? "bg-(--color-primary) border-2 border-(--color-black)"
                : ""
            }`}
          >
            <span
              className={`text-xs text-(--color-black) ${
                cat.active ? "font-bold" : "font-medium"
              }`}
            >
              {cat.emoji} {cat.name}
            </span>
            <span
              className={`font-mono text-[11px] text-(--color-black) ${
                cat.active ? "font-extrabold" : "font-normal"
              }`}
            >
              {cat.count}
            </span>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="w-full h-0 border-t-2 border-(--color-black)" />

      {/* Owner */}
      <span className="font-mono text-[11px] font-extrabold tracking-[1.5px] text-(--color-black)">
        OWNER
      </span>
      <div className="flex gap-1.5 w-full">
        <button className="px-3 py-1.5 text-[11px] font-bold text-(--color-black) bg-(--color-primary) border-2 border-(--color-black)">
          All
        </button>
        <button className="px-3 py-1.5 text-[11px] font-medium text-(--color-black) bg-(--color-white) border-2 border-(--color-black)">
          🐥 Me
        </button>
        <button className="px-3 py-1.5 text-[11px] font-medium text-(--color-black) bg-(--color-white) border-2 border-(--color-black)">
          🦆 Boo
        </button>
      </div>

      {/* Divider */}
      <div className="w-full h-0 border-t-2 border-(--color-black)" />

      {/* Status */}
      <span className="font-mono text-[11px] font-extrabold tracking-[1.5px] text-(--color-black)">
        STATUS
      </span>
      <div className="flex gap-1.5 w-full">
        <button className="px-3 py-1.5 text-[11px] font-bold text-(--color-black) bg-(--color-primary) border-2 border-(--color-black)">
          All
        </button>
        <button className="px-3 py-1.5 text-[11px] font-medium text-(--color-dark) bg-(--color-white) border-2 border-(--color-black)">
          Pending
        </button>
        <button className="px-3 py-1.5 text-[11px] font-medium text-(--color-dark) bg-(--color-white) border-2 border-(--color-black)">
          Done
        </button>
      </div>
    </aside>
  );
}
