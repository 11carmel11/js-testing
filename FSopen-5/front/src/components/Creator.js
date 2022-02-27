import React, { useRef, useState } from "react";
import resetRefs from "../services/resetRefs";

export default function Creator({ createHandler }) {
  const [toggle, setToggle] = useState(false);
  const changeToggle = () => setToggle(!toggle);

  const titleRef = useRef(null);
  const authorRef = useRef(null);
  const urlRef = useRef(null);

  return !toggle ? (
    <button onClick={changeToggle}>want to add blog?</button>
  ) : (
    <div>
      <h3>create blog:</h3>
      <div>
        <label htmlFor="title">title:</label>
        <input
          ref={titleRef}
          id="title"
          type="text"
          placeholder="enter title"
        />
      </div>
      <div>
        <label htmlFor="author">author:</label>
        <input
          ref={authorRef}
          id="author"
          type="text"
          placeholder="enter author"
        />
      </div>
      <div>
        <label htmlFor="url">url:</label>
        <input ref={urlRef} id="url" type="text" placeholder="enter url" />
      </div>
      <div>
        <button
          id="create-btn"
          onClick={() => {
            createHandler(
              titleRef.current.value,
              authorRef.current.value,
              urlRef.current.value
            );
            resetRefs(titleRef, authorRef, urlRef);
          }}
        >
          create blog
        </button>
        <button onClick={changeToggle}>cancel</button>
      </div>
      <br />
    </div>
  );
}
