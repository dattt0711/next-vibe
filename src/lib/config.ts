export const config = {
  useMock: process.env.NEXT_PUBLIC_USE_MOCK !== "false",
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "/api",
} as const;
