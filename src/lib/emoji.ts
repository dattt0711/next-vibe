/** Maps emoji characters to exported PNG paths from the design */
const emojiMap: Record<string, string> = {
  "🐥": "/icons/emoji/duck.png",
  "🦆": "/icons/emoji/boo.png",
  "🎁": "/icons/emoji/gift.png",
  "🍽️": "/icons/emoji/restaurant.png",
  "✈️": "/icons/emoji/travel.png",
  "🎬": "/icons/emoji/movie.png",
  "🛍️": "/icons/emoji/shopping.png",
  "🎮": "/icons/emoji/activities.png",
  "📚": "/icons/emoji/books.png",
  "🏠": "/icons/emoji/home.png",
  "💪": "/icons/emoji/fitness.png",
  "☕": "/icons/emoji/cafe.png",
  "🎡": "/icons/emoji/fun.png",
  "🗺️": "/icons/emoji/map.png",
  "🌊": "/icons/emoji/beach.png",
  "🌿": "/icons/emoji/mountain.png",
  "🏛️": "/icons/emoji/culture.png",
};

export function getEmojiSrc(emoji: string): string | null {
  return emojiMap[emoji] ?? null;
}
