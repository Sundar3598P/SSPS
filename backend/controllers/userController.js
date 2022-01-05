import asyncHandler from 'express-async-handler';
import  generateToken from '../utils/generateToken.js'

import User from '../models/userModel.js'



const authUser = asyncHandler( async (req, res) => {
    const { email, password } = req.body 
    res.send({email, password})

    const user = await User.findOne({ email})

    if (user && await (user.matchPassword(password))) {
        res.json({ 
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)  // unauthorized
        throw new Error('Invalid email or password')
    }

})

const getUserProfile = asyncHandler( async (req, res)=> {
    // res.send('sucess')
    const user = await User.findById(req.user_id)

    if(user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(404)
        throw new Error ('User Not Found')
    }
})


//@desc Update User Profile
//@route PUT /api/users/profile 
//@access Private 
const updateUserProfile = asyncHandler( async (req, res)=> {
    // res.send('sucess')
    const user = await User.findById(req.user_id)

    if(user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email

        if(req.body.password) {
            user.password = req.body.password
        }

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)
        })
        



    } else {
        res.status(404)
        throw new Error ('User Not Found')
    }
})


// @desc Auth user & get taken
// @route POST /api/users/login
//@access private 

const registerUser = asyncHandler( async (req, res) => {
    const { name, email, password } = req.body

    const userExists = await User.findOne({ email })

    if(userExists) {
        res.status(400)  //bad request
        throw new Error ('User already exists') 
    }

    const user = await User.create({ 
        name,
        email, 
        password 
    })

    if(user) {
        res.status(201).json({ 
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error ('Invalid User Data')
    }
})

export { authUser, getUserProfile, registerUser, updateUserProfile }