var Tarea = require("../models/tarea");

//listar nuestras tareas
exports.listar = function(req, res) {
  Tarea.find()
    .then(function(tareas) {
      res.set("Content-Type", "application/json");
      res.set("X-Total-Count", tareas.length);
      res.json({
        total: tareas.length,
        fecha: new Date().toLocaleDateString(),
        datos: tareas
      });
    })
    .catch(function(err) {
      res.status(500).json({ error: err.message });
    });
};


exports.agregar = function(req, res) {
  var hoy = new Date();
  var fecha = hoy.toLocaleDateString();

  var tarea = new Tarea({
    descripcion: req.body.descripcion,
    fecha: fecha,
    completado: false
  });

  tarea.save()
    .then(function(tareaGuardada) {
      res.set("Content-Type", "application/json");
      res.status(201).json({
        mensaje: "Tarea creada correctamente",
        fecha: new Date().toLocaleDateString(),
        datos: tareaGuardada
      });
    })
    .catch(function(err) {
      res.status(500).json({ error: err.message });
    });
};

exports.editar = function(req, res) {
  Tarea.findById(req.params.id)
    .then(function(tarea) {
      tarea.descripcion = req.body.descripcion;
      return tarea.save();
    })
    .then(function(tareaActualizada) {
      res.set("Content-Type", "application/json");
      res.json({
        mensaje: "Tarea actualizada correctamente",
        fecha: new Date().toLocaleDateString(),
        datos: tareaActualizada
      });
    })
    .catch(function(err) {
      res.status(500).json({ error: err.message });
    });
};



exports.eliminar = function(req, res) {
  Tarea.findByIdAndDelete(req.params.id)
    .then(function() {
      res.set("Content-Type", "application/json");
      res.json({
        mensaje: "Tarea eliminada correctamente",
        fecha: new Date().toLocaleDateString()
      });
    })
    .catch(function(err) {
      res.status(500).json({ error: err.message });
    });
};


exports.cambiarEstado = function(req, res) {
  Tarea.findById(req.params.id)
    .then(function(tarea) {
      tarea.completado = !tarea.completado;
      return tarea.save();
    })
    .then(function(tareaActualizada) {
      res.set("Content-Type", "application/json");
      res.json({
        mensaje: "Estado actualizado correctamente",
        fecha: new Date().toLocaleDateString(),
        datos: tareaActualizada
      });
    })
    .catch(function(err) {
      res.status(500).json({ error: err.message });
    });
};