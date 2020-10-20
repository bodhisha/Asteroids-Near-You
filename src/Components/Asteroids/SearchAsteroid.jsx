import React, { useState, useEffect } from "react";
import Error from "../Common/Error";
import { Loading } from "../Common/Loader";
import ShowAsteroid from "./ShowAsteroid";

const apiKey = process.env.REACT_APP_NASA_API_KEY;

export default function SearchAsteroid({ id }) {
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(false);

  const [asteroid, setAsteroid] = useState("");
  // setloading(true);

  useEffect(() => {
    setloading(true);
    async function fetchData(id) {
      console.log("data", asteroid);
      const res = await fetch(
        `https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=${apiKey}`
      ).then((response) => {
        if (response.status === 200) {
          return response;
        } else if (response.status === 404) {
          setError(true);
        }
      });
      const data = await res?.json();
      setAsteroid(data);
      setloading(false);
    }
    fetchData(id);
  }, [id]);

  console.log("asteroid", asteroid && asteroid.estimated_diameter.kilometers);

  return (
    <div>
      {error ? (
        <Error />
      ) : (
        <div>
          {loading ? (
            <Loading />
          ) : (
            <div className="mx-auto justify-center flex flex-wrap max-w-5xl">
              {asteroid && (
                <ShowAsteroid
                  key={asteroid && asteroid.id}
                  asteroid={asteroid && asteroid}
                />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
