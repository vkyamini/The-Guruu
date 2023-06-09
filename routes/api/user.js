const router = require("express").Router();
const {
  getUser, //(api/users/login) - have to create the route and do JWT token
  getAllUsers, //(api/users)
  createUser, //(api/users)
  getUserById, //(api/users/:id)
  updateUser, //(api/users/:id)
  deleteUser, //(api/users/:id)
  addFriend, //(api/users/:userId/friends/:friendId)
  removeFriend, //(api/users/:userId/friends/:friendId)
  userFilter, //(api/user/skills/:skill)
  locationskillFilter, //(/location/:location/skill/:skill)
  locationuserfilter,//(api/users/location/:location)
  userunknownFilter, //(api/user/unknownskills/:skill)
} = require("../../controllers/usercontrollers");

// login for the user
router.route("/login").post(getUser);

// get users by particular  skill
router.route("/skills/:skill").get(userFilter);
router.route("/unknownskills/:skill").get(userunknownFilter)
router.route("/location/:location/skill/:skill").get(locationskillFilter)
router.route("/location/:location").get(locationuserfilter)

router.route("/").get(getAllUsers).post(createUser);

router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);

module.exports = router;
