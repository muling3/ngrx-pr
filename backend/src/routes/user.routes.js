const router = require("express").Router();
const authorize = require("../middlewares/authentication.middleware");

//importing handlers
const {
  registerUser,
  loginUser,
  deleteUser,
  updateUserPass,
} = require("../handlers/user.handlers");

//registering user
router.post("/register", authorize, registerUser);

//login user
router.post("/login", loginUser);

//deleteUser
router.delete("/:username", authorize, deleteUser);

// update user password
router.patch("/:username", authorize, updateUserPass);

//exporting router
module.exports = router;
