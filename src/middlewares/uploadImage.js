const multer = require('multer');

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, `${__dirname}/../uploads`),
  filename: (req, file, cb) => {
    // const ext = file.originalname.split('.').pop();
    cb(null, `${req.params.id}.jpeg`);
  },
});

const upload = multer({ storage });

module.exports = (field) => upload.single(field);