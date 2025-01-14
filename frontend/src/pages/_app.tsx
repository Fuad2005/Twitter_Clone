import "@/styles/globals.css";
import 'flowbite'
import type { AppProps } from "next/app";
import { store } from "@/redux/store/store";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
