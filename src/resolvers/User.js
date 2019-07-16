const { getUserId } = require('../utils/auth');

const User = {
    email:{
        fragment: 'fragment userId on  User { id }',
        resolve(parent, args, {request}, info){
            console.log(123)
            const userId = getUserId(request);
            if(userId && userId === parent.id) return parent.email;
            else return null;
        }
    }
}

module.exports = User;