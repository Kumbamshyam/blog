const postschema = require('../model/postschema');
require('../db/dbconnection')

exports.articles = async (req, res) => {
    const post = await postschema.findById(req.params.id)
    console.log(post)
    res.render('Articles', {
        post
    })
}