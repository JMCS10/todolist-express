require("dotenv").config();
var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
var Usuario = require("./models/usuario");
var Tarea = require("./models/tarea");

mongoose.connect(process.env.MONGODB_URI);

async function cargarDatos() {

  await Usuario.deleteMany({});
  await Tarea.deleteMany({});

  //usuarios de prueba
  var pass1 = bcrypt.hashSync("123456", 10);
  var pass2 = bcrypt.hashSync("123456", 10);

  var usuario1 = await new Usuario({ username: "Jherlan", password: pass1 }).save();
  var usuario2 = await new Usuario({ username: "Marcelo", password: pass2 }).save();


  //usuario1 sus tareas
  await new Tarea({ descripcion: "Comprar leche", fecha: "6/10/2026", completado: false, usuario: usuario1._id }).save();
  await new Tarea({ descripcion: "Comprar galletas", fecha: "6/10/2026", completado: true, usuario: usuario1._id }).save();
  await new Tarea({ descripcion: "Hacer ejercicio", fecha: "6/10/2026", completado: false, usuario: usuario1._id }).save();


  //usuario2 sus tareas
  await new Tarea({ descripcion: "Comprar papel", fecha: "6/10/2026", completado: false, usuario: usuario2._id }).save();
  await new Tarea({ descripcion: "Imprimir informes", fecha: "6/10/2026", completado: false, usuario: usuario2._id }).save();


  
  console.log("Base de datos cargada correctamente");
  console.log("Usuario 1: Jherlan / 123456");
  console.log("Usuario 2: Marcelo / 123456");


  mongoose.connection.close();
}


cargarDatos().catch(function(err) {
  console.error(err);
  mongoose.connection.close();
});