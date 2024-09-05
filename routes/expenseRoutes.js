const express = require('express');
const {addExpense, dataExpense, updateExpense,removeExpense,reportsumExpense} = require('../controllers/expenseController');
const router = express.Router();
const authenticate = require('../middleware/auth');
/**
 * @swagger
 * /api/expense/addExpense:
 *   post:
 *     summary: เพิ่มรายจ่ายใหม่
 *     tags: [Expense]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - amount
 *               - category
 *               - user_id
 *             properties:
 *               title:
 *                 type: string
 *                 description: ชื่อของรายจ่าย
 *               amount:
 *                 type: number
 *                 format: float
 *                 description: จำนวนเงินที่ใช้จ่าย
 *               category:
 *                 type: string
 *                 description: หมวดหมู่ของรายจ่าย
 *               user_id:
 *                 type: integer
 *                 description: รหัสผู้ใช้ที่บันทึกรายจ่าย
 *     responses:
 *       201:
 *         description: รายจ่ายถูกบันทึกเรียบร้อยแล้ว
 *       400:
 *         description: ข้อมูลไม่ครบถ้วนหรือไม่ถูกต้อง
 *       500:
 *         description: ข้อผิดพลาดของเซิร์ฟเวอร์
 */
router.post('/addExpense', authenticate, addExpense);

/**
 * @swagger
 * /api/expense/dataExpense:
 *   post:
 *     summary: ค้นหารายการใช้จ่าย
 *     tags: [Expense]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *             properties:
 *               dateOfTheExpense:
 *                 type: date
 *                 description: วันที่ใช้จ่าย
 *               category:
 *                 type: string
 *                 description: หมวดหมู่ของรายจ่าย
 *               user_id:
 *                 type: integer
 *                 description: รหัสผู้ใช้ที่บันทึกรายจ่าย
 *     responses:
 *       201:
 *         description: รายจ่ายถูกบันทึกเรียบร้อยแล้ว
 *       400:
 *         description: ข้อมูลไม่ครบถ้วนหรือไม่ถูกต้อง
 *       500:
 *         description: ข้อผิดพลาดของเซิร์ฟเวอร์
 */
router.post('/dataExpense', authenticate, dataExpense);

/**
 * @swagger
 * /api/expense/updateExpense:
 *   post:
 *     summary: แก้ไขรายการใช้จ่าย
 *     tags: [Expense]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - expense_id
 *               - user_id
 *             properties:
 *               title:
 *                 type: string
 *                 description: ชื่อของรายจ่าย
 *               amount:
 *                 type: number
 *                 format: float
 *                 description: จำนวนเงินที่ใช้จ่าย
 *               category:
 *                 type: string
 *                 description: หมวดหมู่ของรายจ่าย
 *               expense_id:
 *                 type: integer
 *                 description: รหัสรายการใช้จ่าย
 *               user_id:
 *                 type: integer
 *                 description: รหัสรายการใช้จ่าย
 *     responses:
 *       201:
 *         description: รายจ่ายถูกบันทึกเรียบร้อยแล้ว
 *       400:
 *         description: ข้อมูลไม่ครบถ้วนหรือไม่ถูกต้อง
 *       500:
 *         description: ข้อผิดพลาดของเซิร์ฟเวอร์
 */
router.post('/updateExpense', authenticate, updateExpense);


/**
 * @swagger
 * /api/expense/removeExpense:
 *   post:
 *     summary: ลบรายการใช้จ่าย
 *     tags: [Expense]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - expense_id
 *               - user_id
 *             properties:
 *               expense_id:
 *                 type: integer
 *                 description: รหัสรายการใช้จ่าย
 *               user_id:
 *                 type: integer
 *                 description: รหัสผู้ใช้
 *     responses:
 *       201:
 *         description: รายการใช้จ่ายถูกลบเรียบร้อย
 *       400:
 *         description: ข้อมูลไม่ครบถ้วนหรือไม่ถูกต้อง
 *       500:
 *         description: ข้อผิดพลาดของเซิร์ฟเวอร์
 */
router.post('/removeExpense', authenticate, removeExpense);



/**
 * @swagger
 * /api/expense/reportsumExpense:
 *   post:
 *     summary: รายงานค่าใช้จ่ายแยกตามวันที่และรายการ
 *     tags: [Expense]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dateOfTheExpense:
 *                 type: date
 *                 description: วันที่ใช้จ่าย
 *               category:
 *                 type: string
 *                 description: หมวดหมู่ของรายจ่าย
 *     responses:
 *       201:
 *         description: รายจ่ายถูกบันทึกเรียบร้อยแล้ว
 *       400:
 *         description: ข้อมูลไม่ครบถ้วนหรือไม่ถูกต้อง
 *       500:
 *         description: ข้อผิดพลาดของเซิร์ฟเวอร์
 */
router.post('/reportsumExpense', authenticate, reportsumExpense);


module.exports = router;



