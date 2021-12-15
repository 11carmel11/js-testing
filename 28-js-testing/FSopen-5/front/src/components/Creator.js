import { Notyf } from "notyf";
import { useRef, useContext } from "react";
import { BlogsSetterContext } from "../App";
import pushNewBlog from "../services/create";
import resetRefs from "../services/resetRefs";

const notyf = new Notyf({ dismissible: true });

export default function Creator({ token }) {
  const blogsSetter = useContext(BlogsSetterContext);

  const titleRef = useRef(null);
  const authorRef = useRef(null);
  const urlRef = useRef(null);

  const createBlog = async () => {
    try {
      const title = titleRef.current.value;
      const author = authorRef.current.value;
      const url = urlRef.current.value;
      if (!url || !author || !url) return;
      const newList = await pushNewBlog(title, author, url, token);
      resetRefs(titleRef, authorRef, urlRef);
      blogsSetter(newList);
      notyf.success(`your blog has been added!`);
    } catch (error) {
      notyf.error("Oops, it seems like something went wrong... ");
    }
  };

  return (
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
        <button onClick={createBlog}>create blog</button>
      </div>
      <br />
    </div>
  );
}
