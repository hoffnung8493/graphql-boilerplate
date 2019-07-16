const { generateToken, hashPassword, checkPassword, getUserId } = require('../utils/auth');

 const Mutation = {
     async logIn(parents, {data:{email, password}}, {prisma}, info){
        const user = await prisma.query.user({where:{email}});
        console.log(user)
        await checkPassword(password, user.password);
        console.log(123)
        return{
            user,
            token: generateToken(user.id)
        }
     },
     async createUser(parents, {data}, {prisma}, info){
        data.password = await hashPassword(data.password);
        const user = await prisma.mutation.createUser({data})
        return {
            user,
            token: generateToken(user.id)
        }
    },
    deleteUser(parents, args, {prisma, request}, info){
        const userId = getUserId(request);
        return prisma.mutation.deleteUser({where:{id: userId}}, info);
    },
    async updateUser(parents, {id, data}, {prisma, request}, info){
        const userId = getUserId(request);
        if(typeof data.password === 'string') data.password = await hashPassword(data.password)
        return prisma.mutation.updateUser({where:{id: userId}, data}, info);
    }
}

module.exports = Mutation