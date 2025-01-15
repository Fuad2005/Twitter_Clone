import "@/styles/globals.css";
import 'flowbite';
import React, { ReactNode, useEffect } from "react";
import type { AppProps } from "next/app";
import { store } from "@/redux/store/store";
import { Provider, useDispatch } from "react-redux";
import { GetUserByToken } from "@/utils/functions";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

// Define the props type for AppInitializer
interface AppInitializerProps {
  children: ReactNode;
}

const AppInitializer: React.FC<AppInitializerProps> = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      GetUserByToken(token, dispatch);
    }
  }, [dispatch]);

  return <>{children}</>;
};

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AppInitializer>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </AppInitializer>
    </Provider>
  );
}

export default App;
