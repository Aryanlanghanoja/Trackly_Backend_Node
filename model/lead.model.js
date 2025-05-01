const { DataTypes } = require('sequelize');

// Exporting the model definition function
module.exports = model;

/**
 * Defines the 'Leads' model with the required attributes and their properties.
 * 
 * @param {Sequelize} sequelize - The Sequelize instance for database connection
 * @returns {Model} The Sequelize model for 'Leads'
 */
function model(sequelize) {
    const attributes = {
        // Primary key for the lead
        lead_id: { 
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },

        // Employee name who generated the lead
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false ,
            references: {
                model: 'user',
                key: 'user_id'
            }
        },

        // Source of the lead
        source: {
            type: DataTypes.STRING,
            allowNull: false
        },

        // Date the lead was created
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false , 
            defaultValue: DataTypes.NOW
        },

        // Client name or reference
        client: {
            type: DataTypes.STRING,
            allowNull: false
        },

        // District associated with the lead
        district: {
            type: DataTypes.STRING,
            allowNull: false
        },

        // Contact number for the client
        contact_number: {
            type: DataTypes.STRING,
            allowNull: false
        },

        // Email address for the client
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },

        // Status of the lead (e.g., active, converted, dropped)
        status: {
            type: DataTypes.STRING,
            allowNull: false , 
            defaultValue: 'active'
        }
    };

    const options = {
        tableName: 'lead',
        timestamps: true
    };

    // Creating the model
    return sequelize.define("lead", attributes , options);
}
