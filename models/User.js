// EXTERNAL PACKAGES > DOCUMENTATION FOR BYCRYPT (https://www.npmjs.com/package/bcrypt)
// EXTERNAL PACKAGES > DOCUMENTATION FOR SEQUELIZE (https://www.npmjs.com/package/sequelize)
const {Model, DataTypes} = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

//CREATE USER MODEL
class User extends Model {
    //METHOD > RUN ON INSTANCE DATA (PER USER) TO CHECK PASSWORD
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

// DEFINE > TABLE, COLUMNS, AND CONFIGURATION
User.init(
    {
        // TABLE COLUMN DEFINITIONS GO HERE
        id: {
            // NOTE> use the special SEQUELIZE DataTypes object provide what type of data it is
            type: DataTypes.INTEGER,
            // NOTE > this is the equivalent of SQLs `NOT NULL` option
            allowNull: false,
            // NOTE > instruct that this is the `PRIMARY KEY
            primaryKey: true,
            // NOTE > turn on auto increment
            autoIncrement: true
        },
        // INSTRUCTION > DEFINE USERNAME COLUMN
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // INSTRUCTION > DEFINE EMAIL COLUMN
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            // NOTE > there cannot be any duplicate email values in this table
            unique: true,
            //NOTE > if allowNull is set to false, we can run our data through validators before creating the table
            validate: {
                isEmail: true
            }
        },
        //INSTRUCTION > DEFINE PASSWORD COLUMN
        password : {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                // NOTE > this means the password must be at least four characters long
                len: [4]
            }
        }
    },
    {
        hooks: {
            // FUNCTIONALITY > SET UP 'beforeCreate' LIFECYCLE
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },

            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password,10);
                return updatedUserData;
            }
        },
        // TABLE CONFIGURATION OPTIONS GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration)
        // PASS > IMPORTED SEQUELIZE CONNECTION (DIRECT CONNECTION TO DATABASE)
        sequelize,
        // DO NOT > AUTOMATICALLY CREATE createdAt/updatedAt timestamp fields
        timestamps: false,
        // DO NOT > PLURALIZE NAME OF DATABSE TABLE
        freezeTableName: true,
        // USE > UNDERSCORES INSTEAD OF CAMEL-CASING (ie `comment_text` and not `commentText`)
        underscored: true,
        // USE > MODEL NAME STAYS LOWER CASE IN DATABASE
        modelName: 'user'
    }
);

module.exports = User;