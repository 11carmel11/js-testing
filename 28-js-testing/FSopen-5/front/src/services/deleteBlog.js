import axios from "axios";
import getAll from "./getAll";

export default async function deleteBlog(id, token) {
  await axios.delete(`/api/blogs/${id}`, {
    headers: { authorization: `bearer ${token}` },
  });
  const data = await getAll();
  return data;
}
