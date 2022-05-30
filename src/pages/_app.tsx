/* eslint-disable react/jsx-props-no-spreading */
import { ChakraProvider, CSSReset, extendTheme } from "@chakra-ui/react";
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

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

// Extend the drop shadows to include a custom purple variant
theme.shadows.purple =
  "rgba(159, 122, 234, 0.1) 0px 0px 0px 1px, rgba(159, 122, 234, 0.2) 0px 5px 10px, rgba(159, 122, 234, 0.4) 0px 15px 25px";

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

// Redirect the user to an https connection for production.  This should rather be done server side down the line...
if (
  typeof window !== "undefined" &&
  window.location.hostname === "memes.party" &&
  window.location.protocol === "http:"
) {
  window.location.replace(`https://${window.location.hostname}`);
}

export default MyApp;
