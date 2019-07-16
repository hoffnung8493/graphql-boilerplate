const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = {
    generateToken: (userId) => jwt.sign({userId}, process.env.JWT_SECRET , { expiresIn: '2 days' }),
    hashPassword: (password) => {
        if(password.length<8) throw new Error('password must be at least 8 characters'); 
        return bcrypt.hash(password, 10)
    },
    checkPassword: async (password, hashPassword) => {
        const isMatch = await bcrypt.compare(password, hashPassword)
        if(!isMatch) throw new Error('Unable to login');
        else return;
    },
    getUserId: (req, requireAuth = true) => {
        const header = req.request? req.request.headers.authorization : req.connection.context.Authorization;
        if(header){
            const token = header.replace('Bearer ',''); 
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            return decoded.userId;    
        } 
        if(requireAuth) throw new Error('Authorization required');
        return null;
    }
}
