import React, { useState, useEffect } from "react";
import ShowAsteroid from "./ShowAsteroid";
const apiKey = process.env.REACT_APP_NASA_API_KEY;

export default function SearchAsteroid({ id }) {
  const [asteroid, setAsteroid] = useState([]);
  useEffect(() => {
    async function fetchData(id) {
      const res = await fetch(
        `https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=${apiKey}`
      );
      const data = await res.json();
      setAsteroid(data);
    }
    fetchData(id);
  }, [id]);

  return <div>{asteroid && asteroid.name}</div>;
}
