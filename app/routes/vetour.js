const express = require("express");
const vetour = require("../controllers/vetour.controller");

const router = express.Router();

router.route("/")
      .get(vetour.dsvetour)
      .post(vetour.newV)
// .post(vetour.newvetour)
// .delete(vetour.deleteAll);

router.route("/:idV")
      .get(vetour.motvetour)
      .put(vetour.chinhsua)
      .delete(vetour.delete);


module.exports = router;