import React, { useMemo, useState } from "react";

const useMemoEx = () => {
  const [count, setCount] = useState(0);
  const [num, setNum] = useState(10);

  const getDouble = useMemo(() =>{
    console.log("inside getdouble");
    for (let i = 0; i < 20000; i++) {
      return num * 2;
    }
  },[num]);
  return (
    <div>
      <h2>Use of useMemo & useCallback Hook</h2>
      <h2>Count:{count}</h2>
      <button className="btn btn-primary" onClick={() => setCount(count + 1)}>
        Inc
      </button>
      <h2>
        Double of {num} Number:{getDouble}
      </h2>
    </div>
  );
};

export default useMemoEx;