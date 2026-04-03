"use client";

import BadgesContent from "@/components/badges/BadgesContent";
import { mockBadges, mockBadgeStats } from "@/lib/mock-badges";

export default function BadgesPage() {
  return <BadgesContent badges={mockBadges} stats={mockBadgeStats} />;
}
