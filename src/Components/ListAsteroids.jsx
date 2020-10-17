import React from "react";
import { useState, useEffect } from "react";
import ShowAsteroid from "./ShowAsteroid";
import { Loading } from "../Components/Common/Loader";

const apiKey = process.env.REACT_APP_NASA_API_KEY;

export default function ListAsteroids() {
  const [asteroidData, setAsteroidData] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      // setloading(true);
      const res = await fetch(
        `https://api.nasa.gov/neo/rest/v1/neo/browse?page=0&size=10&api_key=${apiKey}`
      );
      const data = await res.json();
      setAsteroidData(data.near_earth_objects);
      setloading(false);
    }
    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <div>
          <Loading />
        </div>
      ) : (
        <div>
          <h3 className="text-3xl text-center font-bold text-blue-800 m-2 ">
            Asteroids near Earth
          </h3>
          <div className="mx-auto flex flex-wrap max-w-5xl">
            {asteroidData.map((asteroid) => {
              return <ShowAsteroid key={asteroid.id} asteroid={asteroid} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
}
