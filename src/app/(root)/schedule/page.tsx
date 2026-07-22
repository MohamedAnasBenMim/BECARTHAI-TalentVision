"use client";

import LoaderUI from "@/components/LoaderUI";
import { useUserRole } from "@/hooks/useUserRole";
import { useConvexAuth } from "convex/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import InterviewScheduleUI from "./InterviewScheduleUI";

function SchedulePage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: isConvexLoading } = useConvexAuth();
  const { isInterviewer, isLoading: isRoleLoading } = useUserRole();

  useEffect(() => {
    if (!isConvexLoading && !isRoleLoading && (!isAuthenticated || !isInterviewer)) {
      router.push("/");
    }
  }, [isAuthenticated, isConvexLoading, isInterviewer, isRoleLoading, router]);

  if (isConvexLoading || isRoleLoading) return <LoaderUI />;
  if (!isAuthenticated || !isInterviewer) return <LoaderUI />;

  return <InterviewScheduleUI />;
}
export default SchedulePage;
