import { config } from "./config";

export type ActiveTab = "wishes" | "locations" | "badges";

const allTabs: { key: ActiveTab; href: string; label: string; mobileLabel: string; icon: string }[] = [
  { key: "wishes", href: "/", label: "Wish Gift", mobileLabel: "QUÀ TẶNG", icon: "/icons/emoji/gift.png" },
  { key: "locations", href: "/locations", label: "Wish Location", mobileLabel: "ĐỊA ĐIỂM", icon: "/icons/emoji/map.png" },
  { key: "badges", href: "/badges", label: "Badge", mobileLabel: "HUY HIỆU", icon: "/icons/emoji/activities.png" },
];

export const tabs = config.showBadges
  ? allTabs
  : allTabs.filter((t) => t.key !== "badges");

export function getActiveTab(pathname: string): ActiveTab {
  if (pathname.startsWith("/locations")) return "locations";
  if (pathname.startsWith("/badges")) return "badges";
  return "wishes";
}
