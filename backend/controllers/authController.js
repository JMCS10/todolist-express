var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var passport = require("passport");
var Usuario = require("../models/usuario");

var secreto = process.env.JWT_SECRET;

exports.register = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  if (!username || !password) {
    return res.status(400).json({ mensaje: "Usuario y contraseña son requeridos" });
  }
  //incriptamos
  var passwordEncriptada = bcrypt.hashSync(password, 10);

  var usuario = new Usuario({
    username: username,
    password: passwordEncriptada
  });

  usuario.save()
    .then(function(usuarioGuardado) {
      res.status(201).json({
        mensaje: "Usuario registrado correctamente",
        datos: { username: usuarioGuardado.username }
      });
    })
    .catch(function(err) {
      res.status(500).json({ error: err.message });
    });
};



exports.login = function(req, res, next) {
  passport.authenticate("local", function(err, usuario, info) {

    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (!usuario) {
      return res.status(401).json({ mensaje: info.mensaje });
    }

    //generamos token
    var token = jwt.sign(
      { id: usuario._id, username: usuario.username },
      secreto,
      { expiresIn: "1h" }
    );

    res.json({
      mensaje: "Login exitoso",
      token: token,
      username: usuario.username
    });

  })(req, res, next);
};