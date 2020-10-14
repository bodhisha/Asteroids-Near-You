import React from "react";
import PublicRouter from "./Router/PublicRouter";
import AppRouter from "./Router/AppRouter";
import { useState, useEffect } from "react";

import fire from "firebase";

function App() {
  const [user, setUser] = useState("");
  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        console.log("signed in");
      } else {
        setUser("");
        console.log("no user");
      }
    });
  };

  useEffect(() => {
    authListener();
  }, []);

  if (user) return <AppRouter />;
  else {
    return <PublicRouter />;
  }
}

export default App;
