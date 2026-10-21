import React, { useReducer } from "react";

const UseReducerEx = () => {
  const initialState = {
    count: 0,
  };
  const reduce = (state, action) => {
    switch(action){
        case "plus1": return {...state,count:state.count+1}
        case "plus5": return {...state,count:state.count+5}
        case "minus1": return {...state,count:state.count-1}
        default: return state;
    }
  };
  const [state, dispatch] = useReducer(reduce, initialState);

  return (
    <div>
      <h2>Counter: {state.count}</h2>
      <button
        className="btn btn-primary p-2 m-2"l
        onClick={() => dispatch("plus1")}
      >
        Plus 1
      </button>
      <button
        className="btn btn-primary p-2 m-2"
        onClick={() => dispatch("plus5")}
      >
        Plus 5
      </button>
      <button
        className="btn btn-primary p-2 m-2"
        onClick={() => dispatch("minus1")}
      >
        Minus 1
      </button>
    </div>
  );
};

export default UseReducerEx;