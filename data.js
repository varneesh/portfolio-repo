/* ✏️ EDIT ONLY THIS FILE to update your portfolio: text, projects, links, photos, resume. */
const DATA = {
  name: "Varneeshwar", initials: "VC",
  role: "BCA student & web developer / UI-UX designer",
  tagline: "I design and build clean, responsive websites, and I lead teams that deliver real events and real projects.",
  resume: "assets/Varneeshwar_Resume.pdf",   // replace this PDF (same name) to update your resume
  hero: "assets/hero-red.jpg", caption: "VC-01 // PORTRAIT",
  // rotating cards beside your portrait
  cards: [
    {t: "Front-end craft", d: "HTML, CSS and JavaScript, built responsive from the first line."},
    {t: "UI/UX eye", d: "Interfaces designed for clarity first, then polished in code."},
    {t: "Team leadership", d: "Department chairman and co-organiser of a 1,000+ participant event."}
  ],
  stats: [{n: 7.5, l: "CGPA"}, {n: 1000, s: "+", l: "Event participants"}, {n: 150, s: "+", l: "Hackathon students"}, {n: 1, l: "Internship"}],
  about: "A dedicated, detail-oriented Bachelor of Computer Applications student with hands-on experience in web development, UI/UX design and student leadership. I solve problems under pressure, manage team dynamics and pick up new technologies quickly, and I want to turn that into meaningful results for the team I join.",
  quote: "Good design is clear, fast and works on every screen. Good teams ship on time.",
  photos: [["assets/a1-g.jpg", "assets/a1-c.jpg", "KSR CAMPUS"], ["assets/a2-g.jpg", "assets/a2-c.jpg", "OFF DUTY"]], // [black&white, colour on hover, label]
  tech: ["Java", "Python", "JavaScript", "HTML & CSS", "Prompting"],
  soft: ["English typewriting", "Leadership & teamwork", "Time management"],
  journey: [
    {tag: "INTERNSHIP", title: "UI/UX design & web development intern", place: "Spectra Tech Private Limited, Coimbatore", text: "Delivered multiple assigned projects with a high standard of visual and technical precision, and strengthened skills in responsive layout design, teamwork and troubleshooting."},
    {tag: "DEGREE", title: "Bachelor of Computer Applications", place: "K.S. Rangasamy College of Arts and Science (Autonomous), Namakkal", text: "CGPA 7.5"},
    {tag: "12TH", title: "Higher secondary, 82%", place: "St. Vincent Pallotti Matriculation Higher Secondary School, Salem", text: ""},
    {tag: "10TH", title: "Secondary school, 70%", place: "St. Vincent Pallotti Matriculation Higher Secondary School, Salem", text: ""}
  ],
  // Add, remove or reorder projects. Leave live/code as "" to hide a button. `cat` drives the filter chips.
  projects: [
    {cat: "Full-stack", tag: "WEB APP // FULL-STACK", title: "Student Performance Tracker & CGPA Predictor", desc: "Track marks and attendance across semesters and predict the CGPA you're heading for. Replace this text with what you built and what you learned.", stack: ["Full-stack", "Dashboard"], live: "", code: ""},
    {cat: "AI", tag: "AI // LEARNING PROJECT", title: "Mini-GPT from scratch", desc: "A small GPT-style transformer built from scratch to understand how language models work. Replace this text with your own details.", stack: ["Python", "Transformers"], live: "", code: ""}
  ],
  leadership: [
    {tag: "ROLE", title: "Student chairman of the department", text: "Appointed in third year. Organised multiple academic seminars and departmental events, building strong organisational and people-management skills."},
    {tag: "EVENT", title: "TENET-2K26", text: "Worked with a team to plan and run a state-level intercollegiate event with 1,000+ participants and a hackathon with 150+ students, using leadership, time management and crisis resolution at scale."}
  ],
  // Leave a value as "" to hide it. Everything here becomes public once you host the site.
  contact: {email: "varneeshwarchandran@gmail.com", phone: "+91 7845017594", location: "Salem, Tamil Nadu, India", linkedin: "", github: ""}
};
