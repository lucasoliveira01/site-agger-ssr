import "@/styles/globals.css";
import "@/styles/verticalSwiper.css";
import createEmotionCache from "@/utils/createEmotionCache";
import { EmotionCache } from "@emotion/cache";
import { CacheProvider, ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import type { AppProps } from "next/app";
import Head from "next/head";
import AggerTheme from "../utils/AggerTheme";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function App(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Agger</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        
      </Head>
      <ThemeProvider theme={AggerTheme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
  //return <Component {...pageProps} />;
}
