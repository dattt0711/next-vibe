import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="flex items-center gap-3 h-16 px-8 border-b-4 border-duckie-black bg-duckie-white font-geist">
      {/* Logo */}
      <div className="flex items-center justify-center w-9 h-9 bg-duckie-primary border-3 border-duckie-black">
        <span className="text-lg">🦆</span>
      </div>

      {/* Title */}
      <span className="text-lg font-black text-duckie-black">
        Duckie Wishes
      </span>

      {/* Subtitle */}
      <span className="text-[10px] tracking-[1px] text-duckie-gray font-mono">
        DANH SACH UOC MO
      </span>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-duckie-white border-3 border-duckie-black">
        <Button variant="default" size="sm" className="text-[13px]">
          Qua tang
        </Button>
        <Button variant="ghost" size="sm" className="text-[13px] font-semibold text-duckie-gray">
          Dia diem
        </Button>
      </div>

      <div className="w-4" />

      {/* Couple Badge */}
      <div className="flex items-center gap-2 px-4 py-1.5 bg-duckie-white border-3 border-duckie-black">
        <span className="text-xs font-bold text-duckie-black">
          👦 Anh ❤️ Em 👧
        </span>
      </div>
    </header>
  );
}
