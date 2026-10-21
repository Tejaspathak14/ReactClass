import React, { useState } from "react";

const Counter = (props) => {
  const {id,count,inc,dec}=props;
 
  return (
    <div className="mt-2">
      <button className="btn btn-primary" onClick={()=>dec(id)}>
        -
      </button>
      <b className="bg-warning px-3 py-3 pt-1 pb-2 rounded mx-3 my-3">
        {count}
      </b>
      <button className="btn btn-primary" onClick={()=>inc(id)}>
        +
      </button>
    
    </div>
  );
};

export default Counter;