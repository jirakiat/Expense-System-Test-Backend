const Expense = require('../models/Expense');
const User = require('../models/User');
const moment = require("moment-timezone");


exports.addExpense = async (req, res) => {
    const {title, amount, category, user_id} = req.body;

    try {
        let user = await User.findOne({where: {user_id}});
        if (user) {
            const moment = require('moment-timezone');

            const dateoftheexpense = moment().tz('Asia/Bangkok').format('YYYY-MM-DD');

            const expense = await Expense.create({title, amount, category, dateoftheexpense, user_id});
            if (expense) {
                res.status(201).json({message: 'บันทึกข้อมูลสำเร็จ'});
            } else {
                return res.status(400).json({message: 'บันทึกข้อมูลไม่สำเร็จ'});
            }


        } else {
            return res.status(400).json({message: 'ยังไม่มีผู้ใช้นี้ในระบบ'});
        }


    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

exports.dataExpense = async (req, res) => {


    const {user_id, dateOfTheExpense, category} = req.body;


    let searchConditions = {
        user_id: user_id
    };


    if (dateOfTheExpense) {
        searchConditions.dateOfTheExpense = dateOfTheExpense;
    }


    if (category) {
        searchConditions.category = category;
    }

    try {
        let expense = await Expense.findAll({where: searchConditions});
        if (expense) {
            return res.status(201).json({expense});

        } else {
            return res.status(400).json({message: 'ไม่พบข้อมูล'});
        }


    } catch (error) {
        res.status(500).json({error: error.message});
    }
};


exports.updateExpense = async (req, res) => {


    const {expense_id, category, title, amount, user_id} = req.body;


    try {
        const moment = require('moment-timezone');

        const dateoftheexpense = moment().tz('Asia/Bangkok').format('YYYY-MM-DD');

        const updateFields = {};
        if (category !== undefined) updateFields.category = category;
        if (title !== undefined) updateFields.title = title;
        if (amount !== undefined) updateFields.amount = amount;
        updateFields.dateoftheexpense = dateoftheexpense;

        const [updated] = await Expense.update(updateFields, {
            where: {expense_id, user_id}
        });

        if (updated) {
            return res.status(201).json({message: 'บันทึกข้อมูลสำเร็จ'});

        } else {
            return res.status(400).json({message: 'บันทึกข้อมูลไม่สำเร็จเนื่องจากรหัสผู้ใช้ที่บันทึกข้อมูลไม่ใช่เจ้าของรายการ'});
        }


    } catch (error) {
        res.status(500).json({error: error.message});
    }
};


exports.removeExpense = async (req, res) => {


    const {expense_id, user_id} = req.body;


    try {
        const deleted = await Expense.destroy({
            where: {expense_id, user_id}
        });

        if (deleted) {
            return res.status(201).json({message: 'ลบรายการใช้จ่ายสำเร็จ'});

        } else {
            return res.status(400).json({message: 'ลบรายการใช้จ่ายไม่สำเร็จเนื่องจากรหัสผู้ใช้ที่ลบไม่ใช่เจ้าของรายการ'});
        }


    } catch (error) {
        res.status(500).json({error: error.message});
    }
};


exports.reportsumExpense = async (req, res) => {

    const {dateOfTheExpense, category, title, amount, user_id} = req.body;

    let whereConditions = [];
    if (dateOfTheExpense) {
        whereConditions.push(`dateoftheexpense = '${dateOfTheExpense}'`);
    }
    if (category) {
        whereConditions.push(`category = '${category}'`);
    }
    const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';
    try {
        const query = `
            SELECT 
                category, 
                dateoftheexpense, 
                SUM(amount) AS totalAmount
            FROM expense
             ${whereClause}
            GROUP BY category, dateoftheexpense
        `;

        const [results, metadata] = await sequelize.query(query);
        if (results) {
            return res.status(201).json(results);
        } else {
            return res.status(400).json({message: 'ไม่พบข้อมูล'});
        }


    } catch (error) {
        res.status(500).json({error: error.message});
    }
};