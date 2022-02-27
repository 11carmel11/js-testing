import axios from "axios";
import getAll from "./getAll";

export default async function like(blog) {
  const { id, likes } = blog;
  await axios.patch(`/api/blogs/${id}`, {
    likes: likes + 1,
  });
  const data = await getAll();
  return data;
}
