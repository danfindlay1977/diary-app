const jwt = require("jsonwebtoken")
// check if incoming request has a vaild JWT token 
const checkAuth = (req,res,next) => {
    try{
    const token = req.header("Authorization").split(" ")[1]
    const decoded = jwt.verify(token, "thisisasupersecret")
    if(!decoded) {
        throw new Error()
    }
    req.userId = decoded.id
    next()
    }
    catch(e) {
        res.status(401).json({msg: "auth failed", auth: false })
    }
}
module.exports = checkAuth