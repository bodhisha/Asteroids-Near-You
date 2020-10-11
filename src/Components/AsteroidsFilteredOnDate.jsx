import React, { useState, useEffect } from "react";
import DatePicker from "react-date-picker";

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
  console.log(FormatDate(startDate), FormatDate(endDate));

  const [asteroidData, setAsteroidData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        `https://api.nasa.gov/neo/rest/v1/feed?start_date=${FormatDate(
          startDate
        )}&end_date=${FormatDate(endDate)}&detailed=true&api_key=${apiKey}`
      );
      const data = await res.json();
      console.log(data);
      // setAsteroidData(data.near_earth_objects);
    }
    fetchData();
  }, [startDate, endDate]);

  return (
    <div>
      Hey
      <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0 pt-5">
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
          Start Date
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
      </div>
    </div>
  );
}
