import http from "http";
import path from "path";
import fs from "fs/promises";

const server = http.createServer((req, res) => {
  //get the base filename from
  let basePath = req.url;

  //to support css and html files too without having to write full extension like.html in url
  if (["/about", "/contact-me"].includes(basePath)) {
    basePath = basePath + ".html";
  }

  // full filename to read the content from
  const filename = path.join(
    import.meta.dirname,
    "public",
    basePath == "/" ? "index.html" : basePath
  );

  // get extension
  const extName = path.extname(filename);

  //default content type
  let contentType = "text/html";

  switch (extName) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
    case ".jpeg":
      contentType = "image/jpeg";
  }

  //read the content of the file
  fs.readFile(filename, "utf-8")
    .then((content) => {
      res.writeHead(200, { "content-type": contentType });
      res.write(content);
      res.end();
    })
    .catch((err) => {
      if (err.code === "ENOENT") {
        res.writeHead(404, { "content-type": "text/html" });
        fs.readFile(
          path.join(import.meta.dirname, "public/404.html"),
          "utf-8"
        ).then((content) => {
          res.write(content);
          res.end();
        });
      } else {
        res.writeHead(500, { "content-type": "text/html" });
        res.write(`Server error code: ${err.code}`);
      }
    });
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
