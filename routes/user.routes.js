const express = require('express');
const router = express.Router();
const { signUpValidation, loginValidation, forgotValidation, updateProfileValidation } = require('../helper/validation');
const userController = require("../controller/user.controller");
const path = require('path');
const multer = require('multer');
const auth = require("../middleware/auth")

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '../public/images'));
    },
    filename: function(req, file, cb) {
        const name = Date.now() + '-' + file.originalname;
        cb(null, name);
    }
});

const filefilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    fileFilter: filefilter,
});


router.post("/register", upload.single('image'), signUpValidation, userController.register);
router.post("/excel", userController.createEmployeeFromExcel);
router.get("/get_employees", userController.getEmployees);
router.post("/login", loginValidation, userController.login);
router.get('/get-token', userController.getSessionData);
router.get('/get-user', auth.isAuthorize, userController.getUser);
router.post('/forgot-password', forgotValidation, userController.forgotPassword);
router.put('/update_profile', upload.single('image'), updateProfileValidation, auth.isAuthorize, userController.updateProfile);
router.post('/logout', userController.logout);
router.delete('/delete_profile', auth.isAuthorize, userController.deleteProfile);

module.exports = router;

// const express = require('express');
// const router = express.Router();
// const { signUpValidation, loginValidation, forgotValidation, updateProfileValidation } = require('../helper/validation');
// const userController = require("../controller/user.controller");
// const path = require('path');
// const multer = require('multer');
// const auth = require("../middleware/auth")

// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, path.join(__dirname, '../public/images'));
//     },
//     filename: function(req, file, cb) {
//         const name = Date.now() + '-' + file.originalname;
//         cb(null, name);
//     }
// });

// const filefilter = (req, file, cb) => {
//     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//         cb(null, true);
//     } else {
//         cb(new Error('Invalid file type. Only JPEG and PNG are allowed.'), false);
//     }
// }

// const upload = multer({ 
//     storage: storage,
//     fileFilter: filefilter,
//     limits: {
//         fileSize: 5 * 1024 * 1024 // 5MB limit
//     }
// }).single('image');

// // Wrapper function to handle Multer errors
// const handleUpload = (req, res, next) => {
//     upload(req, res, function(err) {
//         if (err instanceof multer.MulterError) {
//             return res.status(400).json({
//                 status: false,
//                 message: `Upload error: ${err.message}`
//             });
//         } else if (err) {
//             return res.status(400).json({
//                 status: false,
//                 message: err.message
//             });
//         }
//         next();
//     });
// };

// router.post("/register", handleUpload, signUpValidation, userController.register);
// router.post("/login", loginValidation, userController.login);
// router.get('/get-user', auth.isAuthorize, userController.getUser);
// router.post('/forgot-password', forgotValidation, userController.forgotPassword);
// router.post('/update_profile', handleUpload, updateProfileValidation, auth.isAuthorize, userController.updateProfile);

// module.exports = router;