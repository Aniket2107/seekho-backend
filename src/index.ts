import createServer from "./server";

const PORT = process.env.PORT;
const server = createServer();

server.listen(+PORT, (err, address) => {
  if (err) throw err;
  console.log(`server listening on ${address}`);
});

module.exports = server;
