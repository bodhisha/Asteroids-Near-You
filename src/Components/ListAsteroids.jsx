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
      <div className="max-w-5xl w-full mx-auto bg-blue-100 ">
        <h3 className="text-3xl font-bold text-blue-800 m-2 ">Asteroids near Earth</h3>
        <div className="flex flex-col "  >
          {asteroidData.map((asteroid) => {
            console.log(asteroid.close_approach_data)
            return (
              <div className="bg-blue-300 p-2 m-2 rounded shadow ">
                <div className="flex justify-between  ">
                  <p className="text-xl text-blue-700 font-bold">
                    {asteroid.name}
                  </p>
                  {asteroid.is_potentially_hazardous_asteroid ? (
                    <p className="bg-blue-500 text-sm text-white font-bold p-1 block rounded-lg">Potentially Hazardous Asteroid</p>
                  ) : <p className="bg-blue-500 text-sm text-white font-bold p-1 block rounded-lg">Non-Hazardous Asteroid</p>
                  }
                </div>
                <p className="text-sm text-blue-700 ">
                  Estimated Diameter of Asteroid:
                  <span className="text-md text-blue-700 font-bold"> Min - {asteroid.estimated_diameter.kilometers.estimated_diameter_max} km , Max - {asteroid.estimated_diameter.kilometers.estimated_diameter_max}km</span>
                </p>
                <p className="text-sm text-blue-700 ">
                  Orbiting Body : <span className="text-md text-blue-700 font-bold"> {asteroid.close_approach_data.close_approach_date_full}</span>
                </p>
                <p className="text-sm text-blue-700 ">
                  Designation:
                  <span className="text-md text-blue-700 font-bold">{asteroid.designation}</span>
                </p>
                <p className="text-sm text-blue-700 ">
                  Absolute Magnitude:
                  <span className="text-md text-blue-700 font-bold">{asteroid.absolute_magnitude_h}</span>
                </p>
                <p className="text-sm text-blue-700 ">
                  Last Observed on :
                  <span className="text-md text-blue-700 font-bold"> {asteroid.orbital_data.last_observation_date}</span>
                </p>

              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

