import { useState } from "react";

function Auth({ onLogin }) {
  var [pantalla, setPantalla] = useState("login");
  var [username, setUsername] = useState("");
  var [password, setPassword] = useState("");
  var [mensaje, setMensaje] = useState("");

  function login() {
    if (username === "" || password === "") {
      setMensaje("Ingresa usuario y contraseña");
      return;
    }

    fetch("https://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username, password: password })
    })
      .then(function(res) { return res.json(); })
      .then(function(data) {
        if (data.token) {
          onLogin(data.token, data.username);
        } else {
          setMensaje(data.mensaje);
        }
      });
  }



  function register() {
    if (username === "" || password === "") {
      setMensaje("Ingresa usuario y contraseña");
      return;
    }

    fetch("https://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username, password: password })
    })
      .then(function(res) { return res.json(); })
      .then(function(data) {
        if (data.mensaje === "Usuario registrado correctamente") {
          setMensaje("Registrado correctamente. Ahora inicia sesion.");
          setPantalla("login");
          setUsername("");
          setPassword("");
        } else {
          setMensaje(data.error || data.mensaje);
        }
      });
  }


  return (
    <div style={{ fontFamily: "Arial", display: "flex", justifyContent: "center", marginTop: "80px" }}>
      <div style={{ background: "white", padding: "30px", border: "1px solid #ccc", width: "300px" }}>

        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          {pantalla === "login" ? "Iniciar Sesion" : "Registrarse"}
        </h2>

        <div style={{ marginBottom: "12px" }}>
          <label>Usuario:</label>
          <input
            type="text"
            value={username}
            onChange={function(e) { setUsername(e.target.value); }}
            style={{ width: "100%", padding: "8px", fontSize: "15px", boxSizing: "border-box" }}
          />
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={function(e) { setPassword(e.target.value); }}
            style={{ width: "100%", padding: "8px", fontSize: "15px", boxSizing: "border-box" }}
          />
        </div>

        {mensaje !== "" && (
          <p style={{ color: "red", fontSize: "14px", marginBottom: "10px" }}>{mensaje}</p>
        )}

        {pantalla === "login" ? (
          <div>
            <button
              onClick={login}
              style={{ width: "100%", padding: "10px", background: "#007bff", color: "white", border: "none", fontSize: "15px", cursor: "pointer", marginBottom: "10px" }}
            >
              Iniciar Sesion
            </button>
            <p style={{ textAlign: "center", fontSize: "14px" }}>
              ¿No tienes una cuenta?
              <button
                onClick={function() { setPantalla("register"); setMensaje(""); }}
                style={{ background: "none", border: "none", color: "#007bff", cursor: "pointer", fontSize: "14px" }}
              >
                Registrarse
              </button>
            </p>
          </div>
        ) : (
          <div>
            <button
              onClick={register}
              style={{ width: "100%", padding: "10px", background: "green", color: "white", border: "none", fontSize: "15px", cursor: "pointer", marginBottom: "10px" }}
            >
              Registrarse
            </button>
            <p style={{ textAlign: "center", fontSize: "14px" }}>
              ¿Ya tienes una cuenta?
              <button
                onClick={function() { setPantalla("login"); setMensaje(""); }}
                style={{ background: "none", border: "none", color: "#007bff", cursor: "pointer", fontSize: "14px" }}
              >
                Iniciar Sesion
              </button>
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

export default Auth;