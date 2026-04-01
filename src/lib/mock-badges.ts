import type { Badge, BadgeStats } from "./types";

export const mockBadges: Badge[] = [
  { id: "b1", emoji: "🦆", icon: "/icons/badge-duck-first.png", name: "Vịt Con Đầu Tiên", description: "Hoàn thành wish đầu tiên", unlocked: true, date: "15/03" },
  { id: "b2", emoji: "🔥", icon: "/icons/badge-streak-3.png", name: "Streak 3 Ngày", description: "3 ngày liên tiếp hoàn thành", unlocked: true, date: "18/03" },
  { id: "b3", emoji: "💕", icon: "/icons/badge-couple.png", name: "Cặp Đôi Đồng Điệu", description: "Hoàn thành 5 wish cả hai", unlocked: true, date: "20/03" },
  { id: "b4", emoji: "⭐", icon: "/icons/badge-superstar.png", name: "Siêu Sao", description: "Hoàn thành 10 wish", unlocked: true, date: "25/03" },
  { id: "b5", emoji: "🎯", icon: "/icons/badge-bullseye.png", name: "Bách Phát Bách Trúng", description: "Hoàn thành tất cả wish 1 tháng", unlocked: false, date: null },
  { id: "b6", emoji: "🎨", icon: "/icons/badge-colorful.png", name: "Đa Sắc Màu", description: "5 wish từ 5 danh mục khác nhau", unlocked: false, date: null },
  { id: "b7", emoji: "🗺️", icon: "/icons/badge-traveler.png", name: "Phượt Thủ", description: "Ghé thăm 10 địa điểm", unlocked: false, date: null },
  { id: "b8", emoji: "🎂", icon: "/icons/badge-birthday.png", name: "Sinh Nhật Vui Vẻ", description: "Tặng quà đúng ngày sinh nhật", unlocked: false, date: null },
  { id: "b9", emoji: "👑", icon: "/icons/badge-king.png", name: "Vua/Nữ Hoàng Wish", description: "Hoàn thành 50 wish", unlocked: false, date: null },
];

export const mockBadgeStats: BadgeStats = {
  total: 12,
  rare: 3,
  currentStreak: 5,
};
