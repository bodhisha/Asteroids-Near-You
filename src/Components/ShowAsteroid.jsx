import React from "react";
import { useContext } from "react";
import fire from "firebase";
import { AuthContext } from "../Components/Context/AuthContext";
import * as Notification from "../Components/Common/Notification";

export default function ShowAsteroid({ asteroid }) {
  const [user, setUser] = useContext(AuthContext);

  const AddToFavourites = (id) => {
    fire
      .firestore()
      .collection("favourites")
      .add({
        asteroid_id: id,
        user_id: user,
      })
      .then(function (docRef) {
        Notification.Success({
          msg: `Asteroid ${asteroid.name} Added to favorites List`,
        });
      })
      .catch(function (error) {
        Notification.Error({
          msg: `Error adding document ${error}`,
        });
      });
  };
  const RemoveFromFavourites = (id) => {
    fire
      .firestore()
      .collection("favourites")
      .where("asteroid_id", "==", id)
      .where("user_id", "==", user)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref
            .delete()
            .then(() => {
              Notification.Success({
                msg: `Asteroid ${asteroid.name} Removed from favorites List`,
              });
            })
            .catch(function (error) {
              Notification.Error({
                msg: `Error Removing asteroid from Favourite List ${error}`,
              });
            });
        });
      });
  };

  console.log(user);
  return (
    <div
      key={asteroid.id}
      className="bg-white p-4 mt-4 rounded-lg shadow max-w-lg mx-auto"
    >
      <div className="flex items-center flex-col">
        <h2 className="text-2xl text-blue-700 font-bold">{asteroid.name}</h2>
        <span className="relative ml-2">
          <div>
            {asteroid.is_potentially_hazardous_asteroid
              ? "Potentially Hazardous"
              : " Non-Hazardous"}
          </div>
          {asteroid.is_potentially_hazardous_asteroid && (
            <span className="flex absolute h-3 w-3 top-0 right-0 -mt-1 -mr-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
          )}
        </span>
      </div>
      <dl className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2 mt-2">
        <div className="sm:col-span-1">
          <dt className="text-sm leading-5 font-medium text-gray-500">
            Diameter
          </dt>
          <dd className="mt-1 text-sm leading-5 text-gray-900">
            {asteroid.estimated_diameter.kilometers.estimated_diameter_max}km -
            {asteroid.estimated_diameter.kilometers.estimated_diameter_max}km
          </dd>
        </div>
        <div className="sm:col-span-1">
          <dt className="text-sm leading-5 font-medium text-gray-500">
            Designation
          </dt>
          <dd className="mt-1 text-sm leading-5 text-gray-900">
            {asteroid.designation}
          </dd>
        </div>
        <div className="sm:col-span-1">
          <dt className="text-sm leading-5 font-medium text-gray-500">
            Absolute Magnitude
          </dt>
          <dd className="mt-1 text-sm leading-5 text-gray-900">
            {asteroid.absolute_magnitude_h}
          </dd>
        </div>
        <div className="sm:col-span-1">
          <dt className="text-sm leading-5 font-medium text-gray-500">
            Last Observed on
          </dt>
          <dd className="mt-1 text-sm leading-5 text-gray-900">
            {asteroid.orbital_data.last_observation_date}
          </dd>
        </div>
        {asteroid.close_approach_data.map((date) => {
          return (
            <>
              <div className="sm:col-span-1">
                <dt className="text-sm leading-5 font-medium text-gray-500">
                  Closet Approach date:
                </dt>
                <dd className="mt-1 text-sm leading-5 text-gray-900">
                  {date.close_approach_date_full || ""}
                </dd>
              </div>
            </>
          );
        })}
        <div className="sm:col-span-1">
          <dt className="text-sm leading-5 font-medium text-gray-500">
            Neo Reference Id{" "}
          </dt>
          <dd className="mt-1 text-sm leading-5 text-gray-900">
            {asteroid.neo_reference_id}
          </dd>
        </div>
        <div className="sm:col-span-1">
          <dt className="text-sm leading-5 font-medium text-gray-500">
            Orbiting Body
          </dt>
          <dd className="mt-1 text-sm leading-5 text-gray-900">
            {asteroid.orbital_data.aphelion_distance}
          </dd>
        </div>
      </dl>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => AddToFavourites(asteroid.id)}
          className="text-sm border py-2 px-4 font-semibold block rounded hover:bg-gray-200 text-gray-900"
        >
          Add to favourites
        </button>
        <button
          onClick={() => RemoveFromFavourites(asteroid.id)}
          className="text-sm border py-2 px-4 font-semibold block rounded hover:bg-gray-200 text-gray-900"
        >
          delete favourites
        </button>
      </div>
    </div>
  );
}
