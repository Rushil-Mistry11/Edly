const User = require('../models/authModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
    const { fullname, email, password, role } = req.body;
    
    try {
    
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userId = await User.create(fullname, email, hashedPassword, role || 'student');

        res.json({ 
            success: true, 
            message: "User registered successfully", 
            userId ,
        });
    } catch (err) {
        res.json({ error: err.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findByEmail(email);
        if (!user) {
            return res.json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user.id, role: user.role, name: user.fullname },
            process.env.JWT_SECRET || 'secret_key_123',
            { expiresIn: '3h' } 
        );

        res.json({ 
            token, 
            role: user.role, 
            name: user.name,
            message: "Login successful" 
        });
    } catch (err) {
        res.json({ error: err.message });
    }
};

module.exports = { register, login };