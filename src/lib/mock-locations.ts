import type { Location, LocationCategory, LocationStats } from "./types";

export const mockLocations: Location[] = [
  { id: "l1", name: "Phở Thìn Lò Đúc", type: "Nhà hàng", typeEmoji: "/icons/emoji/restaurant.png", proposedBy: "anh", status: "want_to_go", address: null, note: null, locationImg: null, date: "Mar 20" },
  { id: "l2", name: "Café Cộng — Bùi Viện", type: "Cafe", typeEmoji: "/icons/emoji/cafe.png", proposedBy: "em", status: "visited", address: null, note: null, locationImg: null, date: "Mar 15" },
  { id: "l3", name: "Núi Bà Đen — Tây Ninh", type: "Du lịch", typeEmoji: "/icons/emoji/travel.png", proposedBy: "anh", status: "want_to_go", address: null, note: null, locationImg: null, date: "Mar 12" },
  { id: "l4", name: "Chợ Bến Thành", type: "Mua sắm", typeEmoji: "/icons/emoji/shopping.png", proposedBy: "em", status: "visited", address: null, note: null, locationImg: null, date: "Mar 8" },
  { id: "l5", name: "Đầm Sen Water Park", type: "Vui chơi", typeEmoji: "/icons/emoji/fun.png", proposedBy: "anh", status: "want_to_go", address: null, note: null, locationImg: null, date: "Mar 5" },
  { id: "l6", name: "Mì Ý — Phố cổ điện loop", type: "Nhà hàng", typeEmoji: "/icons/emoji/restaurant.png", proposedBy: "em", status: "visited", address: null, note: null, locationImg: null, date: "Mar 1" },
  { id: "l7", name: "Đà Lạt — Thành phố sương", type: "Du lịch", typeEmoji: "/icons/emoji/travel.png", proposedBy: "anh", status: "want_to_go", address: null, note: null, locationImg: null, date: "Feb 25" },
  { id: "l8", name: "Mũi Né — Bình Thuận", type: "Biển", typeEmoji: "/icons/emoji/beach.png", proposedBy: "em", status: "want_to_go", address: null, note: null, locationImg: null, date: "Feb 20" },
  { id: "l9", name: "Đà Lạt — Thành phố sương", type: "Núi", typeEmoji: "/icons/emoji/mountain.png", proposedBy: "anh", status: "want_to_go", address: null, note: null, locationImg: null, date: "Feb 15" },
  { id: "l10", name: "Hội An — Phố cổ đèn lồng", type: "Văn hóa", typeEmoji: "/icons/emoji/culture.png", proposedBy: "em", status: "visited", address: null, note: null, locationImg: null, date: "Feb 10" },
  { id: "l11", name: "Bún bò Huế — Lý Tự Trọng", type: "Nhà hàng", typeEmoji: "/icons/emoji/restaurant.png", proposedBy: "anh", status: "want_to_go", address: null, note: null, locationImg: null, date: "Feb 5" },
  { id: "l12", name: "The Coffee House — Q1", type: "Cafe", typeEmoji: "/icons/emoji/cafe.png", proposedBy: "em", status: "visited", address: null, note: null, locationImg: null, date: "Jan 30" },
  { id: "l13", name: "Suối Tiên Theme Park", type: "Vui chơi", typeEmoji: "/icons/emoji/fun.png", proposedBy: "anh", status: "want_to_go", address: null, note: null, locationImg: null, date: "Jan 25" },
  { id: "l14", name: "Vũng Tàu — Bãi Sau", type: "Biển", typeEmoji: "/icons/emoji/beach.png", proposedBy: "em", status: "visited", address: null, note: null, locationImg: null, date: "Jan 20" },
  { id: "l15", name: "Sapa — Fansipan", type: "Du lịch", typeEmoji: "/icons/emoji/travel.png", proposedBy: "anh", status: "want_to_go", address: null, note: null, locationImg: null, date: "Jan 15" },
];

export const mockLocationCategories: LocationCategory[] = [
  { emoji: "/icons/emoji/map.png", name: "All", count: 80 },
  { emoji: "/icons/emoji/restaurant.png", name: "Nhà hàng", count: 24 },
  { emoji: "/icons/emoji/cafe.png", name: "Cafe", count: 18 },
  { emoji: "/icons/emoji/fun.png", name: "Vui chơi", count: 15 },
  { emoji: "/icons/emoji/travel.png", name: "Du lịch", count: 12 },
  { emoji: "/icons/emoji/shopping.png", name: "Mua sắm", count: 11 },
];

export const mockLocationStats: LocationStats = {
  total: 80,
  visited: 31,
  wantToGo: 49,
};
