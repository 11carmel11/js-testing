import axios from "axios";
const baseUrl = "/api/blogs";

export default async function getAll() {
  const { data } = await axios.get(baseUrl);
  return data;
}
