import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  const add = () => {
    setCount(count + 1);
  };

  const subtract = () => {
    setCount(count - 1);
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <div className="container">
      <div className="grid">
        
        <button className="blue" onClick={subtract}>-</button>
        <button className="orange">{count}</button>
        <button className="blue" onClick={add}>+</button>

        <button className="blue" onClick={subtract}>-</button>
        <button className="orange">{count}</button>
        <button className="blue" onClick={add}>+</button>

        <button className="blue" onClick={subtract}>-</button>
        <button className="orange">{count}</button>
        <button className="blue" onClick={add}>+</button>

      </div>

      <button className="reset" onClick={reset}>
        Reset
      </button>
    </div>
  );
}

export default App;