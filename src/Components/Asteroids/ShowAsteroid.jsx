import React, { useContext } from "react";
import fire from "firebase";
import { AuthContext } from "../Context/AuthContext";
import * as Notification from "../Common/Notification";

export default function ShowAsteroid({ asteroid }) {
  const [user] = useContext(AuthContext);
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
  // const AlreadyFavourite = (id) => {
  //   fire.firestore
  //     .collection("favourites")
  //     .where("user_id", "==", user)
  //     .where("asteroid_id", "==", id)
  //     .get()
  //     .then((docSnapshot) => {
  //       if (docSnapshot.exists) {
  //         // console.log("alreay fav", docSnapshot);
  //         setFav(true);
  //       } else {
  //         // console.log("not fav", docSnapshot);
  //       }
  //     });
  // };
  // console.log(AlreadyFavourite);
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

  return (
    <div key={asteroid.id} className="p-2 md:w-1/2">
      <div className="bg-white p-4 mt-4 rounded-lg shadow h-full flex flex-col justify-between">
        <div className="flex items-center flex-col">
          <h2 className="text-2xl text-blue-700 font-bold">{asteroid.name}</h2>
          <span className="bg-blue-100 rounded px-1 relative ml-2">
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
              Neo Reference Id{" "}
            </dt>
            <dd className="mt-1 text-sm leading-5 text-gray-900">
              {asteroid.neo_reference_id || "Nil"}
            </dd>
          </div>

          <div className="sm:col-span-1">
            <dt className="text-sm leading-5 font-medium text-gray-500">
              Absolute Magnitude
            </dt>
            <dd className="mt-1 text-sm leading-5 text-gray-900">
              {asteroid.absolute_magnitude_h || "Nil"}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm leading-5 font-medium text-gray-500">
              Diameter (Min)
            </dt>
            <dd className="mt-1 text-sm leading-5 text-gray-900">
              {asteroid.estimated_diameter.kilometers.estimated_diameter_max ||
                "Nil"}
              km
              {/* {asteroid.estimated_diameter.kilometers.estimated_diameter_max}km */}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm leading-5 font-medium text-gray-500">
              Designation
            </dt>
            <dd className="mt-1 text-sm leading-5 text-gray-900">
              {asteroid.designation || "Nil"}
            </dd>
          </div>

          <div className="sm:col-span-1">
            <dt className="text-sm leading-5 font-medium text-gray-500">
              Last Observed on
            </dt>
            <dd className="mt-1 text-sm leading-5 text-gray-900">
              {asteroid.orbital_data.last_observation_date || "Nil"}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm leading-5 font-medium text-gray-500">
              Aphelion distance
            </dt>
            <dd className="mt-1 text-sm leading-5 text-gray-900">
              {asteroid.orbital_data.aphelion_distance || "Nil"}
            </dd>
          </div>
        </dl>
        {user && (
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
              Remove from favourites
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
