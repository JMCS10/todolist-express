var express = require("express");
var router = express.Router();
var Tarea = require("../models/tarea");
//listar nuestras tareas
router.get("/", function(req, res) {
  Tarea.find()
    .then(function(tareas) {
      res.json(tareas);
    })
    .catch(function(err) {
      res.json({ error: err.message });
    });
});



router.post("/", function(req, res) {
  var hoy = new Date();
  var fecha = hoy.toLocaleDateString();

  var tarea = new Tarea({
    descripcion: req.body.descripcion,
    fecha: fecha,
    completado: false
  });

  tarea.save()
    .then(function(tareaGuardada) {
      res.json(tareaGuardada);
    })
    .catch(function(err) {
      res.json({ error: err.message });
    });
});

router.put("/:id", function(req, res) {
  Tarea.findById(req.params.id)
    .then(function(tarea) {
      tarea.descripcion = req.body.descripcion;
      return tarea.save();
    })
    .then(function(tareaActualizada) {
      res.json(tareaActualizada);
    })
    .catch(function(err) {
      res.json({ error: err.message });
    });
});


router.delete("/:id", function(req, res) {
  Tarea.findByIdAndDelete(req.params.id)
    .then(function() {
      res.json({ mensaje: "Tarea eliminada correctamente" });
    })
    .catch(function(err) {
      res.json({ error: err.message });
    });
});


router.patch("/:id", function(req, res) {
  Tarea.findById(req.params.id)
    .then(function(tarea) {
      tarea.completado = !tarea.completado;
      return tarea.save();
    })
    .then(function(tareaActualizada) {
      res.json(tareaActualizada);
    })
    .catch(function(err) {
      res.json({ error: err.message });
    });
});

module.exports = router;