var jwt = require("jsonwebtoken");

var secreto = process.env.JWT_SECRET;

function verificarToken(req, res, next) {
  var token = req.headers["authorization"];


  if (!token) {
    return res.status(401).json({ mensaje: "Token requerido" });
  }
  try {
    var decoded = jwt.verify(token, secreto);
    req.usuario = decoded;
    next();
  } catch(err) {
    return res.status(401).json({ mensaje: "Token invalido" });
  }
}

module.exports = verificarToken;