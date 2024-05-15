import { Container, Flex } from "@chakra-ui/react";
import { MobForm } from "../components/dm-helper/MobForm";
import { DMHelperContextProvider } from "../components/contexts/DMHelperContext";
import { MobList } from "../components/dm-helper/MobList";
import { MobFavorites } from "../components/dm-helper/MobFavorites";

export function DMHelper({ Component, pageProps }) {
    return (
        <DMHelperContextProvider>
            <Container maxW={{ xl: "1200px" }} pt='12' justifyContent={'center'}>
                <Flex direction={{ base: 'column', lg: 'row' }} justifyContent='center' gap='12'>
                    <Flex direction='column' gap='4'>
                        <MobForm />
                        <MobFavorites />
                    </Flex>
                    <MobList />
                </Flex>

            </Container>
        </DMHelperContextProvider>
    )
}

export default DMHelper;