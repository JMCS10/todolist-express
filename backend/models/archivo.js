var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArchivoSchema = new Schema({
  nombre: { type: String, required: true },
  nombreOriginal: { type: String, required: true },
  tipo: { type: String },
  tamanio: { type: Number },
  fecha: { type: String },
  usuario: { type: Schema.Types.ObjectId, ref: "Usuario", required: true }
});

module.exports = mongoose.model("Archivo", ArchivoSchema);