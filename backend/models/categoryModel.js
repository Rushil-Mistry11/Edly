const db = require('../config/db');

const Category = {
    create: async (name, icon_name) => {
        const [result] = await db.query('CALL sp_AddCategory(?, ?)', [name, icon_name]);
        return result[0][0];
    },

    getAll: async () => {
        const [result] = await db.query('CALL sp_GetAllCategories()');
        return result[0];
    },

    update: async (id, name, icon_name) => {
        const [result] = await db.query('CALL sp_UpdateCategory(?, ?, ?)', [id, name, icon_name]);
        return result[0][0];
    },

    delete: async (id) => {
        const [result] = await db.query('CALL sp_DeleteCategory(?)', [id]);
        return result[0][0];
    }
};

module.exports = Category;