import React, { useState } from "react";
const DisplayObj = () => {
  const [studentInfo, setStudentInfo] = useState([
    { id: 1, name: "S1", marks: 90, class: "MCA 3rd C", result: "failed" },
    { id: 2, name: "S1", marks: [50, 60, 90], class: "MCA 3rd C" },
    { id: 3, name: "S1", marks: 90, class: "MCA 3rd C" },
    { id: 4, name: "S1", marks: 90, class: "MCA 3rd C", result: "Pass" },
  ]);
  const updateInfo = () => {
    setStudentInfo((prevStudent) =>
      prevStudent.map((row) => ({ ...row, name: "Name" + row.id })),
    );
  };
  return (
    <div>
      <h2>List of numbers:</h2>
      {studentInfo.map((row) => (
        <div key={row.id}>
          <h2>
            ID:{row.id}, Name:{row.name}, "Marks:"
            {Array.isArray(row.marks) ? row.marks.join(",") : row.marks},
            {row.result && <b>Result:{row.result}</b>}
          </h2>
        </div>
      ))}
      <button onClick={updateInfo}>Plus+2</button>
    </div>
  );
};

export default DisplayObj;