# Expense  System Test Backend

## ภาพรวม

นี่คือระบบการจัดการรายจ่ายที่สร้างขึ้นด้วย Node.js, Express, และ Sequelize ซึ่งช่วยให้ผู้ใช้สามารถจัดการรายจ่ายของตนได้ รวมถึงการเพิ่ม, แก้ไข, ลบ, และรายงานเกี่ยวกับรายจ่าย การทำการตรวจสอบสิทธิ์ (authentication) จะจัดการโดยใช้ JWT (JSON Web Token) และ ถูกพัฒนาโดยรูปแบบโครงสร้าง MVC



## ข้อกำหนดเบื้องต้น

- Node.js (>= 14.x)
- npm
- MySQL

## Installation

1. **Clone the Repository**

   Clone the repository to your local machine:

   ```bash
   git clone <repository-url>
   cd <repository-directory>


2. **ติดตั้ง packages**
   ```bash
   npm install


3. **แก้ไขไฟล์ .env**
   ```bash
   MYSQL_DB=your_database_name
   MYSQL_USER==your_database_user
   MYSQL_PASSWORD=your_database_password 
   MYSQL_HOST=your_database_host
   JWT_SECRET=your_jwt_secret_key


4. **สร้าง ตาราง User และ expense ในฐานข้อมูล**
   ```bash
   CREATE TABLE user (
   user_id INT(11) AUTO_INCREMENT PRIMARY KEY,
   email VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL UNIQUE,
   password VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
   createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
   updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
   );
      

   CREATE TABLE expense (
   expense_id INT(11) AUTO_INCREMENT PRIMARY KEY,
   title VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
   amount FLOAT NOT NULL,
   category VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
   dateoftheexpense DATE NOT NULL,
   user_id INT(11) NOT NULL,
   createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
   updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   FOREIGN KEY (user_id) REFERENCES user(user_id)
   );

5. **ทดสอบรัน Project**
  ```bash
   npm run dev
   
   ลองเข้าผ่าน Swagger localhost:5000/api-docs


 

## DEV BY JIW JIRAKIAT

