const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
require('dotenv').config();

async function seed() {
    const db = await mysql.createConnection({
        host: process.env.DB_HOST ,
        user: process.env.DB_USER ,
        password: process.env.DB_PASSWORD ,
        database: process.env.DB_NAME 
    });


    const email = 'admin@edly.com';
    const password = 'admin123'; 
    const name = 'Admin';
    const role = 'admin';
                                                                                                                                          
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
        await db.execute('DELETE FROM users WHERE email = ?', [email]);

        const query = 'INSERT INTO users (fullname, email, password, role) VALUES (?, ?, ?, ?)';
        await db.execute(query, [name, email, hashedPassword, role]);

        console.log(" Admin Seeded Successfully!");
        
    } catch (err) {
        console.error("Seeding failed:", err.message);
    } finally {
        await db.end();
    }
}

seed();