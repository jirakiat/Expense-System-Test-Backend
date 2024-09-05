const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


exports.register = async (req, res) => {
    const {email, password} = req.body;

    try {

        let user = await User.findOne({where: {email}});
        if (user) {
            return res.status(400).json({message: 'มีผู้ใช้งาน Email นี้แล้ว'});
        }


        user = await User.create({email, password});


        res.status(201).json({message: 'บันทึกข้อมูลสำเร็จ'});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};


exports.login = async (req, res) => {
    const {email, password} = req.body;

    try {

        const user = await User.findOne({where: {email}});
        if (!user) {
            return res.status(400).json({message: 'Email นี้ยังไม่มีในระบบ'});
        }


        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({message: 'รหัสผ่านผิด'});
        }


        const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });


        res.json({token});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};
