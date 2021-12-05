import Link from "next/link";


export default function MobileWarning(): JSX.Element {
  return (
    <div className="h-screen w-full flex justify-center items-center bg-gray-700">
      <div className="max-w-lg w-full bg-white rounded min-h-56 p-4 flex flex-col">
        <h1 className="mb-4 text-4xl font-roboto font-bold">Oh no..</h1>
        <p className="font-roboto">
          You tried to create a theme on a mobile browser, which is not
          supported.


        </p>
        <div className="flex-1 flex justify-end items-end">
          <Link href="/" passHref>
            <a className="bg-blue-700 hover:bg-blue-800 text-white font-roboto my-2 p-2 rounded">
              Go back
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
