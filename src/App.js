import React from "react";
import PublicRouter from "./Router/PublicRouter";
import AppRouter from "./Router/AppRouter";
import { useState, useEffect } from "react";

import fire from "firebase";

function App() {
  const [user, setUser] = useState("");
  const authListener = () => {
    if (user) {
      console.log("foo");
    } else {
      fire.auth().onAuthStateChanged((user) => {
        if (user) {
          setUser(user.uid);
          console.log("signed in", user.uid);
        } else {
          setUser("");
          console.log("no user");
        }
      });
    }
  };

  useEffect(() => {
    authListener();
  }, []);

  console.log("app", user ? "hola" : "bolo");
  if (user) return <AppRouter userId={user} />;
  else {
    return <PublicRouter />;
  }
}

export default App;
