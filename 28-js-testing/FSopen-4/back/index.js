const log = require("./helpers/console");
const http = require("http");
const app = require("./app");

const PORT = process.env.PORT || 3003;
const server = http.createServer(app);

server.listen(PORT, () => {
  log(`Server running on port ${PORT}`);
});
