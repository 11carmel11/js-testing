import React, { useRef } from "react";

export default function Login({ setter }) {
  const passwordRef = useRef(null);
  const usernameRef = useRef(null);

  const login = () => {
    setter(usernameRef.current.value, passwordRef.current.value);
  };

  return (
    <div>
      <h3>login here</h3>
      <div>
        <label htmlFor="username">username:</label>
        <input
          ref={usernameRef}
          type="text"
          id="username"
          placeholder="username"
        />
      </div>
      <div>
        <label htmlFor="password">password:</label>
        <input
          ref={passwordRef}
          type="text"
          id="password"
          placeholder="password"
        />
      </div>
      <button onClick={login}>login!</button>
    </div>
  );
}
