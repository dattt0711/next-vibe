import type { Wish, Category, WishStats } from "./types";

export const mockWishes: Wish[] = [
  { id: "1", name: "Sushi Tei — Q7", category: "Restaurants", categoryEmoji: "/icons/emoji/restaurant.png", owner: "chún", status: "pending", description: null, imageUrl: null, budget: 500000, date: "Mar 15" },
  { id: "2", name: "Đà Lạt Trip 🌸", category: "Travel", categoryEmoji: "/icons/emoji/travel.png", owner: "em bé", status: "done", description: null, imageUrl: null, budget: 3000000, date: "Feb 28" },
  { id: "3", name: "AirPods Pro Max", category: "Shopping", categoryEmoji: "/icons/emoji/shopping.png", owner: "chún", status: "pending", description: null, imageUrl: null, budget: 6000000, date: "Mar 12" },
  { id: "4", name: "Watch Spirited Away together", category: "Movies", categoryEmoji: "/icons/emoji/movie.png", owner: "em bé", status: "pending", description: null, imageUrl: null, budget: null, date: "Mar 10" },
  { id: "5", name: "Cooking Class — Italian", category: "Activities", categoryEmoji: "/icons/emoji/activities.png", owner: "chún", status: "done", description: null, imageUrl: null, budget: 800000, date: "Mar 8" },
  { id: "6", name: "Kindle Paperwhite", category: "Books", categoryEmoji: "/icons/emoji/books.png", owner: "em bé", status: "pending", description: null, imageUrl: null, budget: 3500000, date: "Mar 5" },
  { id: "7", name: "Yoga mat + blocks set", category: "Fitness", categoryEmoji: "/icons/emoji/fitness.png", owner: "chún", status: "pending", description: null, imageUrl: null, budget: 400000, date: "Mar 1" },
  { id: "8", name: "Phú Quốc weekend getaway", category: "Travel", categoryEmoji: "/icons/emoji/travel.png", owner: "em bé", status: "pending", description: null, imageUrl: null, budget: 5000000, date: "Feb 25" },
  { id: "9", name: "IKEA bookshelf — KALLAX", category: "Home", categoryEmoji: "/icons/emoji/home.png", owner: "chún", status: "pending", description: null, imageUrl: null, budget: 2000000, date: "Feb 20" },
  { id: "10", name: "Date night at The Deck", category: "Restaurants", categoryEmoji: "/icons/emoji/restaurant.png", owner: "em bé", status: "done", description: null, imageUrl: null, budget: 1000000, date: "Feb 14" },
  // Extra items to simulate 108 total
  { id: "11", name: "Bún chả Hà Nội", category: "Restaurants", categoryEmoji: "/icons/emoji/restaurant.png", owner: "chún", status: "pending", description: null, imageUrl: null, budget: 200000, date: "Feb 10" },
  { id: "12", name: "Nha Trang snorkeling", category: "Travel", categoryEmoji: "/icons/emoji/travel.png", owner: "em bé", status: "pending", description: null, imageUrl: null, budget: 2500000, date: "Feb 5" },
  { id: "13", name: "Nintendo Switch game", category: "Shopping", categoryEmoji: "/icons/emoji/shopping.png", owner: "chún", status: "done", description: null, imageUrl: null, budget: 1500000, date: "Jan 30" },
  { id: "14", name: "Your Name movie rewatch", category: "Movies", categoryEmoji: "/icons/emoji/movie.png", owner: "em bé", status: "done", description: null, imageUrl: null, budget: null, date: "Jan 25" },
  { id: "15", name: "Rock climbing session", category: "Activities", categoryEmoji: "/icons/emoji/activities.png", owner: "chún", status: "pending", description: null, imageUrl: null, budget: 300000, date: "Jan 20" },
];

export const mockCategories: Category[] = [
  // { emoji: "/icons/emoji/gift.png", name: "All Wishes", count: 108 },
  { emoji: "/icons/emoji/restaurant.png", name: "Restaurants", count: 24 },
  { emoji: "/icons/emoji/travel.png", name: "Travel", count: 18 },
  { emoji: "/icons/emoji/movie.png", name: "Movies", count: 15 },
  { emoji: "/icons/emoji/shopping.png", name: "Shopping", count: 14 },
  { emoji: "/icons/emoji/activities.png", name: "Activities", count: 12 },
  { emoji: "/icons/emoji/books.png", name: "Books", count: 10 },
  { emoji: "/icons/emoji/home.png", name: "Home", count: 8 },
  { emoji: "/icons/emoji/fitness.png", name: "Fitness", count: 7 },
];

export const mockStats: WishStats = {
  total: 108,
  done: 42,
  pending: 66,
};
