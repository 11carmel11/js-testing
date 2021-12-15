export default function Logout({ children, logoutHandler }) {
  return (
    <div>
      <button onClick={logoutHandler}>{children}</button>
      <p></p>
    </div>
  );
}
