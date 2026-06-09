import { useState } from "react";
import Auth from "./components/Auth";
import TodoList from "./components/TodoList";
import Drive from "./components/Drive";

function App() {
  var [token, setToken] = useState(null);
  var [username, setUsername] = useState("");
  var [pantalla, setPantalla] = useState("tareas");

  function handleLogin(tokenRecibido, usernameRecibido) {
    setToken(tokenRecibido);
    setUsername(usernameRecibido);
  }

  function cerrarSesion() {
    setToken(null);
    setUsername("");
  }



  if (!token) {
    return <Auth onLogin={handleLogin} />;
  }
  return (
    <div style={{ fontFamily: "Arial", padding: "20px" }}>

      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={function() { setPantalla("tareas"); }}
            style={{ padding: "8px 16px", fontSize: "16px", background: pantalla === "tareas" ? "#007bff" : "#ccc", color: pantalla === "tareas" ? "white" : "black", border: "none", cursor: "pointer" }}
          >
            Todo List
          </button>
          <button
            onClick={function() { setPantalla("drive"); }}
            style={{ padding: "8px 16px", fontSize: "16px", background: pantalla === "drive" ? "#007bff" : "#ccc", color: pantalla === "drive" ? "white" : "black", border: "none", cursor: "pointer" }}
          >
            Drive
          </button>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "14px" }}>Hola, {username}</span>
          <button
            onClick={cerrarSesion}
            style={{ padding: "6px 12px", fontSize: "14px", background: "red", color: "white", border: "none", cursor: "pointer" }}
          >
            Cerrar Sesion
          </button>
        </div>
      </div>

      {pantalla === "tareas" && <TodoList token={token} />}
      {pantalla === "drive" && <Drive token={token} />}

    </div>
  );
}

export default App;