import React, { useEffect, useState } from "react";

const UseEffectEx = () => {
  const [count, setCount] = useState(0);
  const [name,setName]=useState("KIET")
  const [comments,setComments]=useState([])
  const updateCount = () => {
    setCount(count + 1);
  };
  useEffect(() => {
     fetch("https://dummyjson.com/comments")
     .then(response=>response.json())
     .then(commentsData=>setComments(commentsData.comments))
     .catch(error=>alert(error))
  },[]);
  return (
    <div
      className="d-flex flex-column justify-content-center"
    >
      <h2>UseEffect Hook Example</h2>
      <h2>Count={count}</h2>
      <button className="btn btn-primary w-25" onClick={updateCount}>
        Inc
      </button>
      <h2>Name: {name}</h2>
      <button className="btn btn-primary w-25" onClick={()=>setName("MCA KIET")}>
        Change Name
      </button>
      {JSON.stringify(comments)}
    </div>
  );
};

export default UseEffectEx;