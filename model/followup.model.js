const { DataTypes } = require('sequelize');

// Exporting the model definition function
module.exports = model;

/**
 * Defines the 'Follow_Ups' model with the required attributes and their properties.
 * 
 * @param {Sequelize} sequelize - The Sequelize instance for database connection
 * @returns {Model} The Sequelize model for 'Follow_Ups'
 */
function model(sequelize) {
    const attributes = {
        // Primary key for follow-up
        followup_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },

        // Foreign key from Leads table
        lead_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'leads',
                key: 'lead_id'
            }
        },

        // Auto-incremented number of follow-up attempts for a lead
        no_of_followup: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        // Text conclusion of this follow-up
        conclusion: {
            type: DataTypes.TEXT,
            allowNull: false
        },

        // Next follow-up date
        next_followup_date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },

        // Foreign key from Users table
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'user_id'
            }
        }
    };

    return sequelize.define("follow_ups", attributes);
}
