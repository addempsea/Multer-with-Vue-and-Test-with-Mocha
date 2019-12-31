var express = require('express');
var router = express.Router();
let multer = require('multer');
let Model = require('../model/imagee');
let imgPort = 'http://localhost:5000';


const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error("Incorrect file");
    error.code = "INCORRECT_FILETYPE";
    return cb(error, false)
  }
  cb(null, true);
}


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },


  filename: (req, file, cb) => {
    console.log(file);
    var filetype = '';
    if (file.mimetype === 'image/gif') {
      filetype = 'gif';
    }
    if (file.mimetype === 'image/png') {
      filetype = 'png';
    }
    if (file.mimetype === 'image/jpeg') {
      filetype = 'jpg';
    }
    cb(null, 'image-' + Date.now() + '.' + filetype);
  }
})

var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },

  fileFilter: fileFilter
});

router.post('/file', upload.single('file'), async (req, res) => {
  try {
    const image = imgPort + '/images/' + req.file.filename

    let file = new Model({
      image
    });

    if (!file) { return res.status(403).send('not found file') }
    let data = await file.save();
    console.log(data);
    res.status(201).json({
      message: 'file uploaded',
      data: data,
      fileUrl: req.file.filename
    });
  }

  catch (ex) {
    res.send(ex.message);
  }
})

router.get('/demo', async (req, res, next) => {
  try {
    const data = await Model.find({}).sort({ createdAt: -1 });
    if (!data) {
      return res.status(404).json({
        message: "No item found"
      });
    } else {
      return res.status(200).json({ data })
    }

  } catch (err) {
    return next(err)
  }

})

module.exports = router;
