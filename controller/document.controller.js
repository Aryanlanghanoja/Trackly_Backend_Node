// const document_service = require("../service/documents.service");

// exports.create = (req, res, next) => {
//     document_service
//         .create(req.body , req.file.fileName)
//         .then((response) =>
//             res.status(200).send({
//                 message: typeof response === "string" ? "Error" : "Success",
//                 data: response,
//             })
//         )
//         .catch(next);
// };

// exports.findAll = (req, res, next) => {
//     document_service
//         .getAll()
//         .then((response) =>
//             res.status(200).send({
//                 message: typeof response === "string" ? "Error" : "Success",
//                 data: response,
//             })
//         )
//         .catch(next);
// };

// exports.findOne = (req, res, next) => {
//     document_service
//         .getById(req.params.id)
//         .then((response) =>
//             res.status(200).send({
//                 message: typeof response === "string" ? "Error" : "Success",
//                 data: response,
//             })
//         )
//         .catch(next);
// };

// exports.update = (req, res, next) => {
//     document_service
//         .update(req.params.id, req.body)
//         .then((response) =>
//             res.status(200).send({
//                 message: typeof response === "string" ? "Error" : "Success",
//                 data: response,
//             })
//         )
//         .catch(next);
// };

// exports.delete = (req, res, next) => {
//     document_service
//         .deleteByID(req.params.id)
//         .then((response) =>
//             res.status(200).send({
//                 message: "Success",
//                 data: response,
//             })
//         )
//         .catch(next);
// };

// exports.findByLeadId = (req, res, next) => {
//     document_service
//         .getByLeadId(req.params.leadId)
//         .then((response) =>
//             res.status(200).send({
//                 message: typeof response === "string" ? "Error" : "Success",
//                 data: response,
//             })
//         )
//         .catch(next);
// };

// exports.findByFollowupId = (req, res, next) => {
//     document_service
//         .getByFollowupId(req.params.followupId)
//         .then((response) =>
//             res.status(200).send({
//                 message: typeof response === "string" ? "Error" : "Success",
//                 data: response,
//             })
//         )
//         .catch(next);
// };

// exports.searchByFileNameInLead = (req, res, next) => {
//     const { leadId, fileName } = req.params;

//     document_service
//         .searchByFileNameInLead(leadId, fileName)
//         .then((response) =>
//             res.status(200).send({
//                 message: typeof response === "string" ? "Error" : "Success",
//                 data: response,
//             })
//         )
//         .catch(next);
// };

const document_service = require("../service/documents.service");

exports.create = async (req, res) => {
    console.log(req.body);
    console.log(req.file);
    try {
        const document = await document_service.create(req.body, req.file.filename);
        return res.status(201).json({
            message: "Document Created Successfully",
            data: document,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message || "Failed to create document",
        });
    }
};

exports.download = async (req, res) => {
    try {
        const document = await document_service.download(req.params.id);
        if (!document) {
            return res.status(404).json({ message: "Document not found" });
        }
        const filePath = path.join(__dirname, "..", "public", document.doc_path);
        const fileName = document.doc_name;
        res.download(filePath, fileName); 
    } 

    catch (error) {
        return res.status(500).json({
            message: error.message || "Failed to download document",
        }); 
    }
}

exports.findAll = async (req, res) => {
    try {
        const documents = await document_service.getAll();
        return res.status(200).json({
            message: "Documents fetched successfully",
            data: documents,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Failed to fetch documents",
        });
    }
};

exports.findOne = async (req, res) => {
    try {
        const document = await document_service.getById(req.params.id);
        if (!document) {
            return res.status(404).json({ message: "Document not found" });
        }
        return res.status(200).json({
            message: "Document fetched successfully",
            data: document,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Failed to fetch document",
        });
    }
};

exports.update = async (req, res) => {
    try {
        const updated = await document_service.update(req.params.id, req.body , req.file);
        return res.status(200).json({
            message: "Document updated successfully",
            data: updated,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: error.message || "Failed to update document",
        });
    }
};

exports
exports.delete = async (req, res) => {
    try {
        await document_service.deleteByID(req.params.id);
        return res.status(200).json({
            message: "Document deleted successfully",
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message || "Failed to delete document",
        });
    }
};

exports.findByLeadId = async (req, res) => {
    try {
        const docs = await document_service.getByLeadId(req.params.leadId);
        return res.status(200).json({
            message: "Documents by lead ID fetched successfully",
            data: docs,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Failed to fetch documents by lead ID",
        });
    }
};

exports.findByFollowupId = async (req, res) => {
    try {
        const docs = await document_service.getByFollowupId(req.params.followupId);
        return res.status(200).json({
            message: "Documents by follow-up ID fetched successfully",
            data: docs,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Failed to fetch documents by follow-up ID",
        });
    }
};

exports.searchByFileNameInLead = async (req, res) => {
    try {
        const { leadId, fileName } = req.params;
        const results = await document_service.searchByFileNameInLead(leadId, fileName);
        return res.status(200).json({
            message: "Search by file name successful",
            data: results,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message || "Failed to search document by file name",
        });
    }
};
