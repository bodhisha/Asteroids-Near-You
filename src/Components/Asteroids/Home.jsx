import React, { useState } from "react";
import ListAsteroids from "./ListAsteroids";
import { Link, navigate } from "raviger";

export default function Home() {
  const [searchId, setSearchId] = useState("");
  const handleChange = (e) => {
    setSearchId(e.target.value);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search/${searchId} `);
  };

  return (
    <div>
      <div className="flex justify-center mt-4">
        <input
          type="text"
          placeholder="Search by Asteroid Id"
          className="bg-white rounded shadow p-2"
          onChange={handleChange}
          value={searchId}
        ></input>

        <button
          onClick={handleSearch}
          className="text-white font-bold rounded p-2 bg-blue-300"
        >
          Search
        </button>
      </div>
      <div className="flex justify-center m-2">
        <Link
          href="/asteroid"
          className="bg-blue-300 p-2 inline-block rounded-lg shadow hover:bg-blue-400 text-center  text-white font-bold"
        >
          Filter Asteroids by Date
        </Link>
      </div>
      <ListAsteroids />
    </div>
  );
}
