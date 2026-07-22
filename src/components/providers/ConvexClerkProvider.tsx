"use client";

import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { ConvexReactClient } from "convex/react";
import { useMutation } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { useEffect, useMemo, useRef } from "react";
import { api } from "../../../convex/_generated/api";

type ConvexClerkUseAuth = Parameters<typeof ConvexProviderWithClerk>[0]["useAuth"];

function useConvexClerkAuth(): ReturnType<ConvexClerkUseAuth> {
  const auth = useAuth();

  return {
    isLoaded: auth.isLoaded,
    isSignedIn: auth.isSignedIn,
    getToken: auth.getToken,
    orgId: auth.orgId,
    orgRole: auth.orgRole,
    sessionId: auth.sessionId,
    sessionClaims: null,
  };
}

function SyncClerkUserWithConvex() {
  const { isLoaded, isSignedIn, user } = useUser();
  const syncUser = useMutation(api.users.syncUser);
  const lastSyncedUserId = useRef<string | null>(null);

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user) return;
    if (lastSyncedUserId.current === user.id) return;

    const email = user.primaryEmailAddress?.emailAddress;
    if (!email) return;

    lastSyncedUserId.current = user.id;

    void syncUser({
      clerkId: user.id,
      email,
      name: user.fullName || user.username || email,
      image: user.imageUrl,
    }).catch(() => {
      lastSyncedUserId.current = null;
    });
  }, [isLoaded, isSignedIn, syncUser, user]);

  return null;
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
        <SyncClerkUserWithConvex />
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}

export default ConvexClerkProvider;
