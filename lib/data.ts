export const thumb = (name: string) => `/images/sessions/${name}.jpg`;
export const avatar = (n: number) => `https://i.pravatar.cc/120?img=${n}`;

export const liveSession = {
  title: "Where Tech Is Heading: Skills That Will Matter in the",
  titleAccent: "Next Decade",
  speaker: "Vishwa Mohan",
  role: "Founder & CEO, upGrad SOT",
  avatar: "/images/mentors/vishwa-mohan.jpg",
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
export const logo = (name: string) => `/images/logos/${name}`;
const L = {
  upgrad: logo("upgrad-sot.png"), linkedin: logo("linkedin.svg"), walmart: logo("walmart.svg"), paypal: logo("paypal.svg"),
  oracle: logo("oracle.svg"), cisco: logo("cisco.png"), barclays: logo("barclays.png"), iiitd: logo("iiitd.png"),
  pw: logo("pw.png"), ineuron: logo("ineuron.png"), salesforce: logo("salesforce.png"), microsoft: logo("microsoft.png"),
};
// Where each mentor has worked/studied ("Mentors from" strip).
const MENTOR_LOGOS: Record<string, string[]> = {
  "Vishwa Mohan": [L.upgrad, L.linkedin, L.walmart, L.paypal, L.oracle],
  "Gaurav Kaushik": [L.salesforce, L.paypal, L.microsoft],
  "Mithun S": [L.cisco, L.pw, L.ineuron],
  "Gladden Rumao": [L.upgrad, L.barclays],
  "Jyoti Nigam": [L.upgrad],
  "Rishabh Bafna": [L.upgrad, L.iiitd],
  "Piyush Jain": [L.upgrad],
  "Rahul Yadav": [L.upgrad],
};

// ── Session catalogue: content from "SOT Online Engagement Sessions - Final.pdf" ──
// Dates/times aren't in the PDF yet; the values below are placeholders.
// Mentor photos & company logos are placeholders until the real ones are provided.
export type Session = {
  id: string; title: string; description: string; learn: string[]; connects: string;
  speaker: string; role: string; avatar: string; image: string; logos: string[];
};

// Mentor photos in public/images/mentors/<slug>.jpg; mentors without one keep the placeholder avatar.
const MENTOR_PHOTOS = new Set(["Bose Sir", "Vishwa Mohan", "Gaurav Kaushik", "Mithun S", "Gladden Rumao", "Jyoti Nigam", "Rishabh Bafna", "Piyush Jain", "Rahul Yadav"]);
export const mentorPhoto = (name: string) =>
  `/images/mentors/${name === "Bose Sir" ? "bose" : name.toLowerCase().replace(/\s+/g, "-")}.jpg`;

const S = (s: Omit<Session, "logos">): Session => ({
  ...s,
  avatar: MENTOR_PHOTOS.has(s.speaker) ? mentorPhoto(s.speaker) : s.avatar,
  logos: MENTOR_LOGOS[s.speaker] ?? [L.upgrad],
});

export const sessions: Session[] = [
  S({ id: "linkedin", title: "LinkedIn Orientation", speaker: "Bose Sir", role: "Career Mentor", avatar: avatar(52),
    image: thumb("build-a-startup-2"), connects: "Career & Personal Branding",
    description: "Profile setup, headline crafting, connection strategy and personal branding.",
    learn: ["Create or update your LinkedIn profile", "Write a headline that stands out", "Build a connection strategy", "Connect with 5 classmates"] }),
  S({ id: "whatsapp", title: "How WhatsApp Was Built", speaker: "MAANG Engineer", role: "MAANG Mentor", avatar: avatar(8),
    image: thumb("how-whatsapp-was-built"), connects: "System Design, Computer Networks",
    description: "A famously small team built an app that billions rely on every day. Break down the engineering decisions that make it fast, reliable and private.",
    learn: ["How a message travels from your phone to a friend's in milliseconds", "What servers, databases and load balancers do", "How end-to-end encryption keeps chats private", "Core system design ideas: scale, reliability and trade-offs"] }),
  S({ id: "where-tech", title: "Where Tech Is Heading: Skills That Will Matter in the Next Decade", speaker: "Vishwa Mohan", role: "Founder & CEO, upGrad School of Technology", avatar: avatar(33),
    image: thumb("where-tech-is-heading"), connects: "Whole SOT Online Program",
    description: "AI is reshaping software jobs faster than any shift before it. See where the industry is moving, which roles are growing, and what companies expect from freshers in an AI-first world.",
    learn: ["The biggest trends shaping tech: AI, cloud, automation and AI agents", "Which roles are growing, which are changing, and why", "India's tech landscape: product companies, GCCs, startups and service firms", "Why strong fundamentals plus AI fluency is the winning combination"] }),
  S({ id: "chatgpt", title: "How ChatGPT Was Built, and Building Your Own", speaker: "Gaurav Kaushik", role: "Senior Staff Software Engineer & Problem Solving Track Lead", avatar: avatar(11),
    image: thumb("how-chatgpt-was-built"), connects: "Generative AI, Cloud",
    description: "ChatGPT isn't magic — it's a machine trained to guess the next word, at massive scale. Learn how it was built, why it gets things wrong, then build your own AI assistant.",
    learn: ["How LLMs predict the next word, and what tokens are", "How models are trained on internet-scale data and refined with human feedback", "Why AI hallucinates, and how to catch it", "How system instructions and your documents shape answers (the idea behind RAG)"] }),
  S({ id: "data-decides", title: "Data Decides: How Companies Win with Numbers", speaker: "MAANG Engineer", role: "MAANG Mentor", avatar: avatar(44),
    image: thumb("data-decides"), connects: "Data Visualization, Machine Learning",
    description: "From Netflix thumbnails to IPL player picks and quick-commerce predictions — see how companies turn raw data into dashboards, experiments and predictions, and how statistics can mislead.",
    learn: ["How companies use data", "Data → insights → decisions", "Dashboards and visualisation", "Experiments and A/B testing", "How statistics can mislead", "Data Analyst, Data Scientist and ML Engineer roles"] }),
  S({ id: "big-tech", title: "How Big Tech Ships Software", speaker: "Mithun S", role: "SDE II at Cisco", avatar: avatar(13),
    image: thumb("how-big-tech-ships-software"), connects: "Full Stack, DevOps",
    description: "How does a feature get from an idea to a billion phones without breaking things? Follow the real software lifecycle — and see how AI coding agents are changing engineering teams.",
    learn: ["Software development lifecycle", "Code reviews and testing", "CI/CD and automation", "How features are released safely", "A/B testing and feature flags", "How engineering teams work together"] }),
  S({ id: "google-search", title: "How Google Finds Answers and Maps Finds Your Route", speaker: "Gladden Rumao", role: "Staff Software AI Engineer", avatar: avatar(15),
    image: thumb("how-google-finds-answers"), connects: "DSA, Engineering Mathematics",
    description: "Billions of pages searched in under a second, and the fastest route through live traffic. Uncover the algorithms behind two products you use every day.",
    learn: ["How crawling, indexing and ranking work", "How GPS locates you", "How graphs and shortest-path algorithms find routes", "Why every tech company tests algorithmic thinking"] }),
  S({ id: "ai-agents", title: "When AI Starts Doing the Work", speaker: "Jyoti Nigam", role: "Data Scientist at upGrad SOT", avatar: avatar(9),
    image: thumb("when-ai-starts-doing-the-work"), connects: "Agentic AI, Generative AI",
    description: "The next wave of AI doesn't just answer — it acts. Watch agents research, plan and complete multi-step tasks, then build a simple automation of your own.",
    learn: ["What AI agents are", "AI agents vs chatbots", "How agents think and plan", "Tools and APIs used by agents", "Multi-step AI tasks", "Building a simple AI agent"] }),
  S({ id: "recommendations", title: "How Netflix, YouTube & Instagram Know What You Like", speaker: "Rishabh Bafna", role: "Senior AI Engineer & Lead Instructor", avatar: avatar(59),
    image: thumb("netflix-youtube-and-instagram"), connects: "Data Visualization, Machine Learning",
    description: "Your feed is designed around you. See how apps turn clicks, likes and watch time into data, and how machine learning turns that data into predictions.",
    learn: ["How recommendation systems work", "How companies collect and use behavioural data", "How machine learning learns from examples", "Filter bubbles, bias and responsible use of data"] }),
  S({ id: "google-maps", title: "How Google Maps Knows Where You Are: The Mathematics of Location", speaker: "Piyush Jain", role: "Senior Mathematician and Lead Instructor", avatar: avatar(51),
    image: thumb("how-google-maps-knows"), connects: "GPS & Navigation, AI/ML, Data Science, Robotics",
    description: "How does your phone find that blue dot? Uncover the maths behind location — satellite signals, trilateration, coordinates, vectors and error estimation — and how navigation updates your route.",
    learn: ["Coordinate geometry and the distance formula", "Circles and spheres", "Vectors & coordinates", "Error & estimation", "Graph theory and shortest-path algorithms"] }),
  S({ id: "look-behind", title: "Look Behind Any Website: How Apps Are Really Built", speaker: "Rahul Yadav", role: "SDE 2 + Lead Instructor", avatar: avatar(12),
    image: thumb("look-behind-any-website"), connects: "Web Essentials, Full Stack",
    description: "Every website has a front end you see and a back end you don't. Use tools already in your browser to look inside real websites and discover how they're made.",
    learn: ["How a website is built from HTML, CSS and JavaScript", "Frontend vs backend vs database", "What APIs are and how apps talk to each other", "What happens between clicking a button and seeing a result"] }),
];
const byId = (id: string) => sessions.find((x) => x.id === id)!;

// Placeholder schedule (replace with real dates). The PDF order is treated as chronological:
// WhatsApp + LinkedIn + the last two PDF sessions are shown as past (for now), "Where Tech" is live, the rest upcoming.
const SLOTS = [["Thu", "8", "OCT", "6:00 PM"], ["Fri", "9", "OCT", "5:00 PM"], ["Sat", "10", "OCT", "11:00 AM"], ["Mon", "12", "OCT", "7:00 PM"],
  ["Wed", "14", "OCT", "6:30 PM"], ["Fri", "16", "OCT", "5:00 PM"], ["Mon", "19", "OCT", "6:00 PM"], ["Wed", "21", "OCT", "6:30 PM"]];

export const upcoming = ["chatgpt", "data-decides", "big-tech", "google-search", "ai-agents", "recommendations"]
  .map((id, i) => {
    const [day, date, month, time] = SLOTS[i];
    const x = byId(id);
    return { ...x, day, date, month, time, tag: x.connects.split(",")[0] };
  });

// A past session. Set `videoUrl` (an .mp4/HLS link, or a YouTube/Vimeo embed URL) to make it playable.
export type Recording = Session & { date: string; duration: string; videoUrl?: string };
const past = (id: string, date: string, duration: string, videoUrl?: string): Recording => ({ ...byId(id), date, duration, videoUrl });
export const featuredRecording = past("whatsapp", "2 Oct 2026", "58 min");
export const recordings = [
  past("linkedin", "29 Sep 2026", "45 min"),
  past("look-behind", "25 Sep 2026", "52 min"),
  past("google-maps", "22 Sep 2026", "61 min"),
];
// SAMPLE DATA for the "View all" popup: the real past sessions above, padded to 18 with
// earlier editions of catalogue sessions. Replace with the real recordings list.
const sampleDurations = ["48 min", "52 min", "61 min", "44 min", "57 min", "39 min"];
export const allRecordings: Recording[] = [
  featuredRecording,
  ...recordings,
  ...Array.from({ length: 14 }, (_, i) => {
    const x = sessions[i % sessions.length];
    const d = new Date(2026, 8, 18 - i * 4);
    return {
      ...x,
      title: x.title + (i >= sessions.length ? " (Part 2)" : ""),
      date: d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
      duration: sampleDurations[i % sampleDurations.length],
    } as Recording;
  }),
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
