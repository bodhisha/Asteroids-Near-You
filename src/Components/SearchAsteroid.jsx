import React, { useState, useEffect } from "react";

export default function SearchAsteroid({ id }) {
  const [asteroid, setAsteroid] = useState([]);

  useEffect(() => {
    async function fetchData(id) {
      const apiKey = process.env.REACT_APP_NASA_API_KEY;
      const res = await fetch(
        `https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=${apiKey}`
      );
      const data = await res.json();
      setAsteroid(data.near_earth_objects);
    }
    fetchData();
  }, [id]);
  return <div>{asteroid}</div>;
}
