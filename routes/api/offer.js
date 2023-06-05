const router = require("express").Router();
const {
  getAllOffers,
  getOffersById,
  createOffers,
  updateOffers,
  deleteOffers,
  createReaction,
  removeReaction,
} = require("../../controllers/offercontrollers");

router.route("/").get(getAllOffers).post(createOffers);

router.route("/:id").get(getOffersById).put(updateOffers).delete(deleteOffers);

router.route("/:OffersId/reactions").post(createReaction);

router.route("/:OffersId/reactions/:reactionId").delete(removeReaction);

module.exports = router;
