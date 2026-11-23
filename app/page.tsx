import { Navbar } from "@/components/Navbar";
import { ProfileSidebar } from "@/components/ProfileSidebar";
import { LiveBanner } from "@/components/LiveBanner";
import { WelcomeVideo } from "@/components/WelcomeVideo";
import { WhyCatalyst } from "@/components/WhyCatalyst";
import { UpcomingSessions } from "@/components/UpcomingSessions";
import { JoinCommunity } from "@/components/JoinCommunity";
import { MerchReward } from "@/components/MerchReward";
import { PastRecordings } from "@/components/PastRecordings";
import { Roadmap } from "@/components/Roadmap";
import { Projects } from "@/components/Projects";
import { LockGate } from "@/components/Lock";
import { StageSwitcher } from "@/components/StageSwitcher";

export default function EngagementPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto grid max-w-[1440px] gap-6 px-4 py-10 sm:px-20 lg:grid-cols-[284px_1fr]">
        {/* Free window over or paid 10 days over → live class, sessions and recordings lock (see lib/access.ts). */}
        <ProfileSidebar />
        <div className="min-w-0">
          <JoinCommunity />
          <LockGate><LiveBanner /></LockGate>
          <WhyCatalyst />
          <UpcomingSessions />
          <MerchReward />
          <LockGate><PastRecordings /></LockGate>
          <Roadmap />
          <Projects />
        </div>
        <WelcomeVideo />
      </main>
      <StageSwitcher />
    </>
  );
}
