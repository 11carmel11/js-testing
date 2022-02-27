import axios from "axios";
import getAll from "./getAll";
export default async function pushNewBlog(title, author, url, token) {
  await axios.post(
    "/api/blogs",
    { title, author, url },
    { headers: { authorization: `bearer ${token}` } }
  );

  const data = await getAll();
  return data;
}
