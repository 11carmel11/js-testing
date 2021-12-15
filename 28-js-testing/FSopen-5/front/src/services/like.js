import axios from "axios";
import getAll from "./getAll";

export default async function like(id, likeNum, token) {
  await axios.patch(
    `/api/blogs/${id}`,
    {
      likes: likeNum + 1,
    },
    { headers: { authorization: `bearer ${token}` } }
  );
  const data = await getAll();
  return data;
}
