export const thumb = (name: string) => `/images/sessions/${name}.jpg`;
// Neutral stand-in until a mentor's real photo lands in public/images/mentors/.
export const avatar = (_n: number) => "/images/mentors/placeholder.svg";

export const liveSession = {
  title: "LinkedIn",
  titleAccent: "Orientation",
  speaker: "Bose Sir",
  role: "Career Mentor",
  avatar: "/images/mentors/bose.jpg",
  date: "Tue, 6 Oct 2026",
  time: "3:30 – 5:30 PM",
  startedAgo: "42 min ago",
  progress: 38,
  image: thumb("linkedin-orientation"),
  href: "#",
};

export const usps = [
  { icon: "🎫", image: "/images/paid-internship.png", imgW: 213, imgH: 197, imgClass: "right-3 top-2 w-[104px] sm:w-[128px] lg:w-[96px] xl:w-[128px]", stat: "Top 20%", title: "Guaranteed Paid Internship", body: "The top 20% top performers get a guaranteed paid internship.", tint: "bg-[#FFF7EC]" },
  { icon: "👑", image: "/images/internshala-pro.png", imgW: 266, imgH: 178, imgClass: "right-3 top-1/2 w-[112px] -translate-y-1/2 sm:right-4 sm:w-[140px] lg:w-[104px] xl:w-[140px]", stat: "6 Months", title: "Internshala Pro FREE", body: "Get a 6-month free subscription after completing the 2-year program.", tint: "bg-[#F1F6FF]" },
  { icon: "🏆", stat: "₹25L", title: "Hackathon every semester", body: "End-of-semester hackathons with real prize money and industry judges.", tint: "bg-amber-50 text-gold" },
  { icon: "🎯", stat: "₹1 Cr", title: "Total prize pool", body: "Across all 4 semesters — the largest student prize pool in the country.", tint: "bg-emerald-50 text-emerald-600" },
];

// The "Block Your Seat" checkout screen.
export const checkout = {
  applicant: { name: "SAI", email: "sai@upgradsot.com", mobile: "+91 90816 83490" },
  program: { name: "Catalyst by uGSOT — 2-Year Online Technology Accelerator", cohort: "January 2027 · Online" },
  closes: "Closes 20 Oct 2026",
  note: "A one-time amount to confirm your place. Seats in the January 2027 cohort are allotted in order of payment.",
  backed: "Backed by upGrad — 10M+ learners and 110K+ placements",
  shareUrl: "catalyst.upgradsot.com/pay/...",
  shareLink: "https://catalyst.upgradsot.com/pay/share/8f2a41c", // TODO: generate per applicant
  faqs: [
    { q: "What does this ₹499 confirm?", a: "It registers you for the upcoming Catalyst cohort and unlocks onboarding. The program fee is raised separately once your place is confirmed." },
    { q: "Is uGSOT Catalyst the online version of upGrad School of Technology?", a: "Yes. It runs the same curriculum and mentor network online, alongside whatever degree you are already studying." },
    { q: "Do I leave my current college?", a: "No. Catalyst runs alongside your degree — sessions are in the evenings and on weekends." },
    { q: "Is Catalyst a degree?", a: "No. It is a 2-year technology accelerator that sits on top of your degree, built around projects, mentorship and placements." },
    { q: "What happens after two years?", a: "You finish with 100+ shipped projects, a tracked GitHub profile and access to the placement network." },
    { q: "Is the ₹499 refundable?", a: "The seat booking amount is adjusted against your program fee. Write to us if your plans change before the cohort starts." },
  ],
};

// Shown after a successful ₹499 payment, and again on the page if the student skipped it.
export const community = {
  title: "You're in. Seat reserved.",
  body: "Your ₹499 payment went through — your Catalyst seat is confirmed.",
  steps: [
    { title: "Join your batch community", body: "Connect with your peers, mentors and get all important updates on WhatsApp." },
    { title: "Get session reminders & updates", body: "We'll share schedules, links and important announcements in the group." },
    { title: "Show up for your first live session", body: "Learn, interact and kickstart your Catalyst journey." },
  ],
  ctaTitle: "Join the Catalyst WhatsApp community",
  ctaBody: "Session reminders, assignment help and everything your batch is talking about.",
  href: "https://chat.whatsapp.com/", // TODO: replace with the real community invite link
  cta: "Join on WhatsApp",
};

// Reward for the most consistent students across the engagement sessions.
export const merchReward = {
  rank: "Top 10",
  title: "learners with high engagement stand a chance to win upGrad SOT merch",
};

// Company logos shown under each speaker. Files live in public/images/logos/.
export const logo = (name: string) => `/images/logos/${name}`;
const L = {
  upgrad: logo("upgrad-sot.png"), linkedin: logo("linkedin.svg"), walmart: logo("walmart.svg"), paypal: logo("paypal.svg"),
  oracle: logo("oracle.svg"), cisco: logo("cisco.png"), barclays: logo("barclays.png"), iiitd: logo("iiitd.png"),
  pw: logo("pw.png"), ineuron: logo("ineuron.png"), salesforce: logo("salesforce.png"), microsoft: logo("microsoft.png"),
  google: logo("google.png"), amazon: logo("amazon.png"),
  flipkart: logo("flipkart.png"), visa: logo("visa.png"),
  adobe: logo("adobe.png"), deloitte: logo("deloitte.png"), bain: logo("bain.png"), zivame: logo("zivame.png"),
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
  "Kartik Bajaj": [L.adobe, L.deloitte, L.bain, L.zivame],
  "Shruti Grover": [L.microsoft, L.flipkart, L.visa],
};

// ── Session catalogue: content from "SOT Online Engagement Sessions - Final.pdf" ──
// Dates/times aren't in the PDF yet; the values below are placeholders.
// Mentor photos & company logos are placeholders until the real ones are provided.
export type Session = {
  id: string; title: string; description: string; learn: string[]; connects: string;
  speaker: string; role: string; avatar: string; image: string; logos: string[];
};

// Mentor photos in public/images/mentors/<slug>.jpg; mentors without one keep the placeholder avatar.
const MENTOR_PHOTOS = new Set(["Bose Sir", "Vishwa Mohan", "Gaurav Kaushik", "Mithun S", "Gladden Rumao", "Jyoti Nigam", "Rishabh Bafna", "Piyush Jain", "Rahul Yadav", "Shruti Grover"]);
export const mentorPhoto = (name: string) =>
  `/images/mentors/${name === "Bose Sir" ? "bose" : name.toLowerCase().replace(/\s+/g, "-")}.jpg`;

const S = (s: Omit<Session, "logos">): Session => ({
  ...s,
  avatar: MENTOR_PHOTOS.has(s.speaker) ? mentorPhoto(s.speaker) : s.avatar,
  logos: MENTOR_LOGOS[s.speaker] ?? [L.upgrad],
});

export const sessions: Session[] = [
  S({ id: "linkedin", title: "LinkedIn Orientation", speaker: "Bose Sir", role: "Career Mentor", avatar: avatar(52),
    image: thumb("linkedin-orientation"), connects: "Career & Personal Branding",
    description: "Profile setup, headline crafting, connection strategy and personal branding.",
    learn: ["Create or update your LinkedIn profile", "Write a headline that stands out", "Build a connection strategy", "Connect with 5 classmates"] }),
  S({ id: "whatsapp", title: "How WhatsApp Was Built", speaker: "Shruti Grover", role: "SWE @Microsoft | Ex Flipkart & Visa", avatar: avatar(8),
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
  S({ id: "data-decides", title: "Data Decides: How Companies Win with Numbers", speaker: "Kartik Bajaj", role: "Computer Scientist at Adobe", avatar: avatar(44),
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
// LinkedIn Orientation is live now; WhatsApp, Where Tech + the last two PDF sessions are past; the rest upcoming.
// Real schedule from "SOT Online Engagement Sessions - Final.pdf" — every session runs 4 PM – 6 PM.
const SLOTS = [["Sat", "17", "OCT", "4:00 PM"], ["Sat", "24", "OCT", "4:00 PM"], ["Sat", "31", "OCT", "4:00 PM"],
  ["Sat", "7", "NOV", "4:00 PM"], ["Sat", "14", "NOV", "4:00 PM"], ["Sat", "21", "NOV", "4:00 PM"],
  ["Sat", "28", "NOV", "4:00 PM"], ["Sat", "5", "DEC", "4:00 PM"], ["Sat", "12", "DEC", "4:00 PM"],
  ["Sat", "19", "DEC", "4:00 PM"], ["Sat", "26", "DEC", "4:00 PM"]];

export const upcoming = ["whatsapp", "linkedin", "where-tech", "chatgpt", "data-decides", "big-tech"]
  .map((id, i) => {
    const [day, date, month, time] = SLOTS[i];
    const x = byId(id);
    return { ...x, day, date, month, time, tag: x.connects.split(",")[0] };
  });

// A past session. Set `videoUrl` (an .mp4/HLS link, or a YouTube/Vimeo embed URL) to make it playable.
export type Assignment = { title: string; maxMarks: number; task: string };
export type Resource = { name: string; type: string; size?: string; url: string };
export type Recording = Session & {
  date: string; duration: string; videoUrl?: string; time?: string;
  assignments?: Assignment[]; resources?: Resource[];
};
// SAMPLE: resources per session (replace with the real slide/notes links).
const RESOURCES: Record<string, Resource[]> = {
  "where-tech": [
    { name: "Where Tech Is Heading – Slides", type: "PDF", size: "394 KB", url: "#" },
    { name: "AI-era career roadmap", type: "PDF", size: "1.2 MB", url: "#" },
  ],
};
// Assignments per session (from the PDF's "Assignment" column).
const ASSIGNMENTS: Record<string, Assignment[]> = {
  "where-tech": [{ title: "Assignment 1", maxMarks: 10, task: "Pick one tech role that is growing (e.g. AI engineer, cloud engineer). In 200 words, explain why it is growing and list 3 skills you will start building this semester." }],
  linkedin: [{ title: "Assignment 1", maxMarks: 10, task: "Create or update your LinkedIn profile, then connect with 5 classmates. Share your profile link." }],
};
const past = (id: string, date: string, duration: string, videoUrl?: string): Recording =>
  ({ ...byId(id), date, duration, videoUrl, assignments: ASSIGNMENTS[id] ?? [], resources: RESOURCES[id] ?? [] });
export const featuredRecording = past("whatsapp", "2 Oct 2026", "58 min");
export const recordings = [
  past("where-tech", "29 Sep 2026", "1 hr 05 min"),
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

// ── Free-access / seat reservation ───────────────────────────────────────────
// SAMPLE: replace with the signed-in student's real values from your backend.
export const freeAccess = {
  startedAt: "2026-10-12T10:00:00+05:30", // when the student signed up
  days: 7,                                // length of free access
  reserved: false,                        // true once the ₹499 block amount is paid → hides the offer
  price: 499,
  payHref: "#razorpay",                   // Razorpay checkout / payment link (opened from the "Pay ₹499" button)
};

// ── Welcome video ────────────────────────────────────────────────────────────
// SAMPLE: replace `videoUrl` with the real welcome video (mp4/HLS link, or a
// YouTube/Vimeo embed URL) and `poster` with its thumbnail.
export const welcomeVideo = {
  title: "Welcome to Catalyst",
  body: "A quick tour of how your next 2 years work — sessions, projects, hackathons and internships.",
  duration: "2 min",
  speaker: "Vishwa Mohan",
  role: "Founder & CEO, upGrad SOT",
  avatar: "/images/mentors/vishwa-mohan.jpg",
  poster: thumb("where-tech-is-heading"),
  videoUrl: "",
};

// ── Projects & achievements ──────────────────────────────────────────────────
// Figma: SOT-Online › "Your college may be anywhere. Your ambition can be global." (751:321)
export const projectsLead = {
  count: "100+",
  title: "Projects you'll ship",
  body: "Ship full-stack, systems and AI products across the 2 years — real products, not classroom assignments.",
};

// Figma: Catalyst › Semester 1–4 project strips (1198:12964, 12993, 13022, 13044)
export type SemesterProject = { sem: number; title: string; body: string; image: string; bg: string };
const proj = (name: string) => `/images/projects/${name}.jpg`;

export const semesterProjects: SemesterProject[] = [
  { sem: 1, title: "Enterprise Integration Hub & Data Orchestration Platform", body: "Connect enterprise systems and automate data flow and synchronization.", image: proj("integration-hub"), bg: "#FFFFFF" },
  { sem: 1, title: "Linux Security Audit & Monitoring Suite (LSAMS)", body: "Audit Linux systems for security risks and continuously monitor critical system activities and configurations.", image: proj("lsams"), bg: "#FFFFFF" },
  { sem: 1, title: "Food Delivery App", body: "Build a responsive food-delivery homepage with restaurant/food sections, navigation, cards, and modern Tailwind CSS styling.", image: proj("food-delivery"), bg: "#FFFFFF" },
  { sem: 1, title: "Personal Portfolio Page", body: "Build a personal portfolio website showcasing your profile, skills, projects, and contact information.", image: proj("portfolio"), bg: "#EDEAFD" },

  { sem: 2, title: "CodeTutor AI – Coding Problem Assistant", body: "Create an AI-powered coding practice platform where users solve programming problems, receive hints from an AI tutor, track their progress, and earn badges and streaks.", image: proj("codetutor"), bg: "#EDEAFD" },
  { sem: 2, title: "Git-Lytics – AI Code Review & Analytics Platform", body: "Build a developer platform that connects to GitHub/GitLab, analyzes pull requests with AI, tracks repository metrics, and provides real-time code-quality analytics.", image: proj("git-lytics"), bg: "#ECF2EC" },
  { sem: 2, title: "Real-Time Bidding & Auction Platform", body: "Create a live auction system where users list items and place bids in real time, using Redis for caching, sessions, and instant bid updates.", image: proj("bidding"), bg: "#E6F2FF" },
  { sem: 2, title: "AI-Powered Learning Path Generator", body: "Build an AI learning assistant that creates personalized roadmaps with courses, exercises, and next steps.", image: proj("learning-path"), bg: "#FFEBA9" },

  { sem: 3, title: "Multi-Tenant SaaS Platform & Cloud-Native GitOps Management System", body: "Manage customers on a secure cloud platform with automated GitOps deployments.", image: proj("saas-gitops"), bg: "#FDEEE3" },
  { sem: 3, title: "Real-Time Predictive Operations Intelligence Platform", body: "Analyze live operational data to predict issues, detect anomalies, and enable proactive business decisions.", image: proj("predictive-ops"), bg: "#E6F2FF" },
  { sem: 3, title: "Enterprise Business Performance & Decision Intelligence Platform", body: "Unify business data into real-time insights and decision-ready analytics.", image: proj("decision-intel"), bg: "#E6F2FF" },

  { sem: 4, title: "Autonomous Research Assistant", body: "An AI agent that plans, searches, verifies, and compiles multi-source research into structured, cited reports.", image: proj("research-agent"), bg: "#E6F2FF" },
  { sem: 4, title: "Multi-Agent Customer Support System", body: "A team of specialized AI agents that triage, resolve, and escalate customer queries with built-in quality supervision.", image: proj("support-agents"), bg: "#FCFCFC" },
  { sem: 4, title: "AI Product Manager Agent", body: "An autonomous agent that turns a raw product idea into a PRD, UI mockups, user stories, and a pitch deck.", image: proj("pm-agent"), bg: "#FDF8F2" },
  { sem: 4, title: "Domain-Specific RAG Chatbot with Fine-Tuning", body: "A fine-tuned, retrieval-augmented chatbot delivering accurate, hallucination-controlled answers for a specialized domain.", image: proj("rag-chatbot"), bg: "#E4EFE7" },
];

export type Achievement = {
  word: string; title: string; body: string; image: string;
  bg: string; tint: string; wide?: boolean;
};
const ach = (name: string) => `/images/achievements/${name}.png`;

export const achievements: Achievement[] = [
  { word: "ICPC", title: "ICPC", body: "Train seriously to compete at the highest levels of competitive programming.", image: ach("icpc"), bg: "#FDEDED", tint: "#F7D2D2" },
  { word: "CODE", title: "Codeforces / CodeChef", body: "Build your problem-solving skills and competitive coding profile.", image: ach("code"), bg: "#EAF4EC", tint: "#D3E8D8" },
  { word: "GOOGLE", title: "Google Summer of Code", body: "Build towards the open-source skills and contribution track needed to aim for GSoC.", image: ach("gsoc"), bg: "#FDF2DF", tint: "#F6E2BB" },
  
];
