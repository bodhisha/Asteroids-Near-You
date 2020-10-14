import React from "react";
import { useRoutes, navigate } from "hookrouter";
import AsteroidsFilteredOnDate from "../Components/AsteroidsFilteredOnDate";
import UserNavBar from "../Components/Navbar/UserNavBar";
import Home from "../Components/Home";
import Register from "../Components/Register";

const routes = {
  "/": () => <Home />,
};

const AppRouter = () => {
  const pages = useRoutes(routes);
  !pages && navigate("/");
  return (
    <div className="bg-gray-200">
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
