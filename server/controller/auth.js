const User = require("../model/User")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
// POST /api/auth/signup
// sign user in
exports.signup = async (req,res,next) => {
    const expiresIn = 86400 
    const {firstName, lastName , email, password} = req.body
    try{
        const user = await User({
            firstName,
            lastName,
            email,
            password
        })
        await user.save()
        const token = jwt.sign({id: user._id.toString()}, "thisisasupersecret", {expiresIn})
        res.status(201).json({
            msg: "user created",
            user,
            token,
            expiresIn
        })

    }
    catch(e) {
        if(!e.statusCode) {
            e.statusCode = 500
            }
         next(e);  
    }
}
// POST /api/auth/login
// log user in
exports.login = async (req,res, next) => {
    const expiresIn = 86400
    const {email, password} = req.body
    try{
        // find user
        const user = await User.findOne({email})
        console.log(user)
        if(!user) {
            throw new Error("login is incoorect")
        }
        const checkPassword = await bcrypt.compareSync(password, user.password)
        if(!checkPassword) {
           res.status(401).json({
               token: false,
               auth: false
           })
        }
        else{
            const token = jwt.sign({id: user._id.toString()}, "thisisasupersecret", { expiresIn})
            res.status(200).json({
                id: user._id,
                email: user.email,
                name: `${user.firstName} ${user.lastName}`,
                token,
                auth: true,
                expiresIn
            }) 
        }

    }
    catch(e) {
        if(!e.statusCode) {
            e.statusCode = 500
            } 
            next(e)
    }
}

// GET /api/auth/checkEmail/:email
// check email has not been used 
exports.checkEmail = async (req,res, next) => {
    const email = req.params.email
    try{
        const emailCheck = await User.findOne({email})
        const emailUsed = emailCheck ? true : false
        res.status(200).json({email: emailCheck, emailUsed})
    }
    catch(e) {
        if(!e.statusCode) {
            e.statusCode = 500
            } 
            next(e)
    }
}