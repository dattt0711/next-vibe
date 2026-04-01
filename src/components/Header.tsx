import { Button } from "@/components/ui/button";

export type ActiveTab = "wishes" | "locations" | "badges";

interface HeaderProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

export default function Header({ activeTab, onTabChange }: HeaderProps) {
  return (
    <header className="flex items-center gap-3 h-16 px-8 border-b-4 border-duckie-black bg-duckie-white font-geist">
      {/* Logo */}
      <img src="/icons/logo-duck.png" alt="Duckie" className="w-9 h-9" />

      {/* Title */}
      <span className="text-lg font-black text-duckie-black">
        Duckie Wishes
      </span>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-duckie-white border-3 border-duckie-black">
        <Button
          variant={activeTab === "wishes" ? "default" : "ghost"}
          size="sm"
          className={`text-[13px] ${activeTab !== "wishes" ? "font-semibold text-duckie-gray" : ""}`}
          onClick={() => onTabChange("wishes")}
        >
          Wish Gift
        </Button>
        <Button
          variant={activeTab === "locations" ? "default" : "ghost"}
          size="sm"
          className={`text-[13px] ${activeTab !== "locations" ? "font-semibold text-duckie-gray" : ""}`}
          onClick={() => onTabChange("locations")}
        >
          Wish Location
        </Button>
        <Button
          variant={activeTab === "badges" ? "default" : "ghost"}
          size="sm"
          className={`text-[13px] ${activeTab !== "badges" ? "font-semibold text-duckie-gray" : ""}`}
          onClick={() => onTabChange("badges")}
        >
          Badge
        </Button>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Couple Badge */}
      {/* <img src="/icons/couple-pill.png" alt="chún ❤️ em bê" className="h-10" /> */}
    </header>
  );
}
