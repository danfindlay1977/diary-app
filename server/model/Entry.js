const {Schema, model} = require("mongoose")


const entrySchema = new Schema({
    title:{
        type: String,
        required: true
    },
    topic: {
        type: String,
        required:true
    },
    entry: {
        type: String,
        required: true
    },
    wordCount: {
        type: Number,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
},{timestamps: true})

module.exports = model("Entry", entrySchema)