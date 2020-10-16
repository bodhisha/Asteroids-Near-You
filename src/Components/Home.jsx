import React, { useState } from "react";
import ListAsteroids from "./ListAsteroids";
import SearchAsteroid from "./SearchAsteroid";
import { navigate } from "raviger";

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
    <>
      <input
        type="text"
        placeholder="Asteroid Id"
        className="ml-64 text-center"
        onChange={handleChange}
        value={searchId}
      ></input>
      <button onClick={handleSearch} className="bg-blue-300">
        Search
      </button>
      <ListAsteroids />
    </>
  );
}
