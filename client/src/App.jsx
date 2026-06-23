import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Ideas from "./pages/Ideas";

export default function App() {
  const [page, setPage] = useState("login");

  return (
    <div>
      <nav>
        <button onClick={() => setPage("login")}>Login</button>
        <button onClick={() => setPage("register")}>Register</button>
        <button onClick={() => setPage("ideas")}>Ideas</button>
      </nav>

      {page === "login" && <Login />}
      {page === "register" && <Register />}
      {page === "ideas" && <Ideas />}
    </div>
  );
}