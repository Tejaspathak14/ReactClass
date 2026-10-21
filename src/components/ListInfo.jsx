import React, { Fragment } from "react";

export default function ListInfo() {
  let name = "KIET MCA Lab 2";
  let listOfName = {
    name: "KIET",
    id: 2,
    class: "MCA Sec c",
  };
  let lang = ["Java", "C++", "Python", "React JS", "Mojo", "Flutter"];
  return (
    <>
      <h3>List of languages:</h3>
      {lang.map((value, index) => (
        <li key={index}>
          {index}. {value}
        </li>
      ))}
    </>
  );
}