/* eslint-disable react/jsx-props-no-spreading */
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { EmotionCache } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import "@fontsource/poppins";
import "@fontsource/space-mono";
import styled from "@emotion/styled";
import { DefaultSeo } from "next-seo";
import { AppProps } from "next/app";
import Head from "next/head";
import Particles from "react-tsparticles";

import "styles/globals.css";
import defaultSEOConfig from "../../next-seo.config";
import Fonts from "../components/fonts";
import { Web3Provider } from "../contexts/Web3Provider";
import Layout from "components/layout";
import createEmotionCache from "styles/createEmotionCache";
import theme from "styles/customTheme";

import("dayjs/locale/en");
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const AppContainer = styled.div`
  font-family: "Comic Sans MS", "Comic Sans", "Chalkboard SE", "Comic Neue",
    cursive;
`;

const MyApp = ({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: MyAppProps) => {
  return (
    <Web3Provider>
      <CacheProvider value={emotionCache}>
        <ChakraProvider theme={theme}>
          <AppContainer>
            <Head>
              <meta
                name="viewport"
                content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
              />
            </Head>
            <DefaultSeo {...defaultSEOConfig} />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </AppContainer>
        </ChakraProvider>
      </CacheProvider>
    </Web3Provider>
  );
};

MyApp.defaultProps = {
  emotionCache: clientSideEmotionCache,
};

export default MyApp;
