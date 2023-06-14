const User = require("../models/user.model")

// creating a user
const createUser = async(body) => {
    const created = await User.create({...body})

    return created._id
}

// get a user
const getUser = async(props) => {
    try {
        const user = await User.find({...props})
        return user
    } catch (error) {
        return null
    }
}

// userCredentialsMatches
const checkUserCredentials = async(props) => {
    try {        
        await User.find({...props}) 
        return true
    } catch (error) {
        return false
    }
}

//delete user
const deleteUser = async(props) => {
    try {
        await User.deleteById(props)
        return true
    } catch (error) {
        return false
    }
}

//delete user
const changeUserPass = async(id, props) => {
    try {
        await User.findByIdAndUpdate(id, { $set: props})
        return true
    } catch (error) {
        return false
    }
}

module.exports = { createUser, getUser, deleteUser, checkUserCredentials }