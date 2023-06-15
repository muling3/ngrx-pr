const jwt = require("jsonwebtoken");

const dbHelpers = require("../helpers/db.helpers");

// register user
const registerUser = async (req, res) => {
  const { name, username, email, password } = req.body;

  if (!name || !username || !email || !password) {
    res.status(400).json({ message: "All input fields are required" });
    return;
  }

  // check if username already exists
  const user = await dbHelpers.getUser({ username });
  if (user) {
    res.status(409).json({ message: "Username already exists" });
    return;
  }

  const id = await dbHelpers.createUser(req.body);
  res.status(201).json({ message: "User created successfully: Id -> " + id });
};

// login user
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: "Username and Password fields are required" });
    return;
  }

  const success = await dbHelpers.checkUserCredentials(req.body);

  console.log(success);

  //create jwt token
  // 1. payload
  const payload = {
    iss: "localhost",
    username,
  };

  // signing the token
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "5m" });

  if (success)
    res.status(200).json({ token, message: "User logged in successfully" });
  else res.status(400).json({ message: "Invalid credentials" });
};

// delete user
const deleteUser = async (req, res) => {
  const { username } = req.params;

  if (!id) {
    res.status(400).json({ message: "Username must be provided" });
    return;
  }

  //check if that user exists
  const user = await dbHelpers.getUser({ username });
  if (!user) {
    res
      .status(404)
      .json({ message: "User does not exist. Confirm username first" });
    return;
  }

  const success = await dbHelpers.deleteUser({ username });

  if (success) res.status(200).json({ message: "User deleted successfully" });
  else res.status(400).json({ message: "Error deleting user" });
};

// update user pass
const updateUserPass = async (req, res) => {
  const { username } = req.params;

  //ensure username was provided
  if (!username) {
    res.status(400).json({ message: "Username must be provided" });
    return;
  }

  // ensure request body is not null
  if (Object.entries(req.body) < 1) {
    res.status(400).json({ message: "Body can't be empty" });
    return;
  }

  //check if that user exists
  const user = await dbHelpers.getUser({ username });
  if (!user) {
    res
      .status(404)
      .json({ message: "User does not exist. Confirm username first" });
    return;
  }

  //update the user pass
  const success = await dbHelpers.changeUserPass(username, req.body);

  if (success) res.status(200).json({ message: "User deleted successfully" });
  else res.status(400).json({ message: "Error deleting user" });
};

module.exports = { registerUser, loginUser, deleteUser, updateUserPass };
