import React, { useState, useEffect } from "react";
import ShowAsteroid from "./ShowAsteroid";
import { Loading } from "../Components/Common/Loader";
const apiKey = process.env.REACT_APP_NASA_API_KEY;

export default function SearchAsteroid({ id }) {
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(false)

  const [asteroid, setAsteroid] = useState([]);
  // setloading(true);

  useEffect(() => {
    setloading(true);
    async function fetchData(id) {
      const res = await fetch(
        `https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=${apiKey}`
      ).then((response) => {
        if (response.status === 200) {
          console.log("SUCCESSS");
          return response;
        } else if (response.status === 404) {
          console.log("SOMETHING WENT WRONG");
          setError(true)
        }
      });
      const data = await res?.json();
      setAsteroid(data);
      setloading(false);
      console.log(res);
    }
    fetchData(id);
  }, [id]);

  // console.log("asteroid", asteroid.estimated_diameter.kilometers);

  console.log("asteroidinsearch", asteroid);
  return (
    <div>
      {error ? (<div>ERROR</div>) : (
        <div>
          {loading ? (
            <Loading />
          ) : (
              <div className="max-w-3xl mx-auto">
                <div className="bg-blue-300 p-2 m-2 rounded shadow ">
                  <div className="flex justify-between  ">
                    <p className="text-xl text-blue-700 font-bold">{asteroid.name}</p>
                    {asteroid.is_potentially_hazardous_asteroid ? (
                      <p className="bg-blue-500 text-sm text-white font-bold p-1 block rounded-lg">
                        Potentially Hazardous Asteroid
                      </p>
                    ) : (
                        <p className="bg-blue-500 text-sm text-white font-bold p-1 block rounded-lg">
                          Non-Hazardous Asteroid
                        </p>
                      )}
                  </div>
                  {/* <p className="text-sm text-blue-700 ">
              Estimated Diameter of Asteroid:
              <span className="text-md text-blue-700 font-bold">
                Min -
                {asteroid.estimated_diameter.kilometers.estimated_diameter_max}
                km , Max -
                {asteroid.estimated_diameter.kilometers.estimated_diameter_max}
                km
              </span>
            </p> */}
                  {/* <p className="text-sm text-blue-700 ">
              Orbiting Body :
              <span className="text-md text-blue-700 font-bold">
                {asteroid.close_approach_data.close_approach_date_full || ""}
              </span>
            </p> */}
                  <p className="text-sm text-blue-700 ">
                    Designation:
              <span className="text-md text-blue-700 font-bold">
                      {asteroid.designation}
                    </span>
                  </p>
                  {/* {asteroid.close_approach_data.map((date) => {
              return (
                <>
                  {" "}
                  <p className="text-sm text-blue-700 ">
                    Closesrt Approach date:
                    <span className="text-md text-blue-700 font-bold">
                      {date.close_approach_date_full || ""}
                    </span>
                  </p>
                </>
              );
            })} */}

                  <p className="text-sm text-blue-700 ">
                    Absolute Magnitude:
              <span className="text-md text-blue-700 font-bold">
                      {asteroid.absolute_magnitude_h}
                    </span>
                  </p>
                  {/* <p className="text-sm text-blue-700 ">
              Last Observed on :
              <span className="text-md text-blue-700 font-bold">
                {asteroid.orbital_data.last_observation_date}
              </span>
            </p> */}
                </div>
              </div>
            )}
        </div>
      )}

    </div>
  );
  // return (
  //   <div className="mx-auto">
  //     <ShowAsteroid key={asteroid.id} asteroid={asteroid} />;
  //   </div>
  // );
}
