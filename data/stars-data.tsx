import { Box, Circle, Stack, Text } from "@chakra-ui/react";
import StarLevel from "../models/StarLevel";
import Image from "next/image";

export const NUM_STARS = 5;

export const STAR_LEVELS: StarLevel[] = [
  {
    id: 1,
    title: "Identity Isle: Introspective Inquiry",
    description: (
      <Stack direction="column" gap="12" mt="12" align="center">
        <Text fontStyle="italic">make this a carousel of images?</Text>
        <Image
          src="/static/images/bzs-me.jpg"
          alt="Me, working at BizStream"
          width="256"
          height="256"
        />
        <Text>
          Greetings and welcome! My name is Will Dixon, a cheerful and outgoing
          individual with a genuine passion for all things COMPUTER. I have a
          solid foundation in computer science, having earned my bachelor's
          degree from Michigan State University in 2021. I believe in striking a
          harmonious balance between work and play, making the most of every
          opportunity that comes my way.
        </Text>
        <Text>
          While others may tread cautiously, I catapult headfirst into
          worthwhile adventures, daring to fail and willing to learn. In the
          pursuit of greatness, I relish challenges as stepping stones to growth
          and self-discovery. Along the way, laughter is my muse; with it, I
          seek to inspire others not to take life so seriously.
        </Text>
        <Text>
          Beyond the technical and professional realm, I'm an explorer at heart.
          Whether hiking Cretian mountains or forging connections in online
          communities, I'm eternally on a quest for meaningful experiences that
          add color to life's canvas.
        </Text>
        <Text>
          While I cherish a lighthearted and humorous approach to life, I also
          understand the importance of responsibility and focus when it comes to
          achieving my goals. My computer science background has instilled in me
          a sense of discipline and dedication, enabling me to tackle challenges
          with determination and adaptability. Beyond the keyboard and mouse, I
          enjoy exploring the great outdoors, meeting new people, and embracing
          new experiences. I firmly believe that life is an adventure, and I'm
          excited to make the most of it while staying true to my core values of
          laughter, growth, and meaningful connections.
        </Text>
      </Stack>
    ),

    completed: false,
  },
  {
    id: 2,
    title: "Skillful Summit: Splendid Specialties Showcase",
    description: "",
    completed: false,
  },
  {
    id: 3,
    title: "Portfolio Pavilion: Prestige Perusal",
    description: "",
    completed: false,
  },
  {
    id: 4,
    title: "Passion Playground: Playful Pursuits",
    description: "",
    completed: false,
  },
  {
    id: 5,
    title: "Career Chronicles: Conquests and Challenges",
    description: "",
    completed: false,
  },
];
