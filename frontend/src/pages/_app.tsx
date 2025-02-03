import "@/styles/globals.css";
import 'flowbite';
import React, { ReactNode, useEffect, createContext } from "react";
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

interface AppContextProps { 
  tokenCheck: number; 
  setTokenCheck: React.Dispatch<React.SetStateAction<number>>; 
  refreshUserData: number;
  setRefreshUserData: React.Dispatch<React.SetStateAction<number>>;
}

export const AppContext = createContext<AppContextProps | undefined>(undefined)

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

  const [tokenCheck, setTokenCheck] = React.useState<number>(0)
  const [refreshUserData, setRefreshUserData] = React.useState<number>(0)

  return (
    <Provider store={store}>
      <AppContext.Provider value={{tokenCheck, setTokenCheck, refreshUserData, setRefreshUserData}}>
        <AppInitializer>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </AppInitializer>
      </AppContext.Provider>
    </Provider>
  );
}

export default App;
