const express = require("express");
const lichtrinh = require("../controllers/lichtrinh.controller");

const router = express.Router();

router.route("/")
      .get(lichtrinh.dsLT)
      .post(lichtrinh.newLT)
// .delete(lichtrinh.deleteAll);

router.route("/:idLT")
      .get(lichtrinh.motLT)
      .put(lichtrinh.chinhsua)
      .delete(lichtrinh.delete);

module.exports = router;