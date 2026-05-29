import { useState, useEffect } from "react";

function TodoList() {
  var [tareas, setTareas] = useState([]);
  var [descripcion, setDescripcion] = useState("");
  var [editandoId, setEditandoId] = useState(null);
  var [editandoDesc, setEditandoDesc] = useState("");

  useEffect(function() {
    cargarTareas();
  }, []);

  function cargarTareas() {
    fetch("http://localhost:5000/api/tareas")
      .then(function(res) { return res.json(); })
      .then(function(data) { setTareas(data.datos); });
  }

  
  function agregarTarea() {
    if (descripcion === "") {
      alert("Ingresa una descripcion");
      return;
    }
    fetch("http://localhost:5000/api/tareas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ descripcion: descripcion })
    })
      .then(function(res) { return res.json(); })
      .then(function() {
        setDescripcion("");
        cargarTareas();
      });
  }

  function eliminarTarea(id) {
    fetch("http://localhost:5000/api/tareas/" + id, { method: "DELETE" })
      .then(function(res) { return res.json(); })
      .then(function() { cargarTareas(); });
  }

  function cambiarEstado(id) {
    fetch("http://localhost:5000/api/tareas/" + id, { method: "PATCH" })
      .then(function(res) { return res.json(); })
      .then(function() { cargarTareas(); });
  }


  function guardarEdicion(id) {
    fetch("http://localhost:5000/api/tareas/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ descripcion: editandoDesc })
    })
      .then(function(res) { return res.json(); })
      .then(function() {
        setEditandoId(null);
        setEditandoDesc("");
        cargarTareas();
      });
  }
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Todo List</h1>

      <div>
        <input
          type="text"
          placeholder="Descripcion"
          value={descripcion}
          onChange={function(e) { setDescripcion(e.target.value); }}
          style={{ padding: "8px", fontSize: "16px", width: "80%" }}
        />
        <button
          onClick={agregarTarea}
          style={{ padding: "8px 16px", fontSize: "16px", background: "#007bff", color: "white", border: "none", cursor: "pointer" }}
        >
          Añadir
        </button>
      </div>

      <div style={{ marginTop: "20px" }}>
        {tareas && tareas.map(function(tarea) {
          return (
            <div key={tarea._id} style={{ background: "white", padding: "10px", marginTop: "10px", border: "1px solid #ccc" }}>
              <input
                type="checkbox"
                checked={tarea.completado}
                onChange={function() { cambiarEstado(tarea._id); }}
              />

              {editandoId === tarea._id ? (
                <span>
                  <input
                    type="text"
                    value={editandoDesc}
                    onChange={function(e) { setEditandoDesc(e.target.value); }}
                    style={{ padding: "4px", fontSize: "15px" }}
                  />
                  <button
                    onClick={function() { guardarEdicion(tarea._id); }}
                    style={{ padding: "4px 10px", background: "green", color: "white", border: "none", cursor: "pointer", marginLeft: "6px" }}
                  >
                    Guardar
                  </button>
                  <button
                    onClick={function() { setEditandoId(null); }}
                    style={{ padding: "4px 10px", background: "gray", color: "white", border: "none", cursor: "pointer", marginLeft: "6px" }}
                  >
                    Cancelar
                  </button>
                </span>
              ) : (
                <span style={{ textDecoration: tarea.completado ? "line-through" : "none", color: tarea.completado ? "gray" : "black", marginLeft: "8px" }}>
                  {tarea.descripcion}
                </span>
              )}

              <p style={{ margin: "4px 0", fontSize: "14px", color: "#555" }}>Fecha: {tarea.fecha}</p>

              <div style={{ marginTop: "6px" }}>
                <button
                  onClick={function() { setEditandoId(tarea._id); setEditandoDesc(tarea.descripcion); }}
                  style={{ padding: "4px 10px", background: "orange", color: "white", border: "none", cursor: "pointer", marginRight: "6px" }}
                >
                  Editar
                </button>
                <button
                  onClick={function() { eliminarTarea(tarea._id); }}
                  style={{ padding: "4px 10px", background: "red", color: "white", border: "none", cursor: "pointer" }}
                >
                  Eliminar
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default TodoList;