import http from "http";
import path from "path";

const server = http.createServer((req, res) => {
  res.writeHead(200, { "content-type": "text/html" });
  res.end("server running");
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
