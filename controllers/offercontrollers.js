const { Offer, User } = require("../models");
const thought404Message = (id) => `Thought with ID: ${id} not found!`;
const thought200Message = (id) => `Thought with ID: ${id} has been deleted!`;
const reaction200Message = (id) => `Reaction with ID: ${id} has been deleted!`;

const offerController = {
  // get all offers
  getAllOffers(req, res) {
    Offer.find({})
      .select("-__v")
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // get one thought by ID
  getOffersById(req, res) {
    Offer.findOne({ _id: req.params.id })
      .select("-__v")
      .then((dbThoughtData) =>
        dbThoughtData
          ? res.json(dbThoughtData)
          : res.status(404).json({ message: thought404Message(params.id) })
      )
      .catch((err) => {
        console.log(err);

        res.status(500).json(err);
      });
  },

  // add a thought
  createOffers(req, res) {
    Offer.create(req.body)
      .then(({ _id }) =>
        User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { offers: _id } },
          { $push: {  } },
          { new: true }
        )
      )
      .then((dbThoughtData) =>
      
      res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // update offer status info
  updateOffers({ params, body }, res) {
    Offer.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbThoughtData) =>
        dbThoughtData
          ? res.json(dbThoughtData)
          : res.status(404).json({ message: thought404Message(params.id) })
      )
      .catch((err) => res.status(500).json(err));
  },

  // delete thought
  deleteOffers({ params }, res) {
    Offer.findOneAndDelete({ _id: params.id })
      .then((dbThoughtData) =>
        dbThoughtData
          ? res.json(thought200Message(dbThoughtData._id))
          : res.status(404).json({ message: thought404Message(params.id) })
      )
      .catch((err) => {
        console.log(err);
        res.status(404).json(err);
      });
  },

  // getOffersByUser
  getOffersByUser(req, res) {
    // find all offers with userId
    // populate those offers with user details
    Offer.find({ userId: req.params.userId })
      .populate({ path: "senderId" })
      // BONUS: figure out how to only return user name and profle picture
      .then((offerData) => {
        console.log("i am the senderID data" , offerData)
        offerData
          ? res.json(offerData)
          : res.status(404).json({ message: user404Message(req.id) });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
 

// getting all the offers made by the sender --------------------

   showOffersByUser(req,res){
       Offer.find({senderId: req.params.senderId})
         .then((foundoffers)=>{
          foundoffers
          ? res.json(foundoffers)
          : res.status(404).json({ message: user404Message(req.id) });
          // console.log(foundoffers)
       })
       .catch((err)=>{
          console.log(err)
        })
 
  },

  //add a reaction to thought
  // createStatus(req, res) {
  //   Offer.findOneAndUpdate({ _id: req.params.id }, req.body, {
  //     new: true,
  //     runValidators: true,
  //   })
  //     .then((dbThoughtData) =>
  //       dbThoughtData
  //         ? res.json(dbThoughtData)
  //         : res.status(404).json({ message: thought404Message(params.id) })
  //     )
  //     .catch((err) => res.status(500).json(err));
  // },

  // remove a reaction from thought
  removeReaction({ params }, res) {
    Offer.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { _id: params.reactionId } } },
      { new: true }
    )
      .then((dbThoughtData) =>
        dbThoughtData
          ? res.json(reaction200Message(params.thoughtId))
          : res.status(404).json({ message: thought404Message(params.id) })
      )
      .catch((err) => res.status(404).json(err));
  },
};

module.exports = offerController;
