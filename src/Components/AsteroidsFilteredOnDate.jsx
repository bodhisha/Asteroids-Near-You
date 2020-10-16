import React, { useState, useEffect } from "react";
import DatePicker from "react-date-picker";
import ShowAsteroid from "./ShowAsteroid";

const apiKey = process.env.REACT_APP_NASA_API_KEY;

export default function AsteroidsFilteredOnDate() {
  function FormatDate(str) {
    var date = new Date(str),
      month = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), month, day].join("-");
  }

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [asteroidData, setAsteroidData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        `https://api.nasa.gov/neo/rest/v1/feed?start_date=${FormatDate(
          startDate
        )}&end_date=${FormatDate(endDate)}&detailed=true&api_key=${apiKey}`
      );
      const data = await res.json();
      setAsteroidData(data.near_earth_objects);
    }
    fetchData();
  }, [startDate, endDate]);

  return (
    <div>
      <div className="w-full mx-auto md:w-1/4 px-3 mb-6 md:mb-0 pt-5">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          Start Date
        </label>
        <div className="relative pt-2">
          <DatePicker
            className="appearance-none  w-half bg-grey-lighter text-grey-darker  py-1 px-2"
            value={startDate}
            onChange={(date) => setStartDate(date)}
            clearIcon={null}
            format="y-MM-dd"
          />
        </div>
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          End Date
        </label>
        <div className="relative pt-2">
          <DatePicker
            className="appearance-none  w-half bg-grey-lighter text-grey-darker  py-1 px-2"
            value={endDate}
            onChange={(date) => setEndDate(date)}
            clearIcon={null}
            format="y-MM-dd"
          />
        </div>
        {/* asteroid.close_approach_data.map((date) => console.log(date.close_approach_date_full)) */}


        {asteroidData &&
          (Object.values(asteroidData).map((dateWiseData) =>
            Object.values(dateWiseData).map((asteroid) => asteroid)).flat().sort((a, b) => a.close_approach_data[0].epoch_date_close_approach - b.close_approach_data[0].epoch_date_close_approach).slice(0, 10).map((asteroid) => {
              console.log(asteroid);
              return (
                <div className="mx-auto">
                  <ShowAsteroid key={asteroid.id} asteroid={asteroid} />
                </div>
              )

            })
          )}
      </div>
    </div>
  );
}
