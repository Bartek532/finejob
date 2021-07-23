import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en-US">
        <Head>
          <meta name="msapplication-TileColor" content="#f59b66" />
          <meta name="theme-color" content="#f2f2f2" />
          <meta name="apple-mobile-web-app-title" content="Finejob" />
          <meta
            name="viewport"
            content="width=device-width, user-scalable=yes, initial-scale=1.0, viewport-fit=cover"
          ></meta>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
                });
          `,
            }}
          />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;600;700&display=swap"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,600;1,700&display=swap"
          />

          <meta property="og:title" content="Finejob" />
          <meta
            property="og:description"
            content="Finejob was created primarily for developers (but not only) looking for a job. This app contains thousands of job offers!"
          />
          <meta
            property="og:image"
            content="https://i.ibb.co/5kHWd8k/finejob-logo-square.png"
          />
          <meta property="og:site_name" content="Finejob" />
          <meta property="og:image:alt" content="Finejob start page preview" />
          <meta property="og:image:width" content="500" />
          <meta property="og:image:height" content="500" />
          <meta property="og:url" content="https://finejob.vercel.app" />

          <meta name="twitter:site" content="@finejob" />
          <meta name="twitter:title" content="Finejob" />
          <meta
            name="twitter:description"
            content="Finejob was created primarily for developers (but not only) looking for a job. This app contains thousands of job offers!"
          />

          <meta
            name="twitter:image:src"
            content="https://i.ibb.co/5kHWd8k/finejob-logo-square.png"
          />

          <meta property="og:type" content="website" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
