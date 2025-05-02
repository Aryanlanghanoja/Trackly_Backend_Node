const { DataTypes } = require('sequelize');

// Exporting the model definition function
module.exports = model;

/**
 * Defines the 'Documents' model with the required attributes and their properties.
 * 
 * @param {Sequelize} sequelize - The Sequelize instance for database connection
 * @returns {Model} The Sequelize model for 'Documents'
 */
function model(sequelize) {
    const attributes = {
        // Primary key for the document
        documet_id: {
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
                model: 'lead',  // Ensure there's a 'Leads' table/model defined
                key: 'lead_id'
            }
        },

        // // Foreign key from Leads table
        // task_id: {  
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     references: {
        //         model: 'task',  // Ensure there's a 'Leads' table/model defined
        //         key: 'task_id'
        //     }
        // },

        // Path to the document file
        doc_path: {
            type: DataTypes.STRING,
            allowNull: false
        },

        // Name of the document
        doc_name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        // Description of the document
        doc_desc: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    };

    const options = {
        tableName: 'document',
        timestamps: true
    };

    return sequelize.define("document", attributes , options);
}
