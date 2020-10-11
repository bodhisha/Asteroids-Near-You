import React from "react";
import { useState, useEffect } from "react";

const apiKey = process.env.REACT_APP_NASA_API_KEY;
export default function ListAsteroids() {
  const [asteroidData, setAsteroidData] = useState([]);
  useEffect(() => {
    console.log("render");
    async function fetchData() {
      const res = await fetch(
        `https://api.nasa.gov/neo/rest/v1/neo/browse?page=0&size=10&api_key=${apiKey}`
      );
      const data = await res.json();
      setAsteroidData(data.near_earth_objects);
    }
    fetchData();
  }, []);
  console.log(asteroidData.length);

  return (
    <>
      {asteroidData.map((d) => {
        return <div>name{d.name}</div>;
      })}
    </>
  );
}
