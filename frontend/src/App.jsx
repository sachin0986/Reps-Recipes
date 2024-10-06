import React from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Body from "./Components/Body";
import { createBrowserRouter, Outlet } from "react-router-dom";
import About from "./Pages/About";
import Corporate from "./Pages/Corporate";
import Help from "./Pages/Help";
import Search from "./Pages/Search";
import Offers from "./Pages/Offers";
import Error from "./Pages/Error";

const AppLayout = () => {
    return(
        <div>
            <Header />
           <div className="res-container">
            <Outlet />
           </div>
            <Footer />
        </div>
    );
};

    export const appRoute = createBrowserRouter([
        {
            path: "/",
            element: <AppLayout />,
            children: [
              {
                  path: "/",
                  element: <Body />
              },
            {
              path: "/corporate",
              element: <Corporate />
          },
          {
            path: "/offers",
            element: <Offers />
          },
          {
              path: "/help",
              element: <Help />
          },
          {
            path: "/search",
            element: <Search />
        }
            ],
            errorElement: <Error />
        },
        
    ]);


export default AppLayout;