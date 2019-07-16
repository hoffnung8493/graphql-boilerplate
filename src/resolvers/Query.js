const { getUserId } = require('../utils/auth');

const Query = {
    users(parent, {query}, { prisma }, info){
        const opArgs = {};
        if(query){
            opArgs.where = { name_contains: query }
        }
        return prisma.query.users(opArgs, info);
    },
    me(parent, args, {prisma, request}, info){
        const userId = getUserId(request);
        return prisma.query.user({where:{id:userId}}, info);
    }
}

module.exports = Query;