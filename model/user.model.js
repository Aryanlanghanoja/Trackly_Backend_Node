const { DataTypes } = require('sequelize');

// Exporting the model definition function
module.exports = model;

/**
 * Defines the 'Users' model with the required attributes and their properties.
 * 
 * @param {Sequelize} sequelize - The Sequelize instance for database connection
 * @returns {Model} The Sequelize model for 'Users'
 */
function model(sequelize) {
    // Defining the schema/attributes of the Users table
    const attributes = {

        // Username is the primary key for the table
        user_id: {
            type: DataTypes.INTEGER,      // Data type: string
            autoIncrement: true,          // Cannot be null
            primaryKey: true              // Set as the Primary Key
        },

        // Username is the candidate key for the table
        user_name: { 
            type: DataTypes.STRING,       // Data type: string
            allowNull: false,             // Cannot be null
            unique: true                 // Set as the Unique Parameter
        },

        // Name of The User
        name: { 
            type: DataTypes.STRING,       // Data type: string
            allowNull: false,             // Cannot be null 
        },       

        // Email field with validation to ensure it's in correct format
        email: { 
            type: DataTypes.STRING,       // Data type: string
            allowNull: false,             // Cannot be null
            validate: { 
                isEmail: true             // Must follow email format (e.g., user@example.com)
            } 
        },

        // Phone number field (no specific format validation here, can be added if needed)
        phone: { 
            type: DataTypes.STRING,       // Data type: string
            allowNull: false              // Cannot be null
        },

        // Role field to define user type (e.g., admin, faculty, student)
        role: { 
            type: DataTypes.STRING,       // Data type: string
            allowNull: false              // Cannot be null
        },

        // District field to store location/area associated with the user
        district: { 
            type: DataTypes.STRING,       // Data type: string
            allowNull: false              // Cannot be null
        },

        // Password field (should be stored as a hashed value in practice)
        password: { 
            type: DataTypes.STRING,       // Data type: string
            allowNull: false              // Cannot be null
        },

        // Profile photo field (can be a URL or a file path)
        profile_photo: { 
            type: DataTypes.STRING,       // Data type: string
            allowNull: true,              // Can be null
            defaultValue: ""              
        },

        // Field to store the status of the user
        user_status: { 
            type: DataTypes.BOOLEAN,      // Data type: boolean
            allowNull: false,             // Cannot be null
            defaultValue: true            // Set defalut active
        },

        // To Store the verification status of the use
        is_verified: { 
            type: DataTypes.BOOLEAN, 
            allowNull: false, 
            defaultValue: false 
        },

        // To Store the last login time of the use
        last_login: { 
            type: DataTypes.TIME,       // Data type: string
            allowNull: false ,              // Cannot be null
            defaultValue: DataTypes.NOW
        },

        // To Store the token of the user
        token : {
            type: DataTypes.STRING,
            allowNull: true
        }
    };

    const options = {
        tableName: 'user',
        timestamps: true
    };

    // Creating the model using Sequelize's define method
    return sequelize.define("user", attributes , options);
}
