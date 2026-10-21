import React, { useCallback, useRef, useState } from "react";
import MyButton from "./MyButton";

const Home = () => {
  const [count, setCount] = useState(0);
  const setf=useRef();
  const btnc=useRef();
  const getMsg = useCallback(() => {
    alert("This is get Message function");
  });
  const getFocus=(e)=>{
       e.preventDefault();
       setf.current.focus();
       btnc.current.style.backgroundColor="green"
  }
  return (
    <div>
      <h2>Count:{count}</h2>
      <button className="btn btn-primary" onClick={() => setCount(count + 1)}>
        Inc
      </button>
     <form>
      <input type="text"
      ref={setf}
      />
       <button className="btn btn-primary" onClick={getFocus} ref={btnc}>
        Set Focus
      </button>
     </form>
    </div>
  );
};

export default Home;