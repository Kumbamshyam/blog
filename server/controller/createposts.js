const postschema = require('../model/postschema');
require('../db/dbconnection')


exports.posts =  async (req, res) => {

    const { posters, title, description, content } = req.body
    console.log(posters, title, description, content)

    try {

        const postdata = new postschema({posters, title, description, content })

        await postdata.save()

        console.log("data has recieved successfully")

        res.redirect('/')

    } catch (err) {
        console.log(`post error ${err}`)
    }

}