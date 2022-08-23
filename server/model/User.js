const {Schema, model} = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcrypt")

const userSchema = new Schema({
    firstName:{
        type: String,
        required: true,
        trim: true
    },
    lastName:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error("email is incorrect")
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6,
        validate(value) {
            if(value == "password") {
                throw new Error("password can't be set to password")
            }
        }
    }

})
userSchema.pre("save", async function(next) {
        this.password = await bcrypt.hash(this.password, 12)
        next()
})
module.exports = model("User", userSchema)