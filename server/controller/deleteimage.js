// app.post('/upload_file',
var gm = require('gm').subClass({ imageMagick: true });
const fs = require('fs')
const path = require('path');


exports.delete = async(req, res) =>{

    try {
        //    res.json(req.body)
        let src = req.body.src;
        console.log(src)

            let projectFolder = path.dirname(require.main.filename)
            console.log("superman 001")
            console.log(projectFolder)

            console.log("this is delete disk: " + src)

            fs.unlink(projectFolder + src, function (err) {
                console.log("this is delete disk: " + src)
                if (err) {
                    return res.json(err);
                }
                return res.json();
            });

    } catch (error) {
        console.log('image deleted' + error)

    }

}