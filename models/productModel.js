const mongoose = require("mongoose")
const ObjectId=mongoose.Schema.Types.ObjectId
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true,
        trim: true
    },
    userId: {
        type: ObjectId,
        required:true
    },
    favourite: {
        type:Boolean,
        default:false
    },
    isDeleted: {
        type: Boolean,
        default:false
    }
}, { timestamps: true })

module.exports = mongoose.model("productlist", productSchema)