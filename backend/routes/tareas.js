var express = require("express");
var router = express.Router();
var tareaController = require("../controllers/tareaController");

router.get("/", tareaController.listar);
router.post("/", tareaController.agregar);
router.put("/:id", tareaController.editar);
router.delete("/:id", tareaController.eliminar);
router.patch("/:id", tareaController.cambiarEstado);

module.exports = router;