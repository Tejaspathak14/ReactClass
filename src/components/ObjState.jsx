import React, { useState } from "react";

const App = () => {
  let initName = {
    id: 1,
    name: "KIET",
  };
  const [nameObj, setName] = useState(initName);
  function changeName(newName) {
    console.log(nameObj);
    setName({ ...nameObj, name: newName });
    console.log(nameObj);
  }
  console.log(nameObj);
  return (
    <div>
      <h1>Name:{nameObj.name}</h1>
      <button onClick={() => changeName("KIET MCA")}>Change Name</button>
    </div>
  );
};

export default App;