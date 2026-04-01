import type { Location, LocationCategory, LocationStats } from "./types";

export const mockLocations: Location[] = [
  { id: "l1", name: "Phở Thìn Lò Đúc", type: "Nhà hàng", typeEmoji: "🍽️", proposedBy: "anh", status: "want_to_go", date: "Mar 20" },
  { id: "l2", name: "Café Cộng — Bùi Viện", type: "Cafe", typeEmoji: "☕", proposedBy: "em", status: "visited", date: "Mar 15" },
  { id: "l3", name: "Núi Bà Đen — Tây Ninh", type: "Du lịch", typeEmoji: "✈️", proposedBy: "anh", status: "want_to_go", date: "Mar 12" },
  { id: "l4", name: "Chợ Bến Thành", type: "Mua sắm", typeEmoji: "🛍️", proposedBy: "em", status: "visited", date: "Mar 8" },
  { id: "l5", name: "Đầm Sen Water Park", type: "Vui chơi", typeEmoji: "🎡", proposedBy: "anh", status: "want_to_go", date: "Mar 5" },
  { id: "l6", name: "Mì Ý — Phố cổ điện loop", type: "Nhà hàng", typeEmoji: "🍽️", proposedBy: "em", status: "visited", date: "Mar 1" },
  { id: "l7", name: "Đà Lạt — Thành phố sương", type: "Du lịch", typeEmoji: "✈️", proposedBy: "anh", status: "want_to_go", date: "Feb 25" },
  { id: "l8", name: "Mũi Né — Bình Thuận", type: "Biển", typeEmoji: "🌊", proposedBy: "em", status: "want_to_go", date: "Feb 20" },
  { id: "l9", name: "Đà Lạt — Thành phố sương", type: "Núi", typeEmoji: "🌿", proposedBy: "anh", status: "want_to_go", date: "Feb 15" },
  { id: "l10", name: "Hội An — Phố cổ đèn lồng", type: "Văn hóa", typeEmoji: "🏛️", proposedBy: "em", status: "visited", date: "Feb 10" },
  { id: "l11", name: "Bún bò Huế — Lý Tự Trọng", type: "Nhà hàng", typeEmoji: "🍽️", proposedBy: "anh", status: "want_to_go", date: "Feb 5" },
  { id: "l12", name: "The Coffee House — Q1", type: "Cafe", typeEmoji: "☕", proposedBy: "em", status: "visited", date: "Jan 30" },
  { id: "l13", name: "Suối Tiên Theme Park", type: "Vui chơi", typeEmoji: "🎡", proposedBy: "anh", status: "want_to_go", date: "Jan 25" },
  { id: "l14", name: "Vũng Tàu — Bãi Sau", type: "Biển", typeEmoji: "🌊", proposedBy: "em", status: "visited", date: "Jan 20" },
  { id: "l15", name: "Sapa — Fansipan", type: "Du lịch", typeEmoji: "✈️", proposedBy: "anh", status: "want_to_go", date: "Jan 15" },
];

export const mockLocationCategories: LocationCategory[] = [
  { emoji: "🗺️", name: "Tất cả", count: 80 },
  { emoji: "🍽️", name: "Nhà hàng", count: 24 },
  { emoji: "☕", name: "Cafe", count: 18 },
  { emoji: "🎡", name: "Vui chơi", count: 15 },
  { emoji: "✈️", name: "Du lịch", count: 12 },
  { emoji: "🛍️", name: "Mua sắm", count: 11 },
];

export const mockLocationStats: LocationStats = {
  total: 80,
  visited: 31,
  wantToGo: 49,
};
