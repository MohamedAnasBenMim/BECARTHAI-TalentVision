"use client";

import LoaderUI from "@/components/LoaderUI";
import { useUserRole } from "@/hooks/useUserRole";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import InterviewScheduleUI from "./InterviewScheduleUI";

function SchedulePage() {
  const router = useRouter();
  const { isInterviewer, isLoading: isRoleLoading } = useUserRole();

  useEffect(() => {
    if (!isRoleLoading && !isInterviewer) {
      router.push("/");
    }
  }, [isInterviewer, isRoleLoading, router]);

  if (isRoleLoading) return <LoaderUI />;
  if (!isInterviewer) return <LoaderUI />;

  return <InterviewScheduleUI />;
}
export default SchedulePage;
