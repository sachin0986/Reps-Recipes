import React from "react";
import { useRouteError } from "react-router-dom";

const Error = () => {
    const err = useRouteError();
    console.log(err);
    return(
       <>
       this is an error page.
       <h3>{err.status} : {err.statusText}</h3>
       </>
    );
};

export default Error;