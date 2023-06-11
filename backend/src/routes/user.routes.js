const router = require("express").Router()

//importing handlers
const { registerUser, loginUser, deleteUser, updateUserPass } = require("../handlers/user.handlers")

//registering user
router.post("/register", registerUser)

//login user
router.post("/login", loginUser)

//deleteUser
router.delete("/:id", deleteUser)

// update user password
router.patch("/:id", updateUserPass)

//exporting router
module.exports = router