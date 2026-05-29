import { useState, useEffect } from "react";

function Drive() {
  var [archivos, setArchivos] = useState([]);
  var [archivoSeleccionado, setArchivoSeleccionado] = useState(null);


  useEffect(function() {
    cargarArchivos();
  }, []);



  function cargarArchivos() {
    fetch("http://localhost:5000/api/archivos")
      .then(function(res) { return res.json(); })
      .then(function(data) { setArchivos(data.datos); });
  }


  function subirArchivo() {
    if (!archivoSeleccionado) {
      alert("Selecciona un archivo");
      return;
    }

    var formData = new FormData();
    formData.append("archivo", archivoSeleccionado);

    fetch("http://localhost:5000/api/archivos/subir", {
      method: "POST",
      body: formData
    })
      .then(function(res) { return res.json(); })
      .then(function() {
        setArchivoSeleccionado(null);
        document.getElementById("inputArchivo").value = "";
        cargarArchivos();
      });
  }

  function descargarArchivo(id, nombreOriginal) {
    fetch("http://localhost:5000/api/archivos/descargar/" + id)
      .then(function(res) { return res.blob(); })
      .then(function(blob) {
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = nombreOriginal;
        a.click();
        window.URL.revokeObjectURL(url);
      });
  }

  function eliminarArchivo(id) {
    fetch("http://localhost:5000/api/archivos/" + id, { method: "DELETE" })
      .then(function(res) { return res.json(); })
      .then(function() { cargarArchivos(); });
  }


  
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Drive</h1>

      <div>
        <input
          type="file"
          id="inputArchivo"
          onChange={function(e) { setArchivoSeleccionado(e.target.files[0]); }}
          style={{ fontSize: "16px" }}
        />
        <button
          onClick={subirArchivo}
          style={{ padding: "8px 16px", fontSize: "16px", background: "#007bff", color: "white", border: "none", cursor: "pointer", marginLeft: "10px" }}
        >
          Subir
        </button>
      </div>

      <div style={{ marginTop: "20px" }}>
        {archivos && archivos.length === 0 && (
          <p>No hay archivos subidos.</p>
        )}

        {archivos && archivos.map(function(archivo) {
          return (
            <div key={archivo._id} style={{ background: "white", padding: "10px", marginTop: "10px", border: "1px solid #ccc" }}>
              <p style={{ margin: "0", fontSize: "16px" }}>{archivo.nombreOriginal}</p>
              <p style={{ margin: "4px 0", fontSize: "14px", color: "#555" }}>Tipo: {archivo.tipo}</p>
              <p style={{ margin: "4px 0", fontSize: "14px", color: "#555" }}>Tamaño: {archivo.tamanio} bytes</p>
              <p style={{ margin: "4px 0", fontSize: "14px", color: "#555" }}>Fecha: {archivo.fecha}</p>
              <div style={{ marginTop: "6px" }}>
                <button
                  onClick={function() { descargarArchivo(archivo._id, archivo.nombreOriginal); }}
                  style={{ padding: "4px 10px", background: "green", color: "white", border: "none", cursor: "pointer", marginRight: "6px" }}
                >
                  Descargar
                </button>
                <button
                  onClick={function() { eliminarArchivo(archivo._id); }}
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
export default Drive;