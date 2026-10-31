export type ExperienceEntry = {
  worldLabel: string;
  title: string;
  meta: string;
  link?: string;
  imageSrc: string;
  imageAlt: string;
  bullets: string[];
};

export type ExperienceGroup = {
  heading: string;
  entries: ExperienceEntry[];
};

export const CERTIFICATIONS = [
  "Xperience by Kentico Developer Certification",
  "Kentico 13 Developer Certification",
] as const;

/** Skills drawn only from tech listed in experience-full.md */
export const SKILLS = [
  "C#",
  ".NET / ASP.NET Core",
  "TypeScript",
  "SQL",
  "Azure",
  "CQRS",
  "CI/CD",
  "Xperience by Kentico",
  "Kentico 13",
  "Storyblok",
  "SSRS",
  "AI-assisted development",
  "MATLAB",
] as const;

export const EXPERIENCE_GROUPS: ExperienceGroup[] = [
  {
    heading: "Professional",
    entries: [
      {
        worldLabel: "WORLD 1-1 / BDO",
        title: "BDO",
        meta: "Software Engineer II · Apr 2026 – Present",
        link: "https://www.bdo.com/",
        imageSrc: "/images/bdo-logo.svg",
        imageAlt: "BDO",
        bullets: [
          "Led delivery of the www.bdo.com relaunch alongside an external vendor and a large enterprise team, shipping 2 weeks ahead of schedule.",
          "Migrated the firm's flagship corporate site end to end from Kentico 13 to Xperience by Kentico (.NET).",
          "Architected and integrated custom features and extensions into the enterprise Kentico solution.",
          "Used AI-assisted development workflows to speed up delivery and raise code quality.",
          "Earned repeated kudos from leadership and stakeholders for ownership and collaboration on the launch.",
        ],
      },
      {
        worldLabel: "WORLD 1-2 / XTG",
        title: "XTG",
        meta: "Web Application Engineer III · May 2025 – Feb 2026",
        link: "https://www.xtgcorp.com/",
        imageSrc: "/images/xtg-logo.png",
        imageAlt: "XTG",
        bullets: [
          "Led a full ecommerce Xperience by Kentico build for rfmw.com (1M+ SKUs), migrated from Kentico 13.",
          "Architected full-stack features using CQRS, functional programming patterns, and Azure cloud services.",
          "Built product data pipelines from ERP, PIM, and CRM systems with automated daily imports.",
          "Developed faceted search, shopping cart, and checkout flows with a TypeScript frontend and .NET backend.",
          "Designed CI/CD pipelines and a multi-site architecture for scalable, channel-specific delivery.",
        ],
      },
      {
        worldLabel: "WORLD 1-3 / BizStream",
        title: "BizStream",
        meta: "Full Stack Web Developer · May 2022 – May 2025",
        link: "https://www.bizstream.com/",
        imageSrc: "/images/bizstream-logo.svg",
        imageAlt: "BizStream",
        bullets: [
          "Tech lead, mentor, and primary technical point of contact for 15+ clients.",
          "Led full-stack CMS implementations across multiple versions of Kentico and Storyblok.",
          "Architected internal .NET projects and reusable templates to speed up delivery.",
          "Designed, maintained, and optimized CI/CD pipelines and cloud implementations for diverse client requirements.",
          "Drove project success through technical ownership, cross-team collaboration, and problem solving.",
        ],
      },
      {
        worldLabel: "WORLD 1-4 / Auto-Owners",
        title: "Auto-Owners Insurance",
        meta: "SQL Developer · Jan 2021 – May 2022",
        link: "https://www.auto-owners.com/",
        imageSrc: "/images/auto-owners-logo.svg",
        imageAlt: "Auto-Owners Insurance",
        bullets: [
          "Built, tested, maintained, and automated delivery of 100+ company reports for the Data Reporting Services team.",
          "Used SQL, SSRS, FDS, TFS, and Jira for report development and delivery.",
        ],
      },
    ],
  },
  {
    heading: "College",
    entries: [
      {
        worldLabel: "WORLD 2-1 / BS&A",
        title: "BS&A Software",
        meta: "Software Development Intern · Jan 2020 – Apr 2020",
        link: "https://www.bsasoftware.com/",
        imageSrc: "/images/bsa-software-logo.png",
        imageAlt: "BS&A Software",
        bullets: [
          "Built an event-planning web application in ASP.NET with a SQL backend.",
          "Used TFS for source control.",
        ],
      },
      {
        worldLabel: "WORLD 2-2 / MSU Tutor",
        title: "Michigan State University",
        meta: "Math, Physics & CSE Tutor · East Lansing, MI · Oct 2016 – May 2021",
        link: "https://www.msu.edu/",
        imageSrc: "/images/msu-logo.svg",
        imageAlt: "Michigan State University",
        bullets: [
          "Tutored Pre-calculus, Calculus I–III, Physics 231/232, and Computer Science & Engineering (CSE) courses.",
        ],
      },
      {
        worldLabel: "WORLD 2-3 / Mobilitie",
        title: "Mobilitie",
        meta: "Radio Frequency Associate Sales Engineer · Grand Rapids, MI · May 2018 – Aug 2018",
        link: "https://www.boldyn.com/",
        imageSrc: "/images/mobilitie-logo.png",
        imageAlt: "Mobilitie",
        bullets: ["Worked on Verizon Network Extenders."],
      },
      {
        worldLabel: "WORLD 2-4 / MSU Research",
        title: "Michigan State University",
        meta: "Professorial Assistant (Research) · East Lansing, MI · Aug 2017 – May 2019",
        link: "https://www.msu.edu/",
        imageSrc: "/images/msu-logo.svg",
        imageAlt: "Michigan State University",
        bullets: [
          "Fractional math research under Dr. Mohsen Zayernouri.",
          "Used MATLAB and high-performance computing (HPC).",
        ],
      },
    ],
  },
  {
    heading: "Earlier",
    entries: [
      {
        worldLabel: "WORLD 3-1 / Pine Ridge",
        title: "Pine Ridge Elementary School",
        meta: "Teaching Assistant · Oct 2015 – Jan 2017",
        imageSrc: "/images/pine-ridge-placeholder.svg",
        imageAlt: "Pine Ridge Elementary School",
        bullets: ["Assisted teachers in the classroom."],
      },
    ],
  },
  {
    heading: "Education",
    entries: [
      {
        worldLabel: "WORLD 4-1 / MSU",
        title: "Michigan State University",
        meta: "B.S. Computer Science · East Lansing, MI · 2017 – 2021",
        link: "https://www.msu.edu/",
        imageSrc: "/images/msu-logo.svg",
        imageAlt: "Michigan State University",
        bullets: [],
      },
    ],
  },
];
