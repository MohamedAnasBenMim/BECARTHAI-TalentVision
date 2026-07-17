export const requiredEnvVars = [
  "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY",
  "CLERK_SECRET_KEY",
  "CONVEX_DEPLOYMENT",
  "NEXT_PUBLIC_CONVEX_URL",
  "NEXT_PUBLIC_STREAM_API_KEY",
  "STREAM_SECRET_KEY",
] as const;

export type RequiredEnvVar = (typeof requiredEnvVars)[number];

export function getMissingEnvVars(): RequiredEnvVar[] {
  return requiredEnvVars.filter((name) => !process.env[name]);
}

export function isAppConfigured() {
  return getMissingEnvVars().length === 0;
}
