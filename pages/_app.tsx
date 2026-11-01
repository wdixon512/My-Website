import { SessionProvider } from 'next-auth/react';
import { ChakraProvider, Container } from '@chakra-ui/react';
import NavigationBar from '@lib/components/NavigationBar';
import Fonts from '@lib/components/global/Fonts';
import theme from '../styles/theme';
import { GameContextProvider } from '@lib/components/contexts/GameContext';
import '@fontsource/rhodium-libre';
import '../styles/global.css';
import Head from 'next/head';
import { headingFont } from '@lib/fonts';
import { CacheProvider } from '@lib/components/contexts/CacheContext';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { initAnalytics } from '@lib/analytics/client';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const pagePath = (router.asPath || '/').split(/[?#]/)[0];
  const pageUrl = `https://www.will-dixon.com${pagePath === '/' ? '/' : pagePath.replace(/\/+$/, '')}`;
  useEffect(() => {
    initAnalytics(router);
  }, [router]);

  return (
    <ChakraProvider theme={theme}>
      <CacheProvider>
        <SessionProvider session={pageProps.session}>
          <GameContextProvider>
            <Head>
              <link rel="preload" href="/static/fonts/PublicPixel.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
              <title>Will Dixon | Senior Full-Stack Engineer (.NET, React, Kentico)</title>
              <meta
                name="description"
                content="I'm a senior full-stack .NET/React engineer and Xperience by Kentico specialist with 10+ years building enterprise web apps."
              />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <link rel="icon" href="/favicon.ico" sizes="any" />
              <meta property="og:type" content="website" />
              <meta
                property="og:title"
                content="Will Dixon | Senior Full-Stack Engineer (.NET, React, Kentico)"
                key="og:title"
              />
              <meta
                property="og:description"
                content="I'm a senior full-stack .NET/React engineer and Xperience by Kentico specialist with 10+ years of experience."
                key="og:description"
              />
              <meta
                property="og:image"
                content="https://www.will-dixon.com/images/will-about.jpg"
                key="og:image"
              />
              <meta property="og:url" content={pageUrl} key="og:url" />
              <meta name="twitter:card" content="summary" />
              <meta
                name="twitter:title"
                content="Will Dixon | Senior Full-Stack Engineer (.NET, React, Kentico)"
              />
              <meta
                name="twitter:description"
                content="I'm a senior full-stack .NET/React engineer and Xperience by Kentico specialist with 10+ years of experience."
              />
              <meta
                name="twitter:image"
                content="https://www.will-dixon.com/images/will-about.jpg"
                key="twitter:image"
              />
              <link rel="canonical" href={pageUrl} key="canonical" />
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Person",
                    name: "Will Dixon",
                    jobTitle: "Senior Full-Stack Engineer",
                    url: "https://www.will-dixon.com/",
                    sameAs: [
                      "https://www.linkedin.com/in/william-d-79529a138/",
                      "https://github.com/wdixon512",
                    ],
                  }),
                }}
              />
            </Head>
            <Fonts />
            <Container className={`${headingFont.variable} wow-page`} width="100%" maxW="100%" minW={0} px="0" mx="0" pb="20" minHeight="100vh" bgColor="primary.500" overflowX="clip">

              <NavigationBar />
              <Component {...pageProps} />
            </Container>
          </GameContextProvider>
        </SessionProvider>
      </CacheProvider>
    </ChakraProvider>
  );
}

export default MyApp;
