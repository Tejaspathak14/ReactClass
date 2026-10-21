import React, { useState } from "react";
import Counter from "./Counter";
const CounterP = () => {
  let [counters, setCounters] = useState([
    { id: 1, count: 0 },
    { id: 2, count: 2 },
    { id: 3, count: 1 },
    { id: 4, count: 3 },
  ]);
  const inc = (id) => {
    setCounters(counters.map((counter) =>
      counter.id === id ? { ...counter, count: counter.count + 1 } : counter,
    ));
  };
  const dec = (id) => {
     setCounters(counters.map((counter) =>
      counter.id === id ? { ...counter, count: counter.count - 1 } : counter,
    ));
  };
  const resetCounter=()=>{
     setCounters(counters.map((counter) =>
      ({ ...counter, count:0 })))
  }
  return (
    <div className="container mt-4">
      {counters.map((counter) => (
        <Counter
          key={counter.id}
          id={counter.id}
          count={counter.count}
          inc={inc}
          dec={dec}
        />
      ))}

      <button className="btn btn-danger mt-3" onClick={resetCounter}>
        Reset
      </button>
    </div>
  );
};

export default CounterP;