import React, { useState, useEffect } from "react";
import fire from "firebase";
export default function Profile() {
  const [asteroidIds, setAsteroidIds] = useState([]);

  useEffect(() => {
    fire
      .firestore()
      .collection("favourites")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setAsteroidIds(doc.data().asteroid_id);
        });
      });
  }, []);

  console.log(asteroidIds);

  return <div>Profile</div>;
}
