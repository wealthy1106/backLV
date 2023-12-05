const express = require("express");
const dattour = require("../controllers/dattour.controller");

const router = express.Router();

router.route("/")
      .get(dattour.dsdattout)
// .post(dattour.newdattour)
// .delete(dattour.deleteAll);

router.route("/:idT")
      .post(dattour.newdattour)

router.route("/:idDT")
      .get(dattour.mottour)
      .put(dattour.chinhsua)
      .delete(dattour.delete);

router.route("/:idDT")
      .put(dattour.updateAmind)


module.exports = router;