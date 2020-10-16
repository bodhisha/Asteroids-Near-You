import React from "react";
import { useRoutes, navigate } from "raviger";
import Login from "../Components/Login";
import Register from "../Components/Register";
import PublicNavBar from "../Components/Navbar/PublicNavBar";

import Home from "../Components/Home";

const routes = {
  "/": () => <Home />,
  "/login": () => <Login />,
  "/register": () => <Register />,
};

export default function PublicRouter() {
  const pages = useRoutes(routes);
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
