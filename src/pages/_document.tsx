import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentProps,
} from "next/document";
import Image from "next/image";
import Script from "next/script";
import createEmotionServer from "@emotion/server/create-instance";
import createEmotionCache from "@/utils/createEmotionCache";
import { AppType } from "next/app";
import { MyAppProps } from "./_app";

interface MyDocumentProps extends DocumentProps {
  emotionStyleTags: JSX.Element[];
}

export default function MyDocument({ emotionStyleTags }: MyDocumentProps) {
  return (
    <Html lang="pt-br">
      <Head title="Agger">
        <link
          rel="icon"
          href="static/flavicon-Agger.svg"
          sizes="any"
          type="image/svg+xml"
        />
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#000000" />
        <meta property="og:site_name" content="Agger Sistemas" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://agger.com.br/" />
        <meta property="og:title" content="Agger Sistemas" />
        <meta property="og:image" content="static/flavicon-Agger.svg" />
        <meta
          property="og:description"
          content="Agger Sistemas - Soluções para sua Corretora"
        />
        {/* <meta
          name="facebook-domain-verification"
          content="u187w0qlmtop0bknmz8tpwly4elyf2"
        /> */}
        <link rel="apple-touch-icon" href="static/flavicon-Agger.svg" />

        <link rel="manifest" href="static/manifest.json" />
        {/* <!-- Google Tag Manager (noscript) --> */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TH8253K"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        {/* <!-- End Google Tag Manager (noscript) -->
        <!-- Meta Pixel Code --> */}
        {/* <Script strategy="afterInteractive" id="meta">
          {`!(function (f, b, e, v, n, t, s) {
                if (f.fbq) return;
                n = f.fbq = function () {
                    n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
                };
                if (!f._fbq) f._fbq = n;
                n.push = n;
                n.loaded = !0;
                n.version = "2.0";
                n.queue = [];
                t = b.createElement(e);
                t.async = !0;
                t.src = v;
                s = b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t, s);
            })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
            fbq("init", "1083910262225858");
            fbq("track", "PageView");`}
        </Script> */}
        {/* <noscript>
          <Image
            height={1}
            alt="facebook logo"
            width={1}
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1083910262225858&ev=PageView&noscript=1"
          />
        </noscript> */}
        {/* <!-- End Meta Pixel Code --> */}
        {/* <!-- Google tag (gtag.js) --> */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-PG250P4F05"
        ></Script>
        <Script strategy="afterInteractive" id="ga4">
          {` window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', 'G-PG250P4F05');`}
        </Script>
        <meta name="emotion-insertion-point" content="" />
        {emotionStyleTags}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  const originalRenderPage = ctx.renderPage;

  // You can consider sharing the same Emotion cache between all the SSR requests to speed up performance.
  // However, be aware that it can have global side effects.
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (
        App: React.ComponentType<React.ComponentProps<AppType> & MyAppProps>
      ) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />;
        },
    });

  const initialProps = await Document.getInitialProps(ctx);
  // This is important. It prevents Emotion to render invalid HTML.
  // See https://github.com/mui/material-ui/issues/26561#issuecomment-855286153
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(" ")}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    emotionStyleTags,
  };
};
