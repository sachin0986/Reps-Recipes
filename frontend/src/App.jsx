import React from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Body from "./Components/Body";
import { createBrowserRouter, Outlet } from "react-router-dom";
import About from "./Pages/About";
import Corporate from "./Pages/Corporate";
import Search from "./Pages/Search";
import Offers from "./Pages/Offers";
import Error from "./Pages/Error";
import ProductDetails from "./Pages/ProductDetails";
import AIpage from "./Components/AI";
import Contact from "./Pages/Contact";
import SignInPage from "./Pages/SignIn";
import CartPage from "./Pages/Cart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppLayout = () => {
    return(
        <div>
            <Header />
           <div className="res-container">
            <Outlet />
           </div>
            <Footer />
            <ToastContainer />
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
            path: "/aipage",
            element: <AIpage />
        },
        {
            path: "/signin",
            element: <SignInPage />
        },
          {
            path: "/offers",
            element: <Offers />
          },
          {
            path: "/search",
            element: <Search />
        },
        {
            path: "/contact",
            element: <Contact />
        },
        {
            path: "/cart",
            element: <CartPage />
        },
        {
          path: "/recipes/:dishId",
          element: <ProductDetails />
      }
            ],
            errorElement: <Error />
        },
        
    ]);


export default AppLayout;