const postschema = require('../model/postschema');
require('../db/dbconnection')


exports.posts =  async (req, res) => {

    const { title, description, content } = req.body
    console.log(req.body)

    try {

        const postdata = new postschema({ title, description, content })

        await postdata.save()

        // console.log(req.body)

        res.redirect('/')

    } catch (err) {
        console.log(`post error ${err}`)
    }

}