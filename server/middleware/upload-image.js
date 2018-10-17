const multerImages = require('multer');
const path = require('path');

const fileFilter = (req, file, next) => {
    const isMimeTypeSupported = /jpeg|jpg|png|gif/.test(file.mimetype);
    const isExtensionValid = /jpeg|jpg|png|gif/.test(path.extname(file.originalname).toLowerCase());
    if (isMimeTypeSupported && isExtensionValid) return next(null, true);
    const error = new Error('File type not supported.');
    error.status = 400;
    next(error);
};

const storage = multerImages.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${req.params.id}-${file.originalname}`);
    },
});

const upload = multerImages({
    storage,
    fileFilter,
});

module.exports = upload;