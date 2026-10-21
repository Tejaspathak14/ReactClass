import React from "react";

const Error404 = () => {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center" style={{height:"80vh"}}
    >
      <h1 className="bg-danger text-white text-center" style={{width:"100%"}}>
        Page not found! (404)
      </h1>
    </div>
  );
};

export default Error404;