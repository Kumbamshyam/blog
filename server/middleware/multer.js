const multer  = require('multer')

// set storeage
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads")
    },
    filename: function (req, img, cb) {
        let ext = img.originalname.substr(file.originalname.lastIndexOf("."))

        cb(null, img.filename + '-' + Date.now() + ext)
    }
})


store = multer({storage: storage});

module.exports = store