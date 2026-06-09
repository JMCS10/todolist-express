var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var TareaSchema = new Schema({
  descripcion: { type: String, required: true },
  fecha: { type: String },
  completado: { type: Boolean, default: false },
  usuario: { type: Schema.Types.ObjectId, ref: "Usuario", required: true }
});

module.exports = mongoose.model("Tarea", TareaSchema);