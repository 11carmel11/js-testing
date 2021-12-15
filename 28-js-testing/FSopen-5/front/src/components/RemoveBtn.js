import { Notyf } from "notyf";
import { useContext } from "react";
import { BlogsSetterContext } from "../App";
import deleteBlog from "../services/deleteBlog";
import logger from "../services/logger";

const notyf = new Notyf({ dismissible: true });

export default function RemoveBtn({ blog, token }) {
  const blogSetter = useContext(BlogsSetterContext);

  const removeBlog = async () => {
    try {
      const isSure = window.confirm("Are you sure you want to delete blog?");
      if (!isSure) return;
      const blogs = await deleteBlog(blog.id, token);
      blogSetter(blogs);
      notyf.success("blog has been deleted");
    } catch (error) {
      logger(error);
      notyf.error("process has failed. try again and we'll try our best!");
    }
  };

  return (
    <div>
      <button onClick={removeBlog}>remove</button>
    </div>
  );
}
