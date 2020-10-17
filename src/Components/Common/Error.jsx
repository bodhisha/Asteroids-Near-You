import React from "react";
import { Link } from "raviger";

export default function Error() {
  return (
    <div className="h-full">
      <div className="text-center text-3xl text-blue-700 font-extrabold">
        No Asteroid found! Try Searching with correct Asteroid Id
      </div>

      <div className="block">
        <Link
          className="bg-blue-300  p-2 hover:bg-blue-500"
          href="/">
          Back to Home
      </Link>
      </div>

    </div>

  );
}
