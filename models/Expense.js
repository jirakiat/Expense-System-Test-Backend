const {DataTypes} = require('sequelize');
const {sequelize} = require('../config/db');
const bcrypt = require('bcryptjs');


const expense = sequelize.define('expense', {
    expense_id: {
        type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,
    }, title: {
        type: DataTypes.STRING, allowNull: false,
    }, amount: {
        type: DataTypes.FLOAT, allowNull: false
    }, category: {
        type: DataTypes.STRING, allowNull: false
    }, dateoftheexpense: {
        type: DataTypes.DATE, allowNull: false
    }, user_id: {
        type: DataTypes.INTEGER, allowNull: false, references: {
            model: 'user', key: 'user_id'
        }, onUpdate: 'CASCADE', onDelete: 'CASCADE'
    },
}, {
    tableName: 'expense', timestamps: true,
});

module.exports = expense;
