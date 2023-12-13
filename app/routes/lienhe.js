const express = require("express");
const lienhe = require("../controllers/lienhe.controller");

const router = express.Router();

router.route("/")
      .get(lienhe.lienhe)
      .post(lienhe.newlienhe)
// .delete(lienhe.deleteAll);
router.route("/tinhthanh/")
      .get(lienhe.tinhthanh)
router.route("/tinhthanh/tongtinh")
      .get(lienhe.tongtinh)

router.route("/:idLH")
      .get(lienhe.motlienhe)
      .put(lienhe.chinhsua)
      .delete(lienhe.delete);

router.route("/tinh/:idTinh")
      .get(lienhe.mottinh)
      .put(lienhe.updateTinh)
      .delete(lienhe.deleteTinh);
router.route("/tinh/")
      .post(lienhe.newtinh)


module.exports = router;