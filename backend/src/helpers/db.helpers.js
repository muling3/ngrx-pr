const User = require("../models/user.model");

// creating a user
const createUser = async (body) => {
  const created = await User.create({ ...body });

  return created._id;
};

// get a user
const getUser = async (props) => {
  try {
    const user = await User.find({ ...props });
    console.log("user got", user)
    return user;
  } catch (error) {
    return null;
  }
};

// userCredentialsMatches
const checkUserCredentials = async (props) => {
  try {
    const found = await User.find({ ...props });
    if (found.length == 0) throw new Error("User not found");
    return true;
  } catch (error) {
    return false;
  }
};

//delete user
const deleteUser = async (props) => {
  try {
    await User.deleteOne(props);
    return true;
  } catch (error) {
    return false;
  }
};

//delete user
const changeUserPass = async (username, props) => {
  try {
    await User.updateOne({ username }, { $set: props });
    return true;
  } catch (error) {
    return false;
  }
};

module.exports = {
  createUser,
  getUser,
  deleteUser,
  checkUserCredentials,
  changeUserPass,
};
