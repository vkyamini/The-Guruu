const { Offer, User } = require('../models')
const thought404Message = (id) => `Thought with ID: ${id} not found!`
const thought200Message = (id) => `Thought with ID: ${id} has been deleted!`
const reaction200Message = (id) => `Reaction with ID: ${id} has been deleted!`

const offerController = {
    // get all offers 
    getAllOffers(req, res) {
        Offer.find({})
        .select('-__v')
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => 
            {  console.log(err)
                res.status(500).json(err)
            })
    },

    // get one thought by ID
    getOffersById(req, res) {
        Offer.findOne({ _id: req.params.id })
        .select('-__v')
        .then(dbThoughtData =>  dbThoughtData ? res.json(dbThoughtData) : res.status(404).json({ message: thought404Message(params.id) }))
        .catch(err => {
            console.log(err)
            
            res.status(500).json(err)})
    },

    // add a thought
    createOffers(req, res) {
        Offer.create(req.body)
        .then(({_id}) => User.findOneAndUpdate({ _id: req.body.userId}, { $push: { offers: _id } }, { new: true }))
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => 
            { console.log(err)
                res.status(500).json(err)})
    },

    // update thought info 
    updateOffers({ params, body }, res) {
       Offer.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbThoughtData =>  dbThoughtData ? res.json(dbThoughtData) : res.status(404).json({ message: thought404Message(params.id) }))
        .catch(err => res.status(500).json(err))
    },

    // delete thought 
    deleteOffers({ params }, res) {
        Offer.findOneAndDelete({ _id: params.id })
        .then(dbThoughtData =>  dbThoughtData ? res.json(thought200Message(dbThoughtData._id)) : res.status(404).json({ message: thought404Message(params.id) }))
        .catch(err => 
            {
                console.log(err)
                res.status(404).json(err)
            })
    },

    // add a reaction to thought
    createReaction({ params, body }, res) {
        Offer.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: { reactionBody: body.reactionBody, username: body.username} } },
            { new: true, runValidators: true })
        .then(dbThoughtData =>  dbThoughtData ? res.json(dbThoughtData) : res.status(404).json({ message: thought404Message(params.id) }))
        .catch(err => res.status(400).json(err))
    },

    // remove a reaction from thought
    removeReaction({ params }, res) {
        Offer.findOneAndUpdate({ _id: params.thoughtId}, { $pull: { reactions: { _id: params.reactionId} } }, { new: true})
        .then(dbThoughtData =>  dbThoughtData ? res.json(reaction200Message(params.thoughtId)) : res.status(404).json({ message: thought404Message(params.id) }))
        .catch(err => res.status(404).json(err))
    }
}

module.exports = offerController