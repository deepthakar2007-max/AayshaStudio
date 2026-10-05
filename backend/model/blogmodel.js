const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: null
    },

    description: {
        type: String,
        required: true
    },
    Addresh: {
        type: String,
        required: true
    },
    PhoneNumber: {
        type: String,
        required: true
    },

    author: {
        type: String,

    }
})

const blog = mongoose.model("blogs", blogSchema);
module.exports = blog