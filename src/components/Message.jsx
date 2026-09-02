import React from "react";

function Message(props) {
  return (
    <div>
      <p>{props.info}</p>

      {props.children}
    </div>
  );
}

export default Message;