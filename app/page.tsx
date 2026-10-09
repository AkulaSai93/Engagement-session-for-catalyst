import { Navbar } from "@/components/Navbar";
import { ProfileSidebar } from "@/components/ProfileSidebar";
import { LiveBanner } from "@/components/LiveBanner";
import { WelcomeVideo } from "@/components/WelcomeVideo";
import { WhyCatalyst } from "@/components/WhyCatalyst";
import { UpcomingSessions } from "@/components/UpcomingSessions";
import { PastRecordings } from "@/components/PastRecordings";
import { Roadmap } from "@/components/Roadmap";

export default function EngagementPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto grid max-w-[1440px] gap-6 px-4 py-10 sm:px-20 lg:grid-cols-[284px_1fr]">
        <ProfileSidebar />
        <div className="min-w-0">
          <WelcomeVideo />
          <LiveBanner />
          <WhyCatalyst />
          <UpcomingSessions />
          <PastRecordings />
          <Roadmap />
        </div>
      </main>
    </>
  );
}
