const db = require('../config/db');

const User = {
    findByEmail: async (email) => {
        const [result] = await db.query('CALL sp_GetUserByEmail(?)', [email]);
        return result[0][0]; 
    },
    
    create: async (fullname, email, password, role) => {
        const [result] = await db.query(
            'CALL sp_RegisterUser(?, ?, ?, ?)',
            [fullname, email, password, role]
        );
        return result[0][0].insertId;
    }
};

module.exports = User;