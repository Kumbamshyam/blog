const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser')
const path = require('path');

// database
require('../db/dbconnection')


// adding or accessing static files
const staticpath = path.join(__dirname, 'public');
router.use(express.static(staticpath));


router.use(bodyParser.json());
router.use(bodyParser.json({ type: 'application/*+json' }))
let urlencodedParser = bodyParser.urlencoded({ extended: false })


// controllers
const registration_controller = require("../controller/registration")
const login_controller = require("../controller/login")
const createposts_controller = require("../controller/createposts")
const showposts_controller = require("../controller/showposts")
const adminshowposts_controller = require("../controller/adminshowpost")
const articles_controller = require("../controller/artciles")



// routers
router.post('/registration', urlencodedParser, registration_controller.registration)
router.post('/login', urlencodedParser, login_controller.login)
router.post('/admin/posts', urlencodedParser, createposts_controller.posts)
router.get('/', urlencodedParser, showposts_controller.showposts)
router.get('/post/:id',urlencodedParser, articles_controller.articles );


// admin router
router.get('/admin', urlencodedParser, adminshowposts_controller.adminshowposts)
// router.get('/admin', urlencodedParser, adminshowposts_controller.adminshowposts)

router.get('/admin/posts/create', function (req, res) {
    res.render('create')
})

// router.get('/admin', function(req, res){
//     res.redirect('admin/adminshowpost')
// })



module.exports = router;

