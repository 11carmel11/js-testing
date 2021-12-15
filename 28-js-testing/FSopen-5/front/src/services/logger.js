export default function logger(error) {
  const keys = Object.keys(error);
  const values = Object.values(error);
  const obj = {};
  for (let i = 0; i < keys.length; i++) {
    obj[keys[i]] = values[i];
  }
  console.log(obj);
}
