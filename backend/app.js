require("dotenv").config();

var express = require("express");
var https = require("https");
var fs = require("fs");
var mongoose = require("mongoose");
var cors = require("cors");
var passport = require("./passport");
var tareasRouter = require("./routes/tareas");
var archivosRouter = require("./routes/archivos");
var authRouter = require("./routes/auth");
var verificarToken = require("./verificarToken");

var app = express();

mongoose.connect(process.env.MONGODB_URI);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));



//middlewares
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

//ruta publica
app.use("/api/auth", authRouter);

//rutas protegidas
app.use("/api/tareas", verificarToken, tareasRouter);
app.use("/api/archivos", verificarToken, archivosRouter);



//certificados para HTTPS
var options = {
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem")
};

//servidor HTTPS
https.createServer(options, app).listen(process.env.PORT, function() {
  console.log("Servidor HTTPS corriendo en puerto " + process.env.PORT);
});