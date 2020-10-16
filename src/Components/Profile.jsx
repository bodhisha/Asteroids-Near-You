import React, { useState, useEffect } from "react";
import fire from "firebase";
import SearchAsteroid from "../Components/SearchAsteroid";

export default function Profile({ userId }) {
  const [asteroidIds, setAsteroidIds] = useState([]);
  // const currentUser = fire.auth().currentUser?.uid;
  console.log("profile", userId);
  const [favAsteroidIds, setFavAsteroidIds] = useState([]);

  // useEffect(() => {
  //   fire
  //     .firestore()
  //     .collection("users")
  //     .doc(userId)
  //     .collection("favourites")
  //     .get()
  //     .then((querySnapshot) => {
  //       setAsteroidIds(querySnapshot.docs.map((doc) => doc.data().asteroid_id));
  //     });
  // }, [userId]);

  console.log("a", asteroidIds);

  return (
    <div>
      {/* {asteroidIds.map((a) => {
        return <SearchAsteroid key={a} id={a} />;
      })}
      hey */}
    </div>
  );
}
