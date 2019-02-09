var express = require('express');
var router = express.Router();
var Contents = require('../models/Contents.js');
var multer = require('multer');
var maxSize = 1024 * 1024;

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, './coverimg/');
    },
    filename(req, file, callback) {
        callback(null, Date.now() + '-' + file.originalname);
        
    }
});
const upload = multer({ 
    storage: storage, 
    limits : { fileSize : maxSize },
    fileFilter : function (req, file, callback) {
      if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/bmp') {
          req.fileValidationError = 'wrong mimetype';
          return callback(null, false, new Error('wrong mimetype'));
      }
      callback(null, true);
    }
}).single('coverImg')

/* GET ALL Contents */
router.get('/', (req, res, next) => {
  Contents.find((err, contents) => {
    if (err) return next(err);
    res.json(contents);
  });
});

/* SAVE Contents */
router.post('/create', upload, (req, res, next) => {
  Contents.create({...req.body, imageUrl: req.file.path}, (err, post) => {
    console.log(req);
    if (err) return next(err);
    upload(req, res, () => {
      if(req.fileValidationError)
          return res.send(req.fileValidationError);
      else
          return res.send('/coverimg/' + req.file.filename);
    });
  });
});

module.exports = router;