const mongoose = require('mongoose');


const postschema = new mongoose.Schema({

    title: {
        type: 'string',
        required: true
    },
    description: {
        type: 'string',
        required: true
    },
    content:{
        type: 'string',
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const post = mongoose.model("POSTS", postschema);


module.exports = post;
