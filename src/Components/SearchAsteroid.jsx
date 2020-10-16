import React, { useState, useEffect } from "react";
import ShowAsteroid from "./ShowAsteroid";
import { Loading } from "../Components/Common/Loader";
const apiKey = process.env.REACT_APP_NASA_API_KEY;

export default function SearchAsteroid({ id }) {
  const [loading, setloading] = useState(false);

  const [Asteroid, setAsteroid] = useState([]);
  // setloading(true);

  useEffect(() => {
    setloading(true);
    async function fetchData(id) {
      const res = await fetch(
        `https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=${apiKey}`
      );
      const data = await res.json();
      setAsteroid(data);
      setloading(false);
    }
    fetchData(id);
  }, [id]);
  // console.log("asteroid", asteroid.estimated_diameter.kilometers);

  console.log("asteroidinsearch", Asteroid);
  return <div>{loading ? <Loading /> : <div>{Asteroid.name}</div>}</div>;
  // return (
  //   <div className="mx-auto">
  //     <ShowAsteroid key={asteroid.id} asteroid={asteroid} />;
  //   </div>
  // );
}
