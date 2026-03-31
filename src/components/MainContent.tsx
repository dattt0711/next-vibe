import {
  LayoutGrid,
  List,
  ArrowUpDown,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface WishRow {
  name: string;
  category: string;
  owner: string;
  status: "Pending" | "Done ✓";
  date: string;
  checked: boolean;
}

const wishes: WishRow[] = [
  { name: "Sushi Tei — Q7", category: "🍽️ Restaurants", owner: "🐥 Me", status: "Pending", date: "Mar 15", checked: false },
  { name: "Da Lat Trip 🌸", category: "✈️ Travel", owner: "🦆 Boo", status: "Done ✓", date: "Feb 28", checked: true },
  { name: "AirPods Pro Max", category: "🛍️ Shopping", owner: "🐥 Me", status: "Pending", date: "Mar 12", checked: false },
  { name: "Watch Spirited Away together", category: "🎬 Movies", owner: "🦆 Boo", status: "Pending", date: "Mar 10", checked: false },
  { name: "Cooking Class — Italian", category: "🎮 Activities", owner: "🐥 Me", status: "Done ✓", date: "Mar 8", checked: true },
  { name: "Kindle Paperwhite", category: "📚 Books", owner: "🦆 Boo", status: "Pending", date: "Mar 5", checked: false },
  { name: "Yoga mat + blocks set", category: "💪 Fitness", owner: "🐥 Me", status: "Pending", date: "Mar 1", checked: false },
  { name: "Phu Quoc weekend getaway", category: "✈️ Travel", owner: "🦆 Boo", status: "Pending", date: "Feb 25", checked: false },
  { name: "IKEA bookshelf — KALLAX", category: "🏠 Home", owner: "🐥 Me", status: "Pending", date: "Feb 20", checked: false },
  { name: "Date night at The Deck", category: "🍽️ Restaurants", owner: "🦆 Boo", status: "Done ✓", date: "Feb 14", checked: true },
];

function StatusBadge({ status }: { status: "Pending" | "Done ✓" }) {
  const isPending = status === "Pending";
  return (
    <div
      className={`flex items-center w-[100px] px-2 py-0.5 border-2 ${
        isPending
          ? "bg-(--color-pending-bg) border-(--color-primary)"
          : "bg-(--color-done-bg) border-(--color-green)"
      }`}
    >
      <span
        className={`font-mono text-[10px] font-bold ${
          isPending
            ? "text-(--color-pending-text)"
            : "text-(--color-green-dark)"
        }`}
      >
        {status}
      </span>
    </div>
  );
}

function Checkbox({ checked }: { checked: boolean }) {
  return (
    <div className="flex items-center justify-center w-[30px] h-4">
      <div
        className={`relative w-4 h-4 border-2 border-(--color-black) ${
          checked ? "bg-(--color-primary)" : "bg-(--color-white)"
        }`}
      >
        {checked && (
          <Check
            size={12}
            className="absolute top-0.5 left-0.5 text-(--color-black)"
          />
        )}
      </div>
    </div>
  );
}

export default function MainContent() {
  return (
    <div className="flex-1 flex flex-col gap-5 p-6 px-8 bg-(--color-bg) font-geist overflow-auto">
      {/* Toolbar */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xl font-black text-(--color-dark)">
            All Wishes
          </span>
          <div className="flex items-center px-2.5 py-1 bg-(--color-primary) border-2 border-(--color-black)">
            <span className="font-mono text-xs font-extrabold text-(--color-black)">
              108
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* View Toggle */}
          <div className="flex border-3 border-(--color-black)">
            <button className="flex items-center px-3 py-2 bg-(--color-white)">
              <LayoutGrid size={16} className="text-(--color-brown)" />
            </button>
            <button className="flex items-center px-3 py-2 bg-(--color-primary) border-l-3 border-(--color-black)">
              <List size={16} className="text-(--color-dark)" />
            </button>
          </div>
          {/* Sort */}
          <button className="flex items-center gap-1.5 px-3 py-2 bg-(--color-white) border-3 border-(--color-black)">
            <ArrowUpDown size={14} className="text-(--color-dark)" />
            <span className="text-xs font-semibold text-(--color-dark)">
              Sort
            </span>
          </button>
        </div>
      </div>

      {/* Table Header */}
      <div className="flex items-center h-10 px-4 bg-(--color-primary) border-3 border-(--color-black)">
        <div className="w-[30px] h-4 flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-(--color-black) bg-(--color-white)" />
        </div>
        <span className="w-[300px] font-mono text-[11px] font-extrabold tracking-[1px] text-(--color-black)">
          WISH NAME
        </span>
        <span className="w-[140px] font-mono text-[11px] font-extrabold tracking-[1px] text-(--color-black)">
          CATEGORY
        </span>
        <span className="w-[100px] font-mono text-[11px] font-extrabold tracking-[1px] text-(--color-black)">
          OWNER
        </span>
        <span className="w-[100px] font-mono text-[11px] font-extrabold tracking-[1px] text-(--color-black)">
          STATUS
        </span>
        <span className="font-mono text-[11px] font-extrabold tracking-[1px] text-(--color-black)">
          ADDED
        </span>
      </div>

      {/* Table Body */}
      <div className="flex flex-col border-3 border-(--color-black) bg-(--color-white)">
        {wishes.map((wish, i) => (
          <div
            key={i}
            className={`flex items-center h-11 px-4 border-b-2 border-(--color-row-border) ${
              i % 2 === 1 ? "bg-(--color-row-alt)" : "bg-(--color-white)"
            }`}
          >
            <Checkbox checked={wish.checked} />
            <span
              className={`w-[300px] text-[13px] font-semibold ${
                wish.checked
                  ? "text-(--color-brown)"
                  : "text-(--color-dark)"
              }`}
            >
              {wish.name}
            </span>
            <span className="w-[140px] text-xs text-(--color-brown)">
              {wish.category}
            </span>
            <span className="w-[100px] text-xs text-(--color-dark)">
              {wish.owner}
            </span>
            <StatusBadge status={wish.status} />
            <span className="text-xs text-(--color-brown)">
              {wish.date}
            </span>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between w-full">
        <span className="text-xs text-(--color-brown)">
          Showing 1-15 of 108 wishes
        </span>
        <div className="flex items-center gap-1">
          <button className="flex items-center gap-1 px-3 py-2 bg-(--color-white) border-3 border-(--color-black)">
            <ChevronLeft size={14} className="text-(--color-brown)" />
            <span className="text-xs font-semibold text-(--color-brown)">
              Prev
            </span>
          </button>
          <button className="flex items-center justify-center w-9 h-9 bg-(--color-primary) border-3 border-(--color-black)">
            <span className="font-mono text-[13px] font-extrabold text-(--color-black)">
              1
            </span>
          </button>
          <button className="flex items-center justify-center w-9 h-9 bg-(--color-white) border-3 border-(--color-black)">
            <span className="font-mono text-[13px] font-semibold text-(--color-dark)">
              2
            </span>
          </button>
          <button className="flex items-center justify-center w-9 h-9 bg-(--color-white) border-3 border-(--color-black)">
            <span className="font-mono text-[13px] font-semibold text-(--color-dark)">
              3
            </span>
          </button>
          <span className="font-mono text-[13px] font-semibold text-(--color-brown)">
            ...
          </span>
          <button className="flex items-center justify-center w-9 h-9 bg-(--color-white) border-3 border-(--color-black)">
            <span className="font-mono text-[13px] font-semibold text-(--color-dark)">
              8
            </span>
          </button>
          <button className="flex items-center gap-1 px-3 py-2 bg-(--color-white) border-3 border-(--color-black) shadow-[3px_3px_0_var(--color-black)]">
            <span className="text-xs font-bold text-(--color-dark)">
              Next
            </span>
            <ChevronRight size={14} className="text-(--color-dark)" />
          </button>
        </div>
      </div>
    </div>
  );
}
