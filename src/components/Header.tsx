import { useState } from "react";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";

export default function Header() {
  const { user, error, isLoading } = useUser();

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <header className="max-w-screen-xl w-full mx-auto">
      <nav className="flex items-center flex-wrap p-3">
        <Link href="/">
          <a className="inline-flex items-center p-2 mr-4 ">
            <span className="text-xl text-gray-900 dark:text-white font-bold uppercase tracking-wide">
              VSCode Studio
            </span>
          </a>
        </Link>
        <button
          className="inline-flex p-3 rounded md:hidden text-gray-900 dark:text-white ml-auto outline-none"
          onClick={handleClick}
          aria-label="Open Navigation"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <div
          className={`${
            open ? "" : "hidden"
          } w-full md:inline-flex md:flex-grow md:w-auto`}
        >
          <div className="md:inline-flex md:flex-row md:ml-auto md:w-auto w-full md:items-center items-start flex flex-col md:h-auto">
            <Link href="/">
              <a className="md:inline-flex md:w-auto w-full px-3 py-1 rounded text-gray-900 dark:text-white font-semibold items-center justify-center">
                Home
              </a>
            </Link>
            <Link href="/browse">
              <a className="md:inline-flex md:w-auto w-full px-3 py-1 rounded text-gray-900 dark:text-white font-semibold items-center justify-center">
                Browse
              </a>
            </Link>

            {user && (
              <Link href="/dashboard">
                <a className="md:inline-flex md:w-auto w-full md:ml-12 px-3 py-1 rounded text-gray-900 dark:text-white font-semibold items-center justify-center">
                  Dashboard
                </a>
              </Link>
            )}

            <a
              href={`${user ? "/api/auth/logout" : "/api/auth/login"}`}
              className="md:inline-flex md:w-auto w-full mx-auto px-3 py-1 rounded text-gray-900 dark:text-white md:text-white font-semibold items-center justify-center md:bg-blue-700"
            >
              {user ? "Logout" : "Login"}
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
