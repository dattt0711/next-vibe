import { getEmojiSrc } from "@/lib/emoji";

interface EmojiProps {
  emoji: string;
  size?: number;
  className?: string;
}

export default function Emoji({ emoji, size = 16, className }: EmojiProps) {
  const src = getEmojiSrc(emoji);
  if (src) {
    return (
      <img
        src={src}
        alt={emoji}
        width={size}
        height={size}
        className={`inline-block ${className ?? ""}`}
      />
    );
  }
  return <span className={className}>{emoji}</span>;
}
