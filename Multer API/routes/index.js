var express = require('express');
var router = express.Router();
const multer = require("multer");
const Item = require('../model/image')
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/ee', function(req, res) {
  res.send('hello world')
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error("Incorrect file");
    error.code = "INCORRECT_FILETYPE";
    return cb(error, false)
  }
  cb(null, true);
}

const upload = multer({
  dest: './uploads',
  fileFilter,
  limits: {
    fileSize: 5000000
  }
});


router.post('/upload', upload.single('file'), (req, res) => {
  res.json({ file: req.file });
});

router.use((err, req, res, next) => {
  if (err.code === "INCORRECT_FILETYPE") {
    res.status(422).json({ error: 'Only images are allowed' });
    return;
  }
  if (err.code === "LIMIT_FILE_SIZE") {
    res.status(422).json({ error: 'Allow file size is 500KB' });
    return;
  }
});

router.post('/api/photo' ,function(req, res){
  var newItem = new Item();
  newItem.img.data = fs.readFileSync(req.files.userPhoto.path)
  newItem.img.contentType = 'image/png';
  newItem.save();
});

module.exports = router;
