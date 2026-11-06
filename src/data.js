export const profile = {
  name: "Nicholas Lawrentius",
  title: "Software Engineer.",
  intro: "elcome! I'm Nicholas Lawrentius — a software engineer who creates things with computers",
  figRef: "(Fig 1.)",
  introEnd: "Digital Craftsman best describes my skill set.",
  bio: "I'm detail-oriented and specialise in building design systems, component libraries and creating digital design. I've worked in creative studios, digital agencies and as a freelancer. Currently, I'm currently working as Associate Software Engineer at",
  company: { label: "PT HM. Sampoerna", href: "#" },
};

export const nav = [
  { label: "Projects", href: "#project" },
  { label: "Contact", href: "#contact" },
];

export const external = [
  { label: "Codepen", href: "https://codepen.io" },
  { label: "Twitter", href: "https://twitter.com" },
  { label: "GitHub", href: "https://github.com/NicholasL5" },
];

export const skills = {
  lead: "igital projects thrive when designers understand how they will be built. Just as an architect understands how a structure is created, the same should be true on the web.",
  body: "I'm comfortable leading design direction, but I also enjoy working alongside designers who are less familiar with code. I enjoy collaborating, providing guidance and helping push boundaries to create projects that catch the eye, without sacrificing usability.",
  columns: [
    {
      fig: "Fig 2.",
      title: "Design",
      paragraphs: [
        "Starting with a blank canvas, taking up a mouse (Fig 2) and creating something bespoke is very rewarding.",
        "I design with usability in mind, striving to create projects that are accessible to all.",
        "I'm comfortable with most design tools, but I often prefer prototyping directly in a web browser. I'm passionate about interaction animations.",
      ],
      link: { label: "Humane by Design", href: "https://humanebydesign.com", after: " is a real guiding force for the design work I do." },
    },
    {
      fig: "Fig 3.",
      title: "Development",
      paragraphs: [
        "Developing a conceptual idea into something engaging and functional can be equally satisfying.",
        "Each key (Fig 3) stroke is carefully considered as I try to write code that's simple and resilient.",
      ],
      link: { label: "Progressive Enhancement", href: "https://en.wikipedia.org/wiki/Progressive_enhancement", after: " is the philosophy I aim to work with." },
    },
  ],
};

export const writing = {
  lead: "nough about 'skills' and work stuff. Here are some ideas taken from my brain and arranged into words. Hopefully someone finds them useful.",
  body: "At the moment, I only have one lonely post, written in conjunction with launching this site. I'm aiming to allow myself time to do more of this moving forward.",
  posts: [
    {
      title: "Getting personal.",
      excerpt:
        "Creating a personal website is something I've started many times before, usually ending up bored with the idea and unhappy with the outcome. Having finally released something I'm pleased with, I thought it worth exploring my initial thought process in this opening post...",
      href: "#",
    },
  ],
};

export const monogram = "YN";

export const history = {
  lead: "rom assistant lecturer to backend engineer, I've spent the last few years building APIs and data pipelines. My proudest work was leading backend development for the AYO KSA expansion across several B2B retail platforms.",
  body: "My latest positions are listed below.",
  // Roles are listed newest first; several roles under one company show as a career journey.
  jobs: [
    {
      company: "PT HM Sampoerna Tbk.",
      roles: [
        { role: "Associate Software Engineer, B2B & Data", dates: "Jan 2026 - Current" },
        { role: "Fullstack Software Engineer", dates: "Aug 2025 - Dec 2025" },
        { role: "Software Engineer Intern", dates: "Feb 2025 - Jul 2025" },
      ],
    },
    {
      company: "PT. Indowire Prima Industrindo",
      roles: [{ role: "Software Engineer Intern", dates: "Jul 2024 - Dec 2024" }],
    },
    {
      company: "Petra Christian University",
      roles: [{ role: "Assistant Lecturer", dates: "Aug 2022 - Jun 2024" }],
    },
  ],
  educationTitle: "Education",
  educationIntro:
    "I studied Computer Science at Petra Christian University, with a growing interest in machine learning and AI.",
  education: [
    { school: "Petra Christian University", detail: "Computer Science", dates: "Aug 2021 - Jun 2025" },
    { school: "SMAK St. Albertus", detail: "High School", dates: "Jul 2018 - May 2021" },
  ],
};
