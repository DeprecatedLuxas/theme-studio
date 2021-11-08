import { useUser } from "@auth0/nextjs-auth0";
import Footer from "@components/Footer";
import Header from "@components/Header";
import windy from "@helpers/windy";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";

const Badge = windy.span`
  inline-block
  align-middle
  rounded
  text-gray-200
  bg-purple-700
  px-1
  font-roboto
  select-none
`;

export default function Home() {
  const { user, error, isLoading } = useUser();

  return (
    <div className="h-screen bg-gray-700 flex flex-col">
      <Header />
      <div className="max-w-screen-xl w-full mx-auto flex-1 px-20 py-36">
        <Badge className="mb-2">Beta v0.0.1</Badge>
        <h1 className="text-white font-roboto text-6xl font-extrabold mb-12 select-none">
          Powerful VSCode
          <br />
          Theme editor
        </h1>
        <Link href={`${!user ? "/edit/local" : `/edit/${uuidv4()}`}`}>
          <a className="py-2 px-2 bg-purple-700 text-white font-bold rounded-md">
            Get Started
          </a>
        </Link>
      </div>
      <Footer />
    </div>
  );
}
