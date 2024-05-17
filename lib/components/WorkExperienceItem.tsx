import {
  Flex,
  VStack,
  Heading,
  Image,
  Text,
  ChakraProps,
} from "@chakra-ui/react";
import Link from "next/link";

export type WorkExperienceItemProps = ChakraProps & {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  link: string;
  imageSrc: string;
  children: React.ReactNode;
};

export const WorkExperienceItem = (props: WorkExperienceItemProps) => {
  return (
    <Flex gap="12">
      <Link href={props.link}>
        <Image src={props.imageSrc} maxWidth="225px" />
      </Link>
      <VStack alignItems="start">
        <Heading fontSize="2xl" fontFamily="Pixel">
          {props.company}
        </Heading>
        <Text>Role: {props.role}</Text>
        <Text fontStyle="italic">
          {props.startDate} - {props.endDate}
        </Text>
        {props.children}
      </VStack>
    </Flex>
  );
};
