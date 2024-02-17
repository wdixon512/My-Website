import {
  Center,
  Container,
  Grid,
  Heading,
  Img,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import ImageCarousel from "../components/ImageCarousel";
import fs from "fs";
import path from "path";

interface PhotosProps {
  images: string[];
}

export async function getStaticProps() {
  const imagesDirectory = path.join(
    process.cwd(),
    "public/static/images/greece"
  );
  const filenames = fs.readdirSync(imagesDirectory);

  // Generate the paths for each image
  const images = filenames.map((name) => `/static/images/greece/${name}`);

  // Pass the images array to the page via props
  return { props: { images } };
}

export function Photos(pageProps: PhotosProps) {
  const { images } = pageProps;

  return (
    <Container maxW={{ base: "100%", md: "1200px" }}>
      <Center mt="12">
        <Tabs variant="soft-rounded">
          <TabList gap="12">
            <Tab>
              <Heading>Greece</Heading>
            </Tab>
            <Tab>
              <Heading>Family</Heading>
            </Tab>
            <Tab>
              <Heading>Hobbies</Heading>
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <ImageCarousel images={images} />
            </TabPanel>
            <TabPanel>{/* <ImageCarousel images={} /> */}</TabPanel>
            <TabPanel>{/* <ImageCarousel images={} /> */}</TabPanel>
          </TabPanels>
        </Tabs>
      </Center>
    </Container>
  );
}

export default Photos;
