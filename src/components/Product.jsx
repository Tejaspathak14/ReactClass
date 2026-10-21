import React, { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

const Product = () => {
  // const {pid}=useParams();
  const [info,setInfo]=useState();
  const [filter, setFilter] = useSearchParams();
  const pid = filter.get("pid");
  const onSearch=(e)=>{
         e.preventDefault()
         setFilter({pid:info})
  }
  const getProduct = () => {
    switch (pid) {
      case "p100": {
        return (
          <div>
            <h2>Production Information</h2>
            <h2>Product ID:{pid}</h2>
          </div>
        );
      }
      case "p200": {
        return (
          <div>
            <h2>Production Information for special product</h2>
            <h2>Product ID:{pid}</h2>
          </div>
        );
      }
      default: {
        return (
          <div>
            <h2>Production Information is not avilable for PID:{pid}</h2>
          </div>
        );
      }
    }
  };
  return (
    <div className="d-flex flex-column justify-content-center">
      <form className="d-flex" onSubmit={onSearch}>
        <input 
        type="text"
        value={info}
        onChange={(e)=>setInfo(e.target.value)}
        />
        <button className="btn btn-primary">Search PID</button>
      </form>
      {getProduct()}
    </div>
  );
};
export default Product;