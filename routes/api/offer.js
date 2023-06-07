const router = require("express").Router();
const {
  getAllOffers,
  getOffersById,
  createOffers,
  updateOffers,
  deleteOffers,
  getOffersByUser,
  showOffersByUser,
  //createStatus,
  // removeReaction,
} = require("../../controllers/offercontrollers");

router.route("/").get(getAllOffers).post(createOffers);

router.route("/:id").get(getOffersById).put(updateOffers).delete(deleteOffers);

router.route("/user/:userId").get(getOffersByUser).get(showOffersByUser);
router.route("/oneuser/:senderId").get(showOffersByUser);

//api/offers//:OffersId/reactions
//router.route("/:OffersId/status").put(createStatus);

// router.route("/:OffersId/reactions/:reactionId").delete(removeReaction);

module.exports = router;
