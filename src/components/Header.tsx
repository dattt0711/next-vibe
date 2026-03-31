export default function Header() {
  return (
    <header className="flex items-center gap-3 h-16 px-8 border-b-4 border-(--color-black) bg-(--color-white) font-geist">
      {/* Logo */}
      <div className="flex items-center justify-center w-9 h-9 bg-(--color-primary) border-3 border-(--color-black)">
        <span className="text-lg">🦆</span>
      </div>

      {/* Title */}
      <span className="text-lg font-black text-(--color-black) font-geist">
        Duckie Wishes
      </span>

      {/* Subtitle */}
      <span className="text-[10px] tracking-[1px] text-(--color-gray) font-mono">
        DANH SACH UOC MO
      </span>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-(--color-white) border-3 border-(--color-black)">
        <button className="flex items-center justify-center px-3.5 py-1.5 bg-(--color-primary) border-3 border-(--color-black) text-[13px] font-extrabold text-(--color-black) font-geist">
          Qua tang
        </button>
        <button className="flex items-center justify-center px-3.5 py-1.5 text-[13px] font-semibold text-(--color-gray) font-geist">
          Dia diem
        </button>
      </div>

      <div className="w-4" />

      {/* Couple Badge */}
      <div className="flex items-center gap-2 px-4 py-1.5 bg-(--color-white) border-3 border-(--color-black)">
        <span className="text-xs font-bold text-(--color-black) font-geist">
          👦 Anh ❤️ Em 👧
        </span>
      </div>
    </header>
  );
}
