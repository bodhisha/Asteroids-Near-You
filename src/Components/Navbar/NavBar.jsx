import React, { useState } from "react";
import { Link } from "raviger";
import fire from "firebase";

export default function NavBar({ links, logout }) {
  const [shown, setShown] = useState(false);

  const Logout = () => {
    fire
      .auth()
      .signOut()
      .then(function () {
        console.log("succesfully signed out");
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };
  return (
    <nav className="flex items-center justify-between flex-wrap bg-blue-200">
      <Link href="/">
        <div className="flex items-center flex-shrink-0 text-white mr-6 py-6 pl-6">
          <span className="font-semibold text-blue-800 text-xl ml-1 tracking-tight">
            Spaceoid
          </span>
        </div>
      </Link>
      <div className="block lg:hidden py-6 pr-6">
        <button
          onClick={() => setShown(!shown)}
          className="flex items-center px-3 py-2 border outline-none rounded text-indigo-200 border-indigo-400 hover:text-white hover:border-white"
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div
        className={`w-full ${
          shown ? "block" : "hidden"
        } flex-grow lg:flex lg:items-center lg:w-auto lg:justify-center lg:bg-blue-200 bg-blue-200 pb-6 lg:p-6`}
      >
        <div className="text-sm lg:flex-grow flex flex-col lg:flex-row">
          {links &&
            links.map((el) => (
              <Link
                key={el.title}
                onClick={() => setShown(!shown)}
                className="block text-blue-800 text-base font-bold lg:inline-block lg:mt-0 text-gray-200 hover:text-white pr-20 lg:px-4 py-2 text-right lg:text-left lg:hover:bg-blue-300 hover:bg-blue-300"
                href={el.link}
              >
                {el.title}
              </Link>
            ))}
        </div>
        <div className="flex justify-end">
          {logout && (
            <button
              onClick={Logout}
              className="mr-16 lg:mr-0 inline-block text-base font-bold text-blue-700 px-4 py-2 bg-blue-200 leading-none border rounded text-white border-blue-700 hover:border-transparent hover:text-teal-500 hover:bg-blue-300 e mt-4 lg:mt-0"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
