var express = require("express");
var mongoose = require("mongoose");
var cors = require("cors");
var passport = require("./passport");
var tareasRouter = require("./routes/tareas");
var archivosRouter = require("./routes/archivos");
var authRouter = require("./routes/auth");
var verificarToken = require("./verificarToken");

var app = express();

// conexion a MongoDB
var mongoDB = "mongodb://admin:admin123@ac-htgokle-shard-00-00.yfe9ftf.mongodb.net:27017,ac-htgokle-shard-00-01.yfe9ftf.mongodb.net:27017,ac-htgokle-shard-00-02.yfe9ftf.mongodb.net:27017/todolist?ssl=true&replicaSet=atlas-dsqzjd-shard-0&authSource=admin&appName=Cluster0";
mongoose.connect(mongoDB);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// middlewares
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// rutas publicas - no necesitan token
app.use("/api/auth", authRouter);

// rutas protegidas - necesitan token
app.use("/api/tareas", verificarToken, tareasRouter);
app.use("/api/archivos", verificarToken, archivosRouter);

app.listen(5000, function() {
  console.log("Servidor corriendo en puerto 5000");
});