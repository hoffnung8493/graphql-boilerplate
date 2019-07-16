const server = require('./server'); 
const port = process.env.PORT || 4000;
server.start({ port }, () => console.log(`Server is running in port ${port}`))