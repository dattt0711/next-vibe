export const config = {
  useMock: process.env.NEXT_PUBLIC_USE_MOCK !== "false",
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "/api",
  showBadges: process.env.NEXT_PUBLIC_SHOW_BADGES !== "false",
} as const;

/**
 * Resolve a relative upload path (e.g. "/uploads/abc.png") to a full URL
 * using the API base URL origin.
 */
export function resolveUploadUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  try {
    const base = new URL(config.apiBaseUrl);
    return `${base.origin}${path}`;
  } catch {
    return path;
  }
}
