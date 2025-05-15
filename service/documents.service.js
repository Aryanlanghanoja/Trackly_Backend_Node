const db = require("../helper/db.helper");
const Document = db.document ;
const path = require("path");
const fs = require("fs");
const { Op } = require("sequelize");

module.exports = {
    getAll,
    getById,
    downloadDocument,
    create,
    update,
    deleteByID,
    getByLeadId,
    getByFollowupId,
    searchByFileNameInLead 
};

// Get all documents
async function getAll() {
    return await Document.findAll();
}

// Get document by primary key ID
async function getById(id) {
    const document = await Document.findByPk(id);
    if (!document) return "Document not found";
    return document;
}

// Download document 
async function downloadDocument(id) {
    const document = await Document.findByPk(id);
    if (!document) return "Document not found";
    return document.doc_path;
}

// Create a new document
async function create(params , filename) {
    const doc = new Document({
        lead_id : params.lead_id,
        doc_path : `documents/${filename}` ,
        doc_name : params.doc_name,
        doc_desc : params.doc_desc,
    });
    await doc.save();
    return doc;
}

// Update a document by ID
async function update(id, params, file) {
    const doc = await Document.findByPk(id);
    if (!doc) return "Document not found";

    if (file) {
        const oldPath = path.join(__dirname, "..",  "public" , doc.doc_path);
        if (fs.existsSync(oldPath)) {
            fs.unlinkSync(oldPath);
            doc.doc_path = `documents/${file.filename}`;
        }
    }

    // if (file) {
    //     doc.doc_path = `documents/${doc.lead_id}#${file.filename}`;
    // }

    Object.assign(doc, params);

    await doc.save();
    return doc;
}

// Delete a document by ID
async function deleteByID(id) {
    const doc = await Document.findByPk(id);
    if (!doc) return "Document not found";

    const oldPath = path.join(__dirname, "..", "public", doc.doc_path);
    if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
        console.log("Deleted old file");
    }

    const result = await Document.destroy({ where: { documet_id: id } });
    return result > 0 ? "Deleted successfully" : "Document not found";
}

// Get all documents by Lead ID
async function getByLeadId(leadId) {
    return await Document.findAll({
        where: {
            lead_id: leadId
        }
    });
}

// Get all documents associated with a Followup ID (via Task)
async function getByFollowupId(followupId) {
    const tasks = await db.Task.findAll({
        where: {
            FollowUP_ID: followupId
        },
        include: Document
    });

    // Flatten the document results from each task
    const allDocs = tasks.flatMap(task => task.Documents || []);
    return allDocs;
}

// Search by document name within a lead
async function searchByFileNameInLead(leadId, fileName) {
    const docs = await Documents.findAll({
        where: {
            Lead_ID: leadId,
            Doc_Name: { [Op.like]: `%${fileName}%` }
        }
    });

    if (!docs || docs.length === 0) return "No matching documents found for this Lead";
    return docs;
}
