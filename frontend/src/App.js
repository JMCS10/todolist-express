import { useState } from "react";
import TodoList from "./components/TodoList";
import Drive from "./components/Drive";
function App() {
  var [pantalla, setPantalla] = useState("tareas");

  return (
    <div style={{ fontFamily: "Arial", padding: "20px" }}>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
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
      {pantalla === "tareas" && <TodoList />}
      {pantalla === "drive" && <Drive />}

    </div>
  );
}
export default App;