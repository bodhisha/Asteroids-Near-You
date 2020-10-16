import React, { useState, useEffect, createContext } from "react";
import fire from "../../firebase";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [user, setUser] = useState("");
  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user.uid);
        console.log("signed in", user.uid);
      } else {
        setUser("");
        console.log("no user");
      }
    });
  };

  useEffect(() => {
    authListener();
  }, []);

  return (
    <AuthContext.Provider value={[user, setUser]}>
      {props.children}
    </AuthContext.Provider>
  );
};
