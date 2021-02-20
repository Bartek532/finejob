import * as React from "react";
import { Provider } from "react-redux";
import { createWrapper } from "next-redux-wrapper";
import { store } from "../store";
import type { AppProps } from "next/app";
import "../styles/main.scss";
import NextNprogress from "nextjs-progressbar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <NextNprogress
        color="#f59b66"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
      />
      <Component {...pageProps} />
    </Provider>
  );
}
const makestore = () => store;
const wrapper = createWrapper(makestore);

export default wrapper.withRedux(MyApp);
