const express = require("express");
const tinnhan = require("../controllers/tinnhan.controller");

const router = express.Router();

router.route("/")
      .get(tinnhan.dstinnhan)
      .post(tinnhan.newtinnhan)
// .delete(tinnhan.deleteAll);

router.route("/:idTK")
      .get(tinnhan.mottinnhan)
      .put(tinnhan.chinhsua)
      .delete(tinnhan.delete);


module.exports = router;