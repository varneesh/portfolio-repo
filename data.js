/* ✏️ EDIT ONLY THIS FILE to update your portfolio: text, projects, links, photos, resume. */
const DATA = {
  name: "Varneeshwar",
  roles: ["BCA student", "Web developer", "UI/UX designer", "Team leader"],
  tagline: "I design and build clean, responsive websites, and I lead teams that deliver real events and real projects.",
  resume: "assets/Varneeshwar_Resume.pdf",   // replace this PDF (keep the name) to update your resume
  photos: ["assets/photo-1.jpg", "assets/photo-2.jpg", "assets/photo-3.jpg"], // tap the hero photo to cycle these
  badges: ["CGPA 7.5", "UI/UX + Web"],
  about: "A dedicated, detail-oriented Bachelor of Computer Applications student with hands-on experience in web development, UI/UX design and student leadership. I solve problems under pressure, manage team dynamics and pick up new technologies quickly. I'm looking to turn my technical skills and analytical mindset into meaningful results for the team I join.",
 stats: [
  { n: 7.5, l: "CGPA" },

  {
    n: 1000,
    s: "+",
    l: "Event with 1000+ participants",
    detail: "Collaborated with a team to conceptualize and execute 'TENET-2K26', a state-level intercollegiate event hosting over 1000+ student participants."
  },

  {
    n: 150,
    s: "+",
    l: "Event with 150+ hackathon participants",
    detail: "Conducted Hackathon event named 'TECH FORGE-2K26' and cultivated core competencies in time management and experience in problem solving in the coding field."
  },

  { n: 1, l: "Internship done" }
],
  tech: ["Java", "Python", "JavaScript", "HTML & CSS", "Prompting"],
  soft: ["English typewriting", "Leadership & teamwork", "Time management"],
  journey: [
    {tag: "Internship", title: "UI/UX design & web development intern", place: "Spectra Tech Private Limited, Coimbatore", text: "Delivered multiple assigned projects with a high standard of visual and technical precision, and strengthened skills in responsive layout design, teamwork and troubleshooting."},
    {tag: "Degree", title: "Bachelor of Computer Applications", place: "K.S. Rangasamy College of Arts and Science (Autonomous), Namakkal", text: "CGPA 7.5"},
    {tag: "12th", title: "Higher secondary, 82%", place: "St. Vincent Pallotti Matriculation Higher Secondary School, Salem", text: ""},
    {tag: "10th", title: "Secondary school, 70%", place: "St. Vincent Pallotti Matriculation Higher Secondary School, Salem", text: ""}
  ],
  // Add, remove or reorder projects freely. Leave live/code as "" to hide a button.
  projects: [
    {icon: "📊", title: "Student Performance Tracker & CGPA Predictor", tag: "Full-stack web app", desc: "Track marks and attendance across semesters and predict the CGPA you're heading for. Replace this text with what you built and what you learned.", stack: ["Full-stack", "Dashboard"], colors: ["#ffb43a", "#ff6b81"], live: "", code: ""},
    {icon: "🧠", title: "Mini-GPT from scratch", tag: "AI / learning project", desc: "A small GPT-style transformer built from scratch to understand how language models work. Replace this text with your own details.", stack: ["Python", "Transformers"], colors: ["#34d6b0", "#6d7cff"], live: "", code: ""}
  ],
  leadership: [
    {icon: "🎓", title: "Student chairman of the department", text: "Appointed in third year. Organised multiple academic seminars and departmental events, building strong organisational and people-management skills."},
    {icon: "🚀", title: "TENET-2K26", text: "Worked with a team to plan and run a state-level intercollegiate event with 1,000+ participants and a hackathon with 150+ students, using leadership, time management and crisis resolution at scale."}
  ],
  // Leave a value as "" to hide it. Everything here becomes public once you host the site.
  contact: {email: "varneeshwarchandran@gmail.com", phone: "+91 7845017594", location: "Salem, Tamil Nadu, India", linkedin: "", github: ""}
};
