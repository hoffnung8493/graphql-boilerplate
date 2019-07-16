# GraphQL-Node.js-Prisma-AWS-MySQL boilerplate(draft)

This boilerplate provides:
 - node.js-graphql server with user JWT based user authentication
 - prisma server setup
 - database server setup
 - deploy prisma and database to AWS in any region
![source: prisma homepage](https://cdn-images-1.medium.com/max/2000/1*p17uapNIac8Grmm8r7wp6Q.png)
source: [prisma-homepage](https://www.prisma.io/tutorials/deploy-prisma-to-aws-fargate-ct14)

## Overview
Prisma is a data layer(ORM) that lies on top of a database. 
Then only a single`datamodel.graphql` file needs to be defined to generate tables, associations and all the  GraphQL`queries`, `mutations`, `subscriptions`. 

A downside is that current prisma needs a dedicated server. You cannot add prisma simply to your node package like other ORMs(sequelize.js). The new Prisma 2 seems to solve this issue, but since it is in beta version, we will stick with Prisma 1.

Prisma has a cloud service, which you can easily deploy to US and EU. Most of the time this would suffice, but for other regions this could cause delay issue. This post will provide a full boilerplate and a solution to deploy to any region.

Following is the graphql-prisma architecture:
#### client <-> `graphql query` <-> node server <-> `graphql query` <-> prisma server <-> `SQL query` <-> mysql
We need authentication in each connection(`query`)
## Setting up our Prisma server and database
1. Create AWS RDS MySQL using AWS cloudformation.
    * Prisma also supports auora, postgres, mongodb
    * CloudFormation takes in a **"recipe"** `yml` file. Then according to that file it generates an AWS solution according to the recipe. In this case it creates an mysql database with the correct configuration.
2. Create Prisma server using AWS cloudformation.
	3. This time you need three sets of information:
		1. the **"recipe"** `yml` file to create your prisma server. 
		2. **database information** so that your prisma server can connect to your database. Remeber the username and the password you inserted when setting up the database? you also need the `endpointUrl` which is available in the cloudformation->db stack->output.
		3. A **"prisma secret key"** used for authentication between your **Prisma** and **Node** server. When setting up your prisma server in cloudformation it will require you to enter a `PRISMA_MANAGEMENT_API_SECRET`. This is the **"prisma secret key"**, which you need to remember for later. 
3. Preparing node server
	1. Clone the repository to get your boilerplate.
	2. `npm install` in the directory where `package.json` lies
	3. Open `config/dev.env`. Here you need to replace <...> with the correct information
		1. `PRISMA_ENDPOINT`: Its the endpointUrl of your prisma server. You can get it from outputs in your cloudformation.
		2. `PRISMA_MANAGEMENT_API_SECRET`: Its the **"prisma secret key"** you inserted when generating your prisma server.
		3. `JWT_SECRET`: You can insert any random secret combination. This is used user authentication in your node server.
	4. Change directory to `prisma/datamodel.prisma`. Here is an example `type User`. On your termainal type `prisma deploy`. It will generate the table, assocition in your database and generate graphql operations.
	5. Your node server will query to your prisma server. By running `npm run get-schema`, node server will get the graphql schema from the prisma server. 
	6. Now you can `npm run dev` to launch your node server on your local machine.
	7. Go To 	`localhost:4000` to test your graphql queries. As I mentioned in the overview, every communication part requires an authentication. Here we have `jwt` authentication. In `localhost` login to receive your unique `jwt` token. Afterwards you can query other information by adding your `jwt` token in the header as `{ "Authorization": "Bearer <your jwt token>"}`
	8. Now you can add new `types`(tables), `associations`
