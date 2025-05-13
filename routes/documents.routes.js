const documentController = require("../controller/document.controller");
const express = require("express");
const router = express.Router();
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, `../public/documents`));
    } ,
    filename: function(req, file, cb){
        const name = Date.now() + '-' + file.originalname ;
        cb(null , name);
    }
});

const filefilter = (req , file , cb) => {
    if (
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/png' ||
        file.mimetype === 'application/pdf' ||
        file.mimetype === 'application/msword' ||
        file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        file.mimetype === 'application/vnd.ms-excel' ||
        file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ) {
        cb(null, true);
      } else {
        cb(new Error('Unsupported file type'), false);
      }
      
}

const upload = multer({ 
    storage: storage,
    fileFilter: filefilter,
});

// router.post("/upload", upload.single('document'), (req, res) => {
//     const file = req.file;
//     if (!file) {
//         return res.status(400).json({ error: 'No file uploaded' });
//     }
//     res.status(200).json({ message: 'File uploaded successfully', file: file });
// });

// Create a new document
router.post("/", upload.single('document') , documentController.create);

// Get all documents
router.get("/", documentController.findAll);

// Get document by ID
router.get("/:id", documentController.findOne);

// Get all documents by Lead ID
router.get("/lead/:leadId", documentController.findByLeadId);

// Get all documents by Followup ID (if implemented)
router.get("/followup/:followupId", documentController.findByFollowupId);

// Search document by file name within the same Lead
router.get("/lead/:leadId/search/:fileName", documentController.searchByFileNameInLead);

// Update a document by ID
router.put("/:id",  upload.single('document') , documentController.update);

// Delete a document by ID
router.delete("/:id", documentController.delete);

module.exports = router;
