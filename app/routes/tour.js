const express = require("express");
const tour = require("../controllers/tour.controller");

const router = express.Router();

router.route("/")
      .get(tour.dstour)
      .post(tour.newtour)
// .delete(tour.deleteAll);
router.route("/hanhkhach")
      .get(tour.dshanhkhach)
router.route("/hanhkhach/:idHK")
      .get(tour.motHK)

router.route("/dstour/")
      .get(tour.dstour4)
router.route("/tongtour/")
      .get(tour.tongtour)

router.route("/tourNB")
      .get(tour.tourNB)
router.route("/updateTNB/:idTNB")
      .get(tour.mottourNB)
      .put(tour.updateTNB)

router.route("/test1")
      .get(tour.dstour1)

router.route("/test2")
      .get(tour.dstour2)

router.route("/:idT")
      .get(tour.mottour)
      .put(tour.chinhsua)
      .delete(tour.delete);

// router.route("/cttour")
//       .post(tour.cttour)


module.exports = router;