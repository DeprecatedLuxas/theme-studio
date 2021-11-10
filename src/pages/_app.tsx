import type { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import { UserProvider } from "@auth0/nextjs-auth0";
import { RecoilRoot } from "recoil";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </RecoilRoot>
  );
}
export default MyApp;
