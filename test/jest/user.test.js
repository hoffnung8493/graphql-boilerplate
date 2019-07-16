require('cross-fetch/polyfill');
const ApolloBoost = require('apollo-boost').default;
const {gql} = require('apollo-boost');

const client = new ApolloBoost({
    uri: 'http://localhost:4000'
})

test('Should create a new user', async() => {
    const createUser = gql`
        mutation{
            createUser(
                data:{
                    name:"sanghutn",
                    email:"sang@gmail.com",
                    password:"akssk1234"
                }
            ){
                token,
                user{
                    id
                }
            }
        }
    `
    const response = client.mutate({
        mutation: createUser
    })
})