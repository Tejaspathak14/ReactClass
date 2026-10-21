import React, { useCallback, useState } from "react";
import MyButton from "./MyButton";

const Home = () => {
  const [name,setName]=useState("mca")
  const showMessage=()=>{
    alert("Inside HOme")
    setName("KIET MCA")
  }
  const message=useCallback(()=>{
    alert("Inside Child")
  })
  return (
    <div>
      <h2>UseCallback Hook Example</h2>
      <button className="btn btn-primary" onClick={showMessage}>
        Click ME
      </button>
      <MyButton message={message}/>
    </div>
  );
};


export default Home;