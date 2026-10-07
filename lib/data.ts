export const thumb = (name: string) => `/images/sessions/${name}.jpg`;
export const avatar = (n: number) => `https://i.pravatar.cc/120?img=${n}`;

export const liveSession = {
  title: "Skills that will matter in the",
  titleAccent: "next decade",
  speaker: "Aarav Malhotra",
  role: "Ex-CTO, Unacademy",
  avatar: avatar(33),
  date: "Tue, 6 Oct 2026",
  time: "3:30 – 5:30 PM",
  startedAgo: "42 min ago",
  progress: 38,
  image: thumb("where-tech-is-heading"),
  href: "#",
};

export const usps = [
  { icon: "🎫", image: "/images/paid-internship.png", imgW: 213, imgH: 197, imgClass: "right-3 top-2 w-[128px]", stat: "Top 20%", title: "Guaranteed paid internships", body: "Perform in the top fifth of your cohort and a paid internship is locked in.", tint: "bg-[#FFF7EC]" },
  { icon: "👑", image: "/images/internshala-pro.png", imgW: 266, imgH: 178, imgClass: "right-4 top-1/2 w-[140px] -translate-y-1/2", stat: "6 Months", title: "Internshala Pro", body: "After completing the 2-year program", tint: "bg-[#F1F6FF]" },
  { icon: "🏆", stat: "₹25L", title: "Hackathon every semester", body: "End-of-semester hackathons with real prize money and industry judges.", tint: "bg-amber-50 text-gold" },
  { icon: "🎯", stat: "₹1 Cr", title: "Total prize pool", body: "Across all 4 semesters — the largest student prize pool in the country.", tint: "bg-emerald-50 text-emerald-600" },
];

// Company logos shown under each speaker. Files live in public/images/logos/.
export const logo = (name: string) => `/images/logos/${name}.svg`;
const companyLogos = ["/images/logos/upgrad-sot.png", ...["linkedin", "walmart", "paypal", "oracle"].map(logo)];

export const upcoming = [
  { title: "How ChatGPT Was Built", speaker: "Priya Nair", role: "SDE III, Google", avatar: avatar(8), day: "Thu", date: "8", month: "OCT", time: "6:00 PM", tag: "System Design", image: thumb("how-chatgpt-was-built"), logos: companyLogos },
  { title: "When AI Starts Doing the Work", speaker: "Arjun Mehta", role: "ML Lead, Swiggy", avatar: avatar(11), day: "Fri", date: "9", month: "OCT", time: "5:00 PM", tag: "AI / ML", image: thumb("when-ai-starts-doing-the-work"), logos: companyLogos },
  { title: "Build a Startup", speaker: "Sneha Rao", role: "PM, Razorpay", avatar: avatar(9), day: "Sat", date: "10", month: "OCT", time: "11:00 AM", tag: "Product", image: thumb("build-a-startup"), logos: companyLogos },
  { title: "How Big Tech Ships Software", speaker: "Rahul Verma", role: "3× ETHIndia Winner", avatar: avatar(13), day: "Mon", date: "12", month: "OCT", time: "7:00 PM", tag: "Hackathon", image: thumb("how-big-tech-ships-software"), logos: companyLogos },
  { title: "How WhatsApp Was Built", speaker: "Kavya Iyer", role: "GSoC Mentor", avatar: avatar(20), day: "Wed", date: "14", month: "OCT", time: "6:30 PM", tag: "Open Source", image: thumb("how-whatsapp-was-built"), logos: companyLogos },
  { title: "Where Tech Is Heading", speaker: "Priya Nair", role: "SDE III, Google", avatar: avatar(8), day: "Thu", date: "8", month: "OCT", time: "6:00 PM", tag: "System Design", image: thumb("where-tech-is-heading"), logos: companyLogos },
  { title: "How Google Maps Knows", speaker: "Arjun Mehta", role: "ML Lead, Swiggy", avatar: avatar(11), day: "Fri", date: "9", month: "OCT", time: "5:00 PM", tag: "AI / ML", image: thumb("how-google-maps-knows"), logos: companyLogos },
];

export const featuredRecording = {
  title: "How Google Finds Answers", speaker: "Priya Nair", avatar: avatar(8), date: "2 Oct 2026",
  duration: "48 min", image: thumb("how-google-finds-answers"), logos: companyLogos, href: "#",
};

export const recordings = [
  { title: "Look Behind Any Website", avatar: avatar(51), speaker: "Ankit Sharma", date: "29 Sep 2026", duration: "52 min", image: thumb("look-behind-any-website"), logos: companyLogos },
  { title: "Data Decides", avatar: avatar(44), speaker: "Neha Kapoor", date: "25 Sep 2026", duration: "36 min", image: thumb("data-decides"), logos: companyLogos },
  { title: "Netflix, YouTube & Instagram", avatar: avatar(8), speaker: "Priya Nair", date: "22 Sep 2026", duration: "61 min", image: thumb("netflix-youtube-and-instagram"), logos: companyLogos },
  { title: "Build a Startup, Part 2", avatar: avatar(59), speaker: "Rohan Das", date: "18 Sep 2026", duration: "44 min", image: thumb("build-a-startup-2"), logos: companyLogos },
];

export type StageStatus = "done" | "current" | "upcoming";
// The 4 semesters of the 2-year programme. `body` is shown on hover (desktop) / under the title (mobile).
export const roadmap: {
  sem: number; period: string; title: string; body: string; hackathon?: string; status: StageStatus;
}[] = [
  { sem: 1, period: "Months 1–6", title: "Computing & Programming Foundations",
    body: "Python, maths, Linux, Git & GitHub and web basics.",
    hackathon: "₹25L Hackathon", status: "done" },
  { sem: 2, period: "Months 7–12", title: "Full Stack Software Development",
    body: "JavaScript, React, Next.js, backend and DSA.",
    hackathon: "₹25L Hackathon · Dec 2026", status: "current" },
  { sem: 3, period: "Months 13–18", title: "Software Engineering & Cloud",
    body: "Databases, servers, cloud and system development.",
    hackathon: "₹25L Hackathon", status: "upcoming" },
  { sem: 4, period: "Months 19–24", title: "AI Engineering & Career Accelerator",
    body: "Industry projects, capstone and a job-ready portfolio.",
    hackathon: "₹25L Grand Hackathon", status: "upcoming" },
];

// SAMPLE DATA: 30 recordings to preview the "View all" popup at scale.
// Replace with the real recordings list from your backend.
const sampleThumbs = [
  "how-chatgpt-was-built", "when-ai-starts-doing-the-work", "build-a-startup", "how-big-tech-ships-software",
  "how-whatsapp-was-built", "where-tech-is-heading", "how-google-maps-knows", "look-behind-any-website",
  "data-decides", "netflix-youtube-and-instagram", "how-google-finds-answers", "build-a-startup-2",
];
const sampleTitles = [
  "How ChatGPT Was Built", "When AI Starts Doing the Work", "Build a Startup", "How Big Tech Ships Software",
  "How WhatsApp Was Built", "Where Tech Is Heading", "How Google Maps Knows", "Look Behind Any Website",
  "Data Decides", "Netflix, YouTube & Instagram", "How Google Finds Answers", "Build a Startup, Part 2",
];
const sampleSpeakers: [string, number][] = [
  ["Priya Nair", 8], ["Arjun Mehta", 11], ["Sneha Rao", 9], ["Rahul Verma", 13], ["Kavya Iyer", 20], ["Ankit Sharma", 51], ["Neha Kapoor", 44],
];
export const allRecordings = Array.from({ length: 30 }, (_, i) => {
  const [speaker, a] = sampleSpeakers[i % sampleSpeakers.length];
  const day = new Date(2026, 9, 2 - i * 3);
  return {
    title: sampleTitles[i % sampleTitles.length] + (i >= sampleTitles.length ? ` · Part ${Math.floor(i / sampleTitles.length) + 1}` : ""),
    speaker, avatar: avatar(a),
    date: day.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
    duration: `${35 + ((i * 7) % 30)} min`,
    image: thumb(sampleThumbs[i % sampleThumbs.length]),
    logos: companyLogos,
  };
});
