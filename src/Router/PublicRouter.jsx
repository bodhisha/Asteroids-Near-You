import React from "react";
import { useRoutes, navigate } from "raviger";
import Login from "../Components/User/Login";
import Register from "../Components/User/Register";
import PublicNavBar from "../Components/Navbar/PublicNavBar";
import AsteroidsFilteredOnDate from "../Components/Asteroids/AsteroidsFilteredOnDate";
import Home from "../Components/Asteroids/Home";
import SearchAsteroid from "../Components/Asteroids/SearchAsteroid";

export default function PublicRouter() {
  const routes = {
    "/": () => <Home />,
    "/login": () => <Login />,
    "/register": () => <Register />,
    "/asteroid": () => <AsteroidsFilteredOnDate />,
    "/search/:id": ({ id }) => <SearchAsteroid id={id} />,
  };
  const pages = useRoutes(routes);
  !pages && navigate("/");

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
