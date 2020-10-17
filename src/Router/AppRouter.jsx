import React from "react";
import { useRoutes, navigate } from "raviger";
import AsteroidsFilteredOnDate from "../Components/AsteroidsFilteredOnDate";
import UserNavBar from "../Components/Navbar/UserNavBar";
import Home from "../Components/Home";
import Profile from "../Components/Profile";
import SearchAsteroid from "../Components/SearchAsteroid";

const AppRouter = () => {
  const routes = {
    "/": () => <Home />,
    "/profile": () => <Profile />,
    "/asteroid": () => <AsteroidsFilteredOnDate />,
    "/search/:id": ({ id }) => <SearchAsteroid id={id} />,
  };
  const pages = useRoutes(routes);
  return (
    <div className="bg-gray-200 min-h-screen">
      <UserNavBar />

      {pages}
      {!pages && (
        <div className="h-screen flex justify-center py-16">
          Error 404: Page not found
        </div>
      )}
    </div>
  );
};

export default AppRouter;
