const { extractFragmentReplacements } = require('prisma-binding');

const Query = require('./Query');
const Mutation = require('./Mutation');
const User = require('./User');
const Subscription = require('./Subscription');

const resolvers = {
    Query,
    Mutation,
    // Subscription,
    User    
}

const fragmentReplacements = extractFragmentReplacements(resolvers);

module.exports = { resolvers, fragmentReplacements }