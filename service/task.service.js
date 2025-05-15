const { Op } = require("sequelize");
const db = require("../helper/db.helper");
const Task = db.task;

async function getAllTask() {
    return await Task.findAll();
  };

async function getTaskById(id) {
    return await Task.findByPk(id);
}

async function getTasksByFollowupId(followupId) {
    return await Task.findAll({ where: { FollowUP_ID: followupId } });
}

async function getTasksByDeadlineRange(startDate, endDate) {
    return await Task.findAll({
        where: {
            DeadLine: {
                [Op.between]: [startDate, endDate],
            },
        },
    });
}

async function createTask(data) {
    return await Task.create(data);
}

async function updateTask(id, data) {
    const task = await Task.findByPk(id);
    if (!task) throw new Error("Task not found");

    return await task.update(data);
}

async function removeTask(id) {
    const task = await Task.findByPk(id);
    if (!task) throw new Error("Task not found");

    return await task.destroy();
}

module.exports = {
    getAllTask,
    getTaskById,
    getTasksByFollowupId,
    getTasksByDeadlineRange,
    createTask,
    updateTask,
    removeTask,
};
