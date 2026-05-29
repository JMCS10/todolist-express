var Archivo = require("../models/archivo");
var fs = require("fs");
var path = require("path");

exports.listar = function(req, res) {
  Archivo.find()
    .then(function(archivos) {
      res.set("Content-Type", "application/json");
      res.set("X-Total-Count", archivos.length);
      res.json({
        total: archivos.length,
        fecha: new Date().toLocaleDateString(),
        datos: archivos
      });
    })
    .catch(function(err) {
      res.status(500).json({ error: err.message });
    });
};


exports.subir = function(req, res) {
  var hoy = new Date();
  Archivo.findOne({ nombreOriginal: req.file.originalname })
    .then(function(archivoExistente) {

    
      if (archivoExistente) {
        var rutaVieja = path.join(__dirname, "../uploads", archivoExistente.nombre);
        fs.unlinkSync(rutaVieja);
        return Archivo.findByIdAndDelete(archivoExistente._id);
      }

    })
    .then(function() {

      var archivo = new Archivo({
        nombre: req.file.filename,
        nombreOriginal: req.file.originalname,
        tipo: req.file.mimetype,
        tamanio: req.file.size,
        fecha: hoy.toLocaleDateString()
      });

      return archivo.save();
    })
    .then(function(archivoGuardado) {
      res.set("Content-Type", "application/json");
      res.status(201).json({
        mensaje: "Archivo subido correctamente",
        fecha: new Date().toLocaleDateString(),
        datos: archivoGuardado
      });
    })
    .catch(function(err) {
      res.status(500).json({ error: err.message });
    });
};


exports.descargar = function(req, res) {
  Archivo.findById(req.params.id)
    .then(function(archivo) {
      var rutaArchivo = path.join(__dirname, "../uploads", archivo.nombre);
      res.download(rutaArchivo, archivo.nombreOriginal);
    })
    .catch(function(err) {
      res.status(500).json({ error: err.message });
    });
};

exports.eliminar = function(req, res) {
  Archivo.findById(req.params.id)
    .then(function(archivo) {
      var rutaArchivo = path.join(__dirname, "../uploads", archivo.nombre);
      fs.unlinkSync(rutaArchivo);
      return Archivo.findByIdAndDelete(req.params.id);
    })
    .then(function() {
      res.set("Content-Type", "application/json");
      res.json({
        mensaje: "Archivo eliminado correctamente",
        fecha: new Date().toLocaleDateString()
      });
    })
    .catch(function(err) {
      res.status(500).json({ error: err.message });
    });
};