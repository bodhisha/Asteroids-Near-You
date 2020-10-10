import React from "react";
import { useRoutes, navigate } from "hookrouter";
import Login from "../Components/Login";
import Home from "../Components/Home";

const routes = {
  "/": () => <Home />,
  "/login": () => <Login />,
};

export default function PublicRouter() {
  const pages = useRoutes(routes);
  !pages && navigate("/");
  return (
    <div className="relative bg-gray-200 min-h-screen pb-24">
      {pages}
      {!pages && (
        <div className="flex justify-center py-16">
          Error 404: Page not found
        </div>
      )}
    </div>
  );
}
