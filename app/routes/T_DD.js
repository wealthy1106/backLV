const express = require("express");
const TDD = require("../controllers/TDD.controller");

const router = express.Router();

router.route("/")
      .get(TDD.ds)
      .post(TDD.new)
// .delete(TDD.deleteAll);
router.route("/motDD/:idDD")
      .get(TDD.motDD)
router.route("/timkiemDD/:tenDD")
      .get(TDD.timkiemDD)

router.route("/:idTDD")
      .put(TDD.chinhsua)
      .delete(TDD.delete);

router.route("/:idT/idDD")
      .get(TDD.mot)
      .put(TDD.chinhsua)
      .delete(TDD.delete);

module.exports = router;