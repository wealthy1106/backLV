const express = require("express");
const lienhe = require("../controllers/lienhe.controller");

const router = express.Router();

router.route("/")
      .get(lienhe.lienhe)
      .post(lienhe.newlienhe)
// .delete(lienhe.deleteAll);

router.route("/:idLH")
      .get(lienhe.motlienhe)
      .put(lienhe.chinhsua)
      .delete(lienhe.delete);


module.exports = router;