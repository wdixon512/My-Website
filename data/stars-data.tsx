import { Box, Circle, Stack, Text } from "@chakra-ui/react";
import StarLevel from "../lib/models/StarLevel";
import Image from "next/image";
import Resume from "../components/Resume";
import { AboutMe } from "../components/AboutMe";

export const NUM_STARS = 5;

export const STAR_LEVELS: StarLevel[] = [
  {
    id: 1,
    title: "Identity Isle: Introspective Inquiry",
    description: <AboutMe />,

    completed: false,
  },
  {
    id: 2,
    title: "Skillful Summit: Splendid Specialties Showcase",
    description: <Resume />,
    completed: false,
  },
  {
    id: 3,
    title: "Portfolio Pavilion: Prestige Perusal",
    description: <Text>Coming soon!</Text>,
    completed: false,
  },
  {
    id: 4,
    title: "Passion Playground: Playful Pursuits",
    description: <Text>Coming soon!</Text>,
    completed: false,
  },
  {
    id: 5,
    title: "Career Chronicles: Conquests and Challenges",
    description: <Text>Coming soon!</Text>,
    completed: false,
  },
];
