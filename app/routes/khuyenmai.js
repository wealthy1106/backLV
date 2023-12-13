const express = require("express");
const khuyenmai = require("../controllers/khuyenmai.controller");

const router = express.Router();

router.route("/")
      .get(khuyenmai.KM)
      .post(khuyenmai.newKM)
// .delete(khuyenmai.deleteAll);

router.route("/tongkm/")
      .get(khuyenmai.tongKM)

router.route("/all3")
      .get(khuyenmai.all3)
router.route("/all33")
      .get(khuyenmai.all33)
router.route("/all63")
      .get(khuyenmai.all63)

router.route("/giaKM/:idT/:idKM")
      .get(khuyenmai.giadKM)

router.route("/:idKM")
      .get(khuyenmai.motKM)
      .put(khuyenmai.chinhsua)
      .delete(khuyenmai.delete);


module.exports = router;