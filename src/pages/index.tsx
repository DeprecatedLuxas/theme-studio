import Footer from "@components/Footer";
import Header from "@components/Header";
import Link from "next/link";
import Badge from "@components/Badge";
import { isMobile } from "react-device-detect";

export default function Home() {
  return (
    <div className="min-h-screen h-auto bg-gray-700 flex flex-col">
      <Header />
      <div className="max-w-screen-xl w-full mx-auto flex-1 px-10 md:px-20 py-20 md:py-36">
        <Badge className="mb-2 select-none">Beta v0.0.1</Badge>
        <h1 className="text-white font-roboto text-6xl font-extrabold mb-12 select-none">
          Powerful VSCode
          <br />
          Theme editor
        </h1>
        {!isMobile ? (
          <Link href="/edit/setup">
            <a className="py-2 px-2 bg-blue-700 text-white font-bold rounded">
              Get Started
            </a>
          </Link>
        ) : (
          <p className="py-2 px-2 bg-red-700 text-white font-bold rounded w-max cursor-not-allowed select-none">
            Your device is not supported.
          </p>
        )}
      </div>
      <Footer />
    </div>
  );
}
