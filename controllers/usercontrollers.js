// CRUD for
const { User, Offer } = require("../models");
const bcrypt = require("bcrypt");
require("dotenv").config();
const user404Message = (id) => `User with ID: ${id} not found!`;
const user204Message = (id) => `User with ID: ${id} has been deleted!`;

const jwt = require("jsonwebtoken");

const userController = {
  // login route with end points api/users/
  getUser(req, res) {
    User.findOne({
      email: req.body.email,
    })
      .then((founduser) => {
        console.log("i am the found user", founduser);
        if (!founduser) {
          return res.status(401).json({ msg: " wrong email credentials" });
        } else if (!bcrypt.compareSync(req.body.password, founduser.password)) {
          return res.status(401).json({ msg: " wrong password credentials" });
        } else {
          const token = jwt.sign(
            {
              username: founduser.username,
              email: founduser.email,
              userId: founduser._id,
            },
            process.env.JWT_SECRET,
            { expiresIn: "2h" }
          );
          console.log("i am token:", token);
          return res.json({
            token: token,
            user: founduser,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ msg: "an error", err });
      });
  },

  // search users with searched skill
  userFilter(req, res) {
    const skill = req.params.skill;
    console.log("i am the entred skill", skill);
    User.aggregate([{ $match: { skillsKnown: skill } }])
      .then((userfound) => {
        console.log("i am the found users", userfound);
        res.json(userfound);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ msg: "an error", err });
      });
  },

  //creating user (api/user/)
  createUser(req, res) {
    User.create(req.body)
      .then((newuser) => {
        console.log("i am new user", newuser);
        const token = jwt.sign({ newuser }, process.env.JWT_SECRET, {
          expiresIn: "2h",
        });
        res.json({ user: newuser, token });
        console.log("i am token", token);
        console.log(newuser);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ msg: "an error", err });
      });
  },

  // api/users/ Getting all the users
  getAllUsers(req, res) {
    User.find({})
      .select("-__v") // ?
      .populate({ path: "offers" })
      .populate({ path: "friends", select: "-__v" })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // get one user by ID
  getUserById(req, res) {
    const token = req.headers.authorization?.split(" ")[1];
    const data = jwt.verify(token, process.env.JWT_SECRET);

    if (data.userId !== req.params.id) {
      console.log(
        `User with ID: ${data.userId} is accessing user with ID ${req.params.id}'s profile `
      );
    }
    User.findOne({ _id: req.params.id })
      .populate({ path: "friends", select: "-__v" })
      .populate({ path: "offers", select: "-__v" })
      .select("-__v")
      .then((dbUserData) => {
        const isUser = data.userId === req.params.id;

        const returnedData = {
          username: dbUserData.username,
          profilepic: dbUserData.profilepic,
          aboutme: dbUserData.aboutme,
          skillsKnown: dbUserData.skillsKnown,
          skillsUnknown: dbUserData.skillsUnknown,
          isUser: isUser,
        };

        if (isUser) {
          // add offers
          returnedData.offers = dbUserData.offers;
        }

        dbUserData
          ? res.json(returnedData)
          : res.status(404).json({ message: user404Message(req.id) });
      })
      .catch((err) => {
        console.log(err);
        res.status(404).json(err);
      });
  },

  // update user info
  updateUser(req, res) {
    const token = req.headers.authorization?.split(" ")[1];
    try {
      const data = jwt.verify(token, process.env.JWT_SECRET);
      if (data.userId !== req.params.id) {
        return res.status(403).json({ message: "wrong jwt" });
      }
      User.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
      })
        .then((dbUserData) =>
          dbUserData
            ? res.json(dbUserData)
            : res.status(404).json({ message: user404Message(params.id) })
        )
        .catch((err) => res.status(400).json(err));
    } catch (err) {
      console.log(err);
      res.status(404).json(err);
    }
  },

  // delete user
  deleteUser(req, res) {
    const token = req.headers.authorization?.split(" ")[1];
    try {
      const data = jwt.verify(token, process.env.JWT_SECRET);
      if (data.userId !== req.params.id) {
        return res.status(403).json({ message: "wrong jwt" });
      }
      User.findOneAndDelete({ _id: req.params.id }).then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: user404Message(req.id) });
        }
        Offer.deleteMany({ username: dbUserData.username }).then(
          (deletedData) =>
            deletedData
              ? res.json({ message: user204Message(req.id) })
              : res.status(404).json({ message: user404Message(req.id) })
        );
      });
    } catch (err) {
      console.log(err);
      res.status(404).json(err);
    }
  },

  // add a friend to user
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $push: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(400).json(err));
  },

  // remove a friend from user
  removeFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } }
    )
      .then((dbUserData) =>
        res.status(200).json(user204Message(params.friendId, "User"))
      )
      .catch((err) => res.json(err));
  },
};

module.exports = userController;
