var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArchivoSchema = new Schema({
  nombre: { type: String, required: true },
  nombreOriginal: { type: String, required: true },
  tipo: { type: String },
  tamanio: { type: Number },
  fecha: { type: String }
});

module.exports = mongoose.model("Archivo", ArchivoSchema);