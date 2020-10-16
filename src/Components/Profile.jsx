import React, { useState, useEffect, useContext } from "react";
import fire from "firebase";
import SearchAsteroid from "../Components/SearchAsteroid";
import { AuthContext } from "./Context/AuthContext";
import { Loading } from "../Components/Common/Loader";

export default function Profile() {
  const [asteroidIds, setAsteroidIds] = useState([]);
  // const currentUser = fire.auth().currentUser?.uid;
  const [user, setUser] = useContext(AuthContext);
  // const [loading, setloading] = useState(false);

  // setloading(true);
  useEffect(() => {
    fire
      .firestore()
      .collection("favourites")
      .where("user_id", "==", user)
      .get()
      .then((querySnapshot) => {
        setAsteroidIds(querySnapshot.docs.map((doc) => doc.data().asteroid_id));
        // setloading(false);
      });
  }, [user]);

  return (
    <div className="mx-auto  h-screen">
      <div className="text-blue-800 text-3xl text-center m-2 font-bold">
        Favourite Asteroids
      </div>

      {asteroidIds.map((asteroid_id) => {
        return <SearchAsteroid key={asteroid_id} id={asteroid_id} />;
      })}
    </div>
  );
}
