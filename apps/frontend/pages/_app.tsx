import * as React from "react";
import { Provider } from "react-redux";
import { createWrapper } from "next-redux-wrapper";
import { store } from "../store";
import type { AppProps } from "next/app";
import "../styles/main.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
const makestore = () => store;
const wrapper = createWrapper(makestore);

export default wrapper.withRedux(MyApp);
