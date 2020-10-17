import React from "react";
import { useRoutes, navigate } from "raviger";
import Login from "../Components/Login";
import Register from "../Components/Register";
import PublicNavBar from "../Components/Navbar/PublicNavBar";
import AsteroidsFilteredOnDate from "../Components/AsteroidsFilteredOnDate";
import SearchAsteroid from "../Components/SearchAsteroid";
import Home from "../Components/Home";

const routes = {
  "/": () => <Home />,
  "/login": () => <Login />,
  "/register": () => <Register />,
  "/asteroid": () => <AsteroidsFilteredOnDate />,
  "/search/:id": ({ id }) => <SearchAsteroid id={id} />,
};

export default function PublicRouter() {
  const pages = useRoutes(routes);
  return (
    <div className="bg-gray-200 min-h-screen">
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
