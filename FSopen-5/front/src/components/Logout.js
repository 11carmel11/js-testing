import React from "react";
export default function Logout({ logoutHandler }) {
  return (
    <div>
      <button onClick={logoutHandler}>click to logout</button>
      <p></p>
    </div>
  );
}
