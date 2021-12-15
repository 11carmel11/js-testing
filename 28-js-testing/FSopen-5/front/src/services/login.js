import axios from "axios";

export default async function login(username, password) {
  const { data } = await axios.get(
    `http://localhost:3003/api/users/login?username=${username}&&password=${password}`
  );
  return data;
}
