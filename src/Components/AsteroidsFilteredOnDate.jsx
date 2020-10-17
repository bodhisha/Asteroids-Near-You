import React, { useState, useEffect } from "react";
import DatePicker from "react-date-picker";
import ShowAsteroid from "./ShowAsteroid";
import { Loading } from "../Components/Common/Loader";

const apiKey = process.env.REACT_APP_NASA_API_KEY;

export default function AsteroidsFilteredOnDate() {
  function FormatDate(str) {
    var date = new Date(str),
      month = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), month, day].join("-");
  }

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [loading, setloading] = useState(true);
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
      setloading(false);
    }
    fetchData();
  }, [startDate, endDate]);

  return (
    <div>
      <div className="text-center m-2 text-3xl text-blue-700 font-extrabold">
        Filter Asteroids based on Closest Approach Date
      </div>
      <div className="max-w-lg mx-auto m-2 flex justify-center">
        <div className="flex flex-col">
          <label className="px-2 block uppercase tracking-wide text-blue-700 text-xs font-bold m-1">
            Start Date
      </label>
          <div className="relative ">
            <DatePicker
              className="appearance-none  w-half bg-blue-lighter text-blue-darker  py-1 px-2"
              value={startDate}
              onChange={(date) => setStartDate(date)}
              clearIcon={null}
              format="y-MM-dd"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label className="px-2 block uppercase tracking-wide text-blue-700 text-xs font-bold m-1">
            End Date
      </label>
          <div className="relative">
            <DatePicker
              className="appearance-none  w-half bg-blue-lighter text-blue-darker  py-1 px-2"
              value={endDate}
              onChange={(date) => setEndDate(date)}
              clearIcon={null}
              format="y-MM-dd"
              maxDate={
                new Date(
                  +new Date(startDate) +
                  (7 - 1) *
                  60 *
                  60 *
                  24 *
                  1000
                )
              }
              minDate={
                startDate
              }
            />
          </div>
        </div>
      </div>
      {loading ? (
        <div>
          <Loading />
        </div>
      ) : (
          <div className=" mx-auto flex flex-wrap max-w-5xl">

            {asteroidData &&
              Object.values(asteroidData)
                .map((dateWiseData) =>
                  Object.values(dateWiseData).map((asteroid) => asteroid)
                )
                .flat()
                .sort(
                  (a, b) =>
                    a.close_approach_data[0].epoch_date_close_approach -
                    b.close_approach_data[0].epoch_date_close_approach
                )
                .slice(0, 10)
                .map((asteroid) => {
                  console.log(asteroid);
                  return (
                    <ShowAsteroid key={asteroid.id} asteroid={asteroid} />
                  );
                })}
          </div>)}
    </div>
  );
}
