const postschema = require('../model/postschema');
require('../db/dbconnection')

exports.showposts = async (req, res) => {
    const posts = await postschema.find({})
    console.log(posts)
    res.render('home', {
        posts
    })
}