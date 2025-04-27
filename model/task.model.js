const { DataTypes } = require('sequelize');

// Exporting the model definition function
module.exports = model;

/**
 * Defines the 'Tasks' model with the required attributes and their properties.
 * 
 * @param {Sequelize} sequelize - The Sequelize instance for database connection
 * @returns {Model} The Sequelize model for 'Tasks'
 */
function model(sequelize) {
    const attributes = {
        // Primary key for the Task
        task_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },

        // Foreign key from Follow_Ups table
        followup_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'follow_up',
                key: 'followup_id'
            }
        },

        // Deadline for the task
        deadline: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },

        // Description of the task
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    };

    return sequelize.define("task", attributes);
}
