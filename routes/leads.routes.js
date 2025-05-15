const express = require("express");
const router = express.Router();
const leadController = require("../controller/lead.controller");

// CRUD routes
router.post("/", leadController.createLead);
router.post("/excel", leadController.createLeadFromExcel);
router.get("/", leadController.getAllLeads);
router.get("/:id", leadController.getLeadById);
router.put("/:id", leadController.updateLead);
router.delete("/:id", leadController.deleteLead);

// Filter routes
router.get("/emp/:empId", leadController.getLeadsByEmpId);
router.get("/source/:source", leadController.getLeadsBySource);
router.get("/client/:client", leadController.getLeadsByClient);
router.get("/status/:status", leadController.getLeadsByStatus);
router.get("/email/:email", leadController.getLeadsByEmail);
router.get("/contact/:contact", leadController.getLeadsByContact);
router.get("/date-range", leadController.getLeadsByDateRange);

module.exports = router;
