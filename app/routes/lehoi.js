const express = require("express");
const lehoi = require("../controllers/lehoi.controller");

const router = express.Router();

router.route("/")
      .get(lehoi.dslehoi)
      .post(lehoi.newLHoi)
// .delete(lehoi.deleteAll);
router.route("/tongLH")
      .get(lehoi.tongLH)
router.route("/dslh")
      .get(lehoi.dsLH)

router.route("/:idLH")
      .get(lehoi.motLH)
      .put(lehoi.chinhsua)
      .delete(lehoi.delete);


module.exports = router;