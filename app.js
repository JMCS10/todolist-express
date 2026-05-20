var express = require("express");
var mongoose = require("mongoose");
var tareasRouter = require("./routes/tareas");

var app = express();

var mongoDB = "mongodb+srv://admin:admin1234@cluster0.yfe9ftf.mongodb.net/todolist-adaptable?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(mongoDB);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));


app.use(express.json());

app.use("/api/tareas", tareasRouter);

app.listen(3000, function() {
  console.log("Servidor corriendo en puerto 3000");
});
