const { createToken } = require("../helpers/jwt.helper");

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
    res
      .status(400)
      .json({ message: "Username and Password fields are required" });
    return;
  }

  const success = await dbHelpers.checkUserCredentials(req.body);

  //create jwt token
  const payload = {
    iss: "localhost",
    username,
  };

  const opts = {
    expiresIn: "5m",
  };

  // signing the token
  const token = createToken(payload, opts);

  //register username and token in cookies
  res.cookie("username-token", JSON.stringify({ username, token }), {
    domain: "localhost:4000",
    httpOnly: true,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // current time + 24 hrs or [ maxAge: 20 * 1000 ]
    secure: true,
  });

  if (success)
    res.status(200).json({ token, message: "User logged in successfully" });
  else res.status(400).json({ message: "Invalid credentials" });
};

// delete user
const deleteUser = async (req, res) => {
  const { username } = req.params;

  if (!username) {
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

  if (success) res.status(200).json({ message: "User updated successfully" });
  else res.status(400).json({ message: "Error updating user" });
};

module.exports = { registerUser, loginUser, deleteUser, updateUserPass };
