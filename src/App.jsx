import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./components/Home";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
