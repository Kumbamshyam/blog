const postschema = require('../model/postschema');
require('../db/dbconnection')

exports.adminshowposts = async (req, res) => {
    const posts = await postschema.find({})
    console.log(posts)  
    res.render('/admin/adminshowpost', {
        posts
    })
}