"use client";

import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { useMemo } from "react";

type ConvexClerkUseAuth = Parameters<typeof ConvexProviderWithClerk>[0]["useAuth"];

function useConvexClerkAuth(): ReturnType<ConvexClerkUseAuth> {
  const auth = useAuth();

  return {
    ...auth,
    sessionClaims:
      (auth as { sessionClaims?: Record<string, unknown> | null }).sessionClaims ?? null,
  } as ReturnType<ConvexClerkUseAuth>;
}

function ConvexClerkProvider({ children }: { children: React.ReactNode }) {
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
  const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  const convex = useMemo(
    () => (convexUrl ? new ConvexReactClient(convexUrl) : null),
    [convexUrl]
  );

  if (!convex || !clerkPublishableKey) return <>{children}</>;

  return (
    <ClerkProvider publishableKey={clerkPublishableKey}>
      <ConvexProviderWithClerk client={convex} useAuth={useConvexClerkAuth}>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}

export default ConvexClerkProvider;
