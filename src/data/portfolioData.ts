export const personalInfo = {
  name: "Asad Sameer Momin",
  firstName: "Asad",
  title: "Computer Engineering Student",
  subtitle: "Aspiring Full-Stack Web Developer",
  roles: [
    "Full-Stack Web Developer",
    "Software Developer",
    "AI-Powered Web App Builder",
    "React.js Enthusiast",
  ],
  phone: "+91 7738998002",
  email: "mohdasadmomin766@gmail.com",
  location: "Pune, Maharashtra, India",
  github: "https://github.com/asadmomin8768",
  githubHandle: "github.com/asadmomin8768",
  summary:
    "Computer Engineering student with strong academic performance and hands-on experience developing multiple web-based applications. Skilled in HTML, CSS, JavaScript, React.js, Node.js, Express.js, MySQL, MongoDB, Git, and GitHub. Experienced in building interactive frontend applications and practical web projects including productivity tools, dashboards, games, calculators, and personal websites. Actively seeking Full-Stack Web Development internship and entry-level job opportunities to apply technical skills and contribute to real-world software projects.",
  aboutSummary:
    "I am currently pursuing my Bachelor of Engineering in Computer Engineering at KJ College of Engineering and Management Research. My journey in technology is driven by a deep curiosity about how systems work and a strong desire to build practical, real-world solutions. I have built over a dozen interactive web applications, focusing on writing clean, reusable code and designing highly intuitive, responsive user interfaces. I bridge frontend aesthetics with backend logic, and I am highly motivated to bring this dedication to a software development team.",
  careerObjective:
    "To secure a challenging internship or entry-level position in Full-Stack Web Development where I can leverage my frontend and backend skills, learn from experienced professionals, and contribute to impactful, real-world software products — while continuously growing into a reliable, high-performing full-time software developer.",
};

export const stats = [
  { label: "CGPA (Latest)", value: 8.46, suffix: "" },
  { label: "Projects Built", value: 17, suffix: "+" },
  { label: "Core Technologies", value: 12, suffix: "+" },
  { label: "SSC Percentage", value: 92, suffix: "%" },
];

export const education = [
  {
    degree: "Bachelor of Engineering — Computer Engineering",
    institution: "KJ College of Engineering and Management Research",
    period: "Currently in Third Year (TE)",
    details: ["First Year — 8.50 CGPA", "Second Year — 8.46 CGPA"],
    icon: "graduation",
  },
  {
    degree: "Higher Secondary Certificate (12th)",
    institution: "Maharashtra State Board",
    period: "Percentage — 73%",
    details: [],
    icon: "cap",
  },
  {
    degree: "Secondary School Certificate (10th)",
    institution: "Maharashtra State Board",
    period: "Percentage — 92%",
    details: [],
    icon: "school",
  },
];

export const skillBars = [
  { name: "HTML5 & CSS3", level: 90 },
  { name: "JavaScript (ES6+)", level: 85 },
  { name: "React.js", level: 80 },
  { name: "Node.js & Express.js", level: 75 },
  { name: "MySQL & MongoDB", level: 75 },
  { name: "Git & GitHub", level: 85 },
];

export const skillCategories = [
  { title: "Frontend", tags: ["HTML5", "CSS3", "JavaScript", "React.js"] },
  { title: "Backend", tags: ["Node.js", "Express.js", "REST APIs"] },
  { title: "Databases", tags: ["MySQL", "MongoDB"] },
  { title: "Programming", tags: ["C", "C++", "Python", "JavaScript"] },
  { title: "Tools", tags: ["Git", "GitHub", "VS Code", "Postman"] },
];

export const careerInterests = [
  "Full-Stack Web Development",
  "Software Development",
  "AI-Powered Web Applications",
];

export const strengths = [
  "Strong problem-solving & debugging skills",
  "Quick learner with a practical project mindset",
  "Clean, organized & responsive UI development",
  "Team collaboration & event coordination",
];

export type Project = {
  title: string;
  category: "Frontend" | "Productivity" | "Utility";
  tags: string[];
  points: string[];
};

export const projects: Project[] = [
  {
    title: "Digital Notes App",
    category: "Frontend",
    tags: ["HTML", "CSS", "JavaScript"],
    points: [
      "Developed a web-based application for creating, managing, and organizing digital notes.",
      "Implemented interactive functionality using JavaScript.",
      "Designed a clean and user-friendly interface for efficient note management.",
    ],
  },
  {
    title: "Student Dashboard",
    category: "Frontend",
    tags: ["HTML", "CSS", "JavaScript"],
    points: [
      "Developed a student-focused dashboard for presenting academic and student-related information.",
      "Created an organized interface with interactive components and responsive layouts.",
      "Applied frontend development principles to improve usability and navigation.",
    ],
  },
  {
    title: "Personal Portfolio Website",
    category: "Frontend",
    tags: ["HTML", "CSS", "JavaScript"],
    points: [
      "Designed and developed a personal portfolio website to showcase technical skills and projects.",
      "Implemented responsive layouts and structured sections for professional presentation.",
      "Integrated project and personal information into a user-friendly web interface.",
    ],
  },
  {
    title: "To-Do List & Productivity Applications",
    category: "Productivity",
    tags: ["HTML", "CSS", "JavaScript"],
    points: [
      "Built interactive productivity applications including a To-Do List, Timer, Stopwatch, Calendar, and Digital Clock.",
      "Implemented dynamic functionality and user interactions using JavaScript.",
      "Practiced DOM manipulation, event handling, and frontend application logic.",
    ],
  },
  {
    title: "Utility & Interactive Web Applications",
    category: "Utility",
    tags: ["HTML", "CSS", "JavaScript"],
    points: [
      "Developed applications including a Password Generator, BMI Calculator, Temperature Converter, Number Guessing Game, Random Color Generator, and Calculator.",
      "Implemented reusable programming logic and interactive user interfaces.",
      "Strengthened problem-solving and JavaScript development skills through practical projects.",
    ],
  },
];

export const additionalProjects = [
  "Age Calculator",
  "Basic Calculator",
  "BMI Calculator",
  "Calendar",
  "Stopwatch",
  "Timer",
  "Digital Clock",
  "Menu Page",
  "Number Guessing Game",
  "Password Generator",
  "Random Color Generator",
  "Temperature Converter",
];

export const experience = [
  {
    role: "Volunteer — Global Higher Education Expo 2026",
    org: "Edulx Overseas",
    tag: "Event Coordination",
    points: [
      "Volunteered at the Global Higher Education Expo 2026.",
      "Assisted with event-related activities and coordination.",
      "Interacted with participants and supported the smooth execution of the event.",
    ],
  },
];
