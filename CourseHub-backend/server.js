/*=======================================================
 Author: [Abhishek Pareshbhai Pethani] (ab823206@dal.ca)
========================================================= */
const http = require("http");
const app = require("./app");

const port = 3000 || process.env.PORT;

const server = http.createServer(app);

server.listen(process.env.PORT || 3000, () => {
  console.log("Server is listening on port " + port);
});
