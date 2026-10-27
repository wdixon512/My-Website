import StarLevel from "@lib/models/StarLevel";
import Resume from "@lib/components/Resume";
import { AboutMe } from "@lib/components/AboutMe";
import { Projects } from "@lib/components/Projects";

export const NUM_STARS = 3;

export const STAR_LEVELS: StarLevel[] = [
  {
    id: 1,
    title: "About",
    description: <AboutMe />,
    completed: false,
  },
  {
    id: 2,
    title: "Experience",
    description: <Resume />,
    completed: false,
  },
  {
    id: 3,
    title: "Projects",
    description: <Projects />,
    completed: false,
  },
];
