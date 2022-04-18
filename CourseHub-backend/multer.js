const multer = require('multer');
const { randomUUID } = require('crypto');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images')
    },
    filename: function (req, file, cb) {
        cb(null, randomUUID() + '-' + Date.now())
    }
});

exports.upload = multer({ storage: storage });