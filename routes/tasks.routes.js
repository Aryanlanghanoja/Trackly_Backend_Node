const express = require("express");
const router = express.Router();
const taskController = require("../controller/task.controller");

// Custom filter routes
router.get("/id/:id", taskController.getById);
router.get("/followup/:followupId", taskController.getByFollowupId);
router.get("/deadline-range", taskController.getByDeadlineRange);

// CRUD routes
router.get("/", taskController.getAll);
router.post("/", taskController.create);
router.put("/:id", taskController.update);
router.delete("/:id", taskController.remove);

module.exports = router;
