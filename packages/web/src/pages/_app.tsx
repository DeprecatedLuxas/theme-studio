import type { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import { UserProvider } from "@auth0/nextjs-auth0";
import { RecoilRoot } from "recoil";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <UserProvider>
        <Head>
          <title>VSCode Theme Studio</title>
        </Head>
        <Component {...pageProps} />
      </UserProvider>
    </RecoilRoot>
  );
}
export default MyApp;
