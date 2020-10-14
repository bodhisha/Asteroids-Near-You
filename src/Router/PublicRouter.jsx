import React from "react";
import { useRoutes, navigate } from "hookrouter";
import Login from "../Components/Login";
import Register from "../Components/Register";
import PublicNavBar from "../Components/Navbar/PublicNavBar";

import Home from "../Components/Home";
import AsteroidsFilteredOnDate from "../Components/AsteroidsFilteredOnDate";

const routes = {
  "/": () => <Home />,
  "/login": () => <Login />,
  "/register": () => <Register />,

  "/asteroid": () => <AsteroidsFilteredOnDate />,
};

export default function PublicRouter() {
  const pages = useRoutes(routes);

  !pages && navigate("/");
  return (
    <div className="min-h-screen">
      <PublicNavBar />

      {pages}
      {!pages && (
        <div className="flex justify-center py-16">
          Error 404: Page not found
        </div>
      )}
    </div>
  );
}
