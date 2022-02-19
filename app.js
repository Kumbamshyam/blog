const express = require('express');
const app = express();
const dotenv = require("dotenv")
const port = 80;
const path = require('path');
const bodyParser = require('body-parser')
var gm = require('gm').subClass({ imageMagick: true });
var fs = require('fs');
var FroalaEditor = require('wysiwyg-editor-node-sdk/lib/froalaEditor');



// importing controller
const uploadimage = require('./server/controller/uploadimage')
const deleteimage = require('./server/controller/deleteimage')



// middlewares
require('./server/middleware/multer')
dotenv.config({ path: './config.env' })

// database connection
require('./server/db/dbconnection')

// accessing router folder
app.use(require('./server/router/auth'))


// accessing or adding static files to server 

app.use(express.static(__dirname + '/'));
const staticpath = path.join(__dirname, 'public');
app.use(express.static(staticpath));


app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/*+json' }))
let urlencodedParser = bodyParser.urlencoded({ extended: false })


// template engine 
app.set('view engine', 'ejs');


// routers
app.get('/', (req, res) => {
    res.status(200).render('home');
})

app.get('/posts/new', (req, res) => {
    res.status(200).render('create')
})

app.get('/Articles', (req, res) => {
    res.status(200).render('Articles');
})
app.get('/login', (req, res) => {
    res.status(200).render('login');
})
app.get('/registration', (req, res) => {
    res.status(200).render('registration');
})

app.get('/404', (req, res) => {
    res.status(200).render('404')
})




// route images 
app.post('/upload_image', uploadimage.upload)
app.post('/delete_image', urlencodedParser, deleteimage.delete);




























// file upload
app.post('/upload_file', async function (req, res) {


    try {

        // Store file.
        FroalaEditor.File.upload(req, '/public/uploads/doc', function (err, data) {
            // Return data.
            if (err) {
                return res.send(JSON.stringify(err));
            }

            res.send(data);
        });
    } catch (error) {
        console.log("upload file Error: " + error)
    }

});




app.post('/upload_video', function (req, res) {
    
    FroalaEditor.Video.upload(req, '/public/uploads/videos/', function (err, data) {

        if (err) {
            return res.send(JSON.stringify(err));
        }
        res.send(data);
    });
});

app.post('/upload_image_resize', function (req, res) {

    var options = {
        resize: [300, 300]
    }
    FroalaEditor.Image.upload(req, '/public/uploads/images/', options, function (err, data) {

        if (err) {
            return res.send(JSON.stringify(err));
        }
        res.send(data);
    });
});

app.post('/upload_image_validation', function (req, res) {

    var options = {
        fieldname: 'myImage',
        validation: function (filePath, mimetype, callback) {

            gm(filePath).size(function (err, value) {

                if (err) {
                    return callback(err);
                }

                if (!value) {
                    return callback('Error occurred.');
                }

                if (value.width != value.height) {
                    return callback(null, false);
                }
                return callback(null, true);
            });
        }
    }

    FroalaEditor.Image.upload(req, '/uploads/', options, function (err, data) {

        if (err) {
            return res.send(JSON.stringify(err));
        }
        res.send(data);
    });
});

app.post('/upload_file', function (req, res) {

    var options = {
        validation: null
    }

    FroalaEditor.File.upload(req, '/public/uploads/doc/', options, function (err, data) {

        if (err) {
            return res.status(404).end(JSON.stringify(err));
        }
        res.send(data);
    });
});

app.post('/upload_file_validation', function (req, res) {

    var options = {
        fieldname: 'myFile',
        validation: function (filePath, mimetype, callback) {

            fs.stat(filePath, function (err, stat) {

                if (err) {
                    return callback(err);
                }

                if (stat.size > 10 * 1024 * 1024) { // > 10M
                    return callback(null, false);
                }

                return callback(null, true);

            });
        }
    }

    FroalaEditor.File.upload(req, '/uploads/', options, function (err, data) {

        if (err) {
            return res.status(404).end(JSON.stringify(err));
        }
        res.send(data);
    });
});




app.post('/delete_video', function (req, res) {

    FroalaEditor.Video.delete(req.body.src, function (err) {

        if (err) {
            return res.status(404).end(JSON.stringify(err));
        }
        return res.end();
    });
});

app.post('/delete_file', function (req, res) {



    FroalaEditor.File.delete(req.body.src, function (err) {

        if (err) {
            return res.status(404).end(JSON.stringify(err));
        }
        return res.end();
    });
});

app.get('/load_images', function (req, res) {

    FroalaEditor.Image.list('/uploads/', function (err, data) {

        if (err) {
            return res.status(404).end(JSON.stringify(err));
        }
        return res.send(data);
    });
});



app.use((req, res) => {
    res.redirect('/404')
})





console.log("working 001")










app.listen(port, () => {
    console.log(`application had started successfully on port ${port}`)
});