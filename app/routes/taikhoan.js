const express = require("express");
const taikhoan = require("../controllers/taikhoan.controller");

const router = express.Router();

router.route("/")
      .get(taikhoan.layDSTK)
      .post(taikhoan.newuser)
// .delete(taikhoan.deleteAll);
router.route("/user")
      .get(taikhoan.dsTKUser)

router.route("/:idTK")
      .get(taikhoan.layTK)
      .put(taikhoan.chinhsua)
      .delete(taikhoan.delete);

router.route("/ktlogin")
      .post(taikhoan.login)
module.exports = router;