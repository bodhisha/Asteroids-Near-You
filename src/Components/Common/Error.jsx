import React from "react";
import { Link } from "raviger";

export default function Error() {
  return (
    <div className=" justify-center ">
      <div className="text-center text-3xl text-blue-700 font-extrabold">
        No Asteroid found! Try Searching with correct Asteroid Id
      </div>

      <div className="flex justify-center block">
        <Link
          className="bg-blue-300 text-white font-bold rounded p-2 hover:bg-blue-500"
          href="/">
          Back to Home
      </Link>
      </div>
    </div>

  );
}
