var express = require("express");
var router = express.Router();
var multer = require("multer");
var archivoController = require("../controllers/archivoController");

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function(req, file, cb) {
    var fecha = Date.now();
    cb(null, fecha + "-" + file.originalname);
  }
});

var upload = multer({ storage: storage });

router.get("/", archivoController.listar);
router.post("/subir", upload.single("archivo"), archivoController.subir);
router.get("/descargar/:id", archivoController.descargar);
router.delete("/:id", archivoController.eliminar);

module.exports = router;