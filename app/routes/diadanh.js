const express = require("express");
const diadanh = require("../controllers/diadanh.controller");

const router = express.Router();

router.route("/")
      .get(diadanh.dsdiadanh)
      .post(diadanh.newdd)
// .delete(diadanh.deleteAll);

router.route("/tenmien")
      .get(diadanh.tenmien)

router.route("/tinh")
      .get(diadanh.tinh)

router.route("/tinhMN")
      .get(diadanh.tinhMN)
router.route("/tinhMT")
      .get(diadanh.tinhMT)
router.route("/tinhMB")
      .get(diadanh.tinhMB)
router.route("/alltinh")
      .get(diadanh.alltinh)


router.route("/:idDD")
      .get(diadanh.motdd)
      .put(diadanh.chinhsua)
      .delete(diadanh.delete)

router.route("/tourtinh")
      .post(diadanh.tourtheotinh)
router.route("/tinhtour/:tentinh")
      .post(diadanh.tinhtour)
router.route("/timkiemtinh/:tentinh")
      .get(diadanh.timkiemtinh)
router.route("/timkiemtenDD/:tenDD")
      .get(diadanh.timkiemtenDD)
router.route("/lichtrinh/:idT/:idLT")
      .get(diadanh.lichtrinh)
router.route("/lichtrinh/:idT")
      .get(diadanh.tumlum)
router.route("/dd")
      .post(diadanh.dsdiadanh1)
module.exports = router;