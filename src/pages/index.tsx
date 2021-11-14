import Footer from "@components/Footer";
import Header from "@components/Header";
import windy from "@helpers/windy";
import Link from "next/link";

const Badge = windy.span`
  inline-block
  align-middle
  rounded
  text-gray-200
  bg-blue-700
  px-1
  font-roboto
  select-none
`;

export default function Home() {
  return (
    <div className="min-h-screen h-auto bg-gray-700 flex flex-col">
      <Header />
      <div className="max-w-screen-xl w-full mx-auto flex-1 px-10 md:px-20 py-20 md:py-36">
        <Badge className="mb-2">Beta v0.0.1</Badge>
        <h1 className="text-white font-roboto text-6xl font-extrabold mb-12 select-none">
          Powerful VSCode
          <br />
          Theme editor
        </h1>
        <Link href="/edit/setup">
          <a className="py-2 px-2 bg-blue-700 text-white font-bold rounded-md">
            Get Started
          </a>
        </Link>
      </div>
      <Footer />
    </div>
  );
}
