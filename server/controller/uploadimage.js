// app.post('/upload_file',
var gm = require('gm').subClass({ imageMagick: true });
var FroalaEditor = require('wysiwyg-editor-node-sdk/lib/froalaEditor');
require('fs')

exports.upload = async(req, res) =>  {


    try {

        // Store file.
        FroalaEditor.Image.upload(req, '/public/uploads/images/', function (err, data) {
            console.log("image working")
            // Return data.
            if (err) {
                return res.send(JSON.stringify(err));
            }

            res.send(data);
        });
    } catch (error) {
        console.log("upload file Error: " + error)
    }

};


