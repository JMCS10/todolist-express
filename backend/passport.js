var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var bcrypt = require("bcryptjs");
var Usuario = require("./models/usuario");

passport.use(new LocalStrategy(function(username, password, done) {

  //buscamos en mongo
  Usuario.findOne({ username: username })
    .then(function(usuario) {


      if (!usuario) {
        return done(null, false, { mensaje: "Usuario no encontrado" });
      }

      //verificamos la contra
      var passwordCorrecta = bcrypt.compareSync(password, usuario.password);

      if (!passwordCorrecta) {
        return done(null, false, { mensaje: "Contraseña incorrecta" });
      }


      return done(null, usuario);
    })
    .catch(function(err) {
      return done(err);
    });

}));
module.exports = passport;