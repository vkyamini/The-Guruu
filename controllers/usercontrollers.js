const { User, } = require('../models/')


const userController = {

// add a new user 
createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
    },
    // get all users 
    getAllUsers(req, res) {
        User.find({})
        // .populate({ path: 'thoughts', select: '-__v'})
        // .populate({ path: 'friends', select: '-__v'})
      .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(500).json(err))
    },
}

module.exports = userController