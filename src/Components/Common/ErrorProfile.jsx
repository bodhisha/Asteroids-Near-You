import React from "react";
import { Link } from "raviger";

export default function ErrorProfile() {
  return (
    <div className=" justify-center ">
      <div className="text-center text-3xl text-blue-700 font-extrabold">
        No Favourite Asteroids found!
      </div>
      <div className="text-center text-3xl text-blue-700 font-extrabold">
        Try Adding Asteroids as Favourites{" "}
      </div>
      <div className="flex justify-center block">
        <Link
          className="bg-blue-300 text-white font-bold rounded p-2 hover:bg-blue-500"
          href="/"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
