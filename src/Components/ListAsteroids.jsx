import React from "react";
import { useState, useEffect } from "react";
import fire from "firebase";
import ShowAsteroid from "./ShowAsteroid";
const apiKey = process.env.REACT_APP_NASA_API_KEY;

export default function ListAsteroids() {
  const [asteroidData, setAsteroidData] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const currentUser = fire.auth().currentUser?.uid;
  console.log("user", currentUser);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        `https://api.nasa.gov/neo/rest/v1/neo/browse?page=0&size=10&api_key=${apiKey}`
      );
      const data = await res.json();
      setAsteroidData(data.near_earth_objects);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h3 className="text-3xl font-bold text-blue-800 m-2 ">
        Asteroids near Earth
      </h3>
      <div className="mx-auto">
        {asteroidData.map((asteroid) => {
          return <ShowAsteroid key={asteroid.id} asteroid={asteroid} />;
        })}
      </div>
    </div>
  );
}
