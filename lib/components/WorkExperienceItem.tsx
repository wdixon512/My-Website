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
  imageSrc?: string;
  children: React.ReactNode;
};

export const WorkExperienceItem = (props: WorkExperienceItemProps) => {
  return (
    <Flex gap="12">
      {props.imageSrc && (
        <Link href={props.link}>
          <Image
            src={props.imageSrc}
            maxWidth="225px"
            alt={`${props.company} logo`}
          />
        </Link>
      )}
      <VStack alignItems="start">
        <Heading fontSize="2xl" fontFamily="Pixel">
          <Link href={props.link}>{props.company}</Link>
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
