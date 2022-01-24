const multer = require('multer');
const diskStorage = multer.diskStorage(
    {
        destination: (req, file, callback) => {
            callback(null, 'images');
        },
        filename: (req, file, callback) => {
            var mimeType = file.mimetype.split('/');
            var fileType = mimeType[1];
            var filename = file.originalname + '.' + fileType;

            callback(null, filename);
        }
    }
);

const fileFilter = (req, file, callback) => {
    var allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
    allowedMimeTypes.includes(file.mimetype) ? callback(null, true) : callback(null, false);
}

const storage = multer({storage: diskStorage, fileFilter: fileFilter}).single('image');

module.exports = storage;