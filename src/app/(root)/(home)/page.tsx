"use client";

import ActionCard from "@/components/ActionCard";
import { QUICK_ACTIONS } from "@/constants";
import { useUserRole } from "@/hooks/useUserRole";
import { useQuery } from "convex/react";
import { useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import MeetingModal from "@/components/MeetingModal";
import LoaderUI from "@/components/LoaderUI";
import { Loader2Icon } from "lucide-react";
import MeetingCard from "@/components/MeetingCard";

export default function Home() {
  const router = useRouter();

  const { isInterviewer, isCandidate, isLoading } = useUserRole();
  const interviews = useQuery(api.interviews.getMyInterviews);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"start" | "join">();

  const handleQuickAction = (title: string) => {
    switch (title) {
      case "New Call":
        setModalType("start");
        setShowModal(true);
        break;
      case "Join Interview":
        setModalType("join");
        setShowModal(true);
        break;
      case "Schedule":
        router.push("/schedule");
        break;
      case "Recordings":
        router.push("/recordings");
        break;
      default:
        router.push("/");
    }
  };

  if (isLoading) return <LoaderUI />;

  return (
    <div className="container mx-auto max-w-7xl p-4 sm:p-6">
      <section className="mb-8 overflow-hidden rounded-lg border border-border/70 bg-card/80 shadow-sm shadow-black/20">
        <div className="flex flex-col gap-5 border-b border-border/70 p-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
              BECARTH.AI TalentVision
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Interview command center
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              {isInterviewer
                ? "Coordinate live evaluations, schedule candidate sessions, and review outcomes from one focused workspace."
                : "Track your scheduled interviews and join sessions prepared."}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm sm:min-w-[280px]">
            <div className="rounded-lg border border-border/70 bg-background/50 p-3">
              <p className="text-muted-foreground">Role</p>
              <p className="mt-1 font-semibold text-foreground">
                {isInterviewer ? "Interviewer" : "Candidate"}
              </p>
            </div>
            <div className="rounded-lg border border-border/70 bg-background/50 p-3">
              <p className="text-muted-foreground">Workspace</p>
              <p className="mt-1 font-semibold text-foreground">Consulting</p>
            </div>
          </div>
        </div>
        <div className="h-1 bg-gradient-to-r from-primary via-accent to-fuchsia-400" />
      </section>

      {isInterviewer ? (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {QUICK_ACTIONS.map((action) => (
              <ActionCard
                key={action.title}
                action={action}
                onClick={() => handleQuickAction(action.title)}
              />
            ))}
          </div>

          <MeetingModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            title={modalType === "join" ? "Join Meeting" : "Start Meeting"}
            isJoinMeeting={modalType === "join"}
          />
        </>
      ) : (
        <>
          <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight">Your Interviews</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              View and join your scheduled interviews
            </p>
          </div>

          <div className="mt-8">
            {interviews === undefined ? (
              <div className="flex justify-center py-12">
                <Loader2Icon className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : interviews.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {interviews.map((interview) => (
                  <MeetingCard key={interview._id} interview={interview} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                You have no scheduled interviews at the moment
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
