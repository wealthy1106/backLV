const express = require("express");
const TTHK = require("../controllers/TTHK.controller");

const router = express.Router();

router.route("/")
      .get(TTHK.dstthk)
      .post(TTHK.newtthk)
// .post(TTHK.newTTHK)
// .delete(TTHK.deleteAll);

router.route("/:idHK")
      .get(TTHK.motHK)
      .put(TTHK.chinhsua)
      .delete(TTHK.delete);

router.route("/:idDT")
      .get(TTHK.motds)



module.exports = router;