import * as http from "http";
import { get } from "./methods/get.js";
import { post } from "./methods/post.js";
import { put } from "./methods/put.js";
import { deleteR } from "./methods/delete.js";
import { posts } from "./database.js";
import { getBody } from "./getBody.js";

const PORT = process.env.PORT || 4000;

const server = http.createServer();

server.on("request", (request, response) => {
  request.posts = posts;
  request.query = new URL(request.url, `http://${request.headers.host}`);

  switch (request.method) {
    case "GET":
      getBody(request, response, get);
      break;

    case "POST":
      getBody(request, response, post);
      break;

    case "PUT":
      getBody(request, response, put);
      break;

    case "DELETE":
      getBody(request, response, deleteR);
      break;

    default:
      // Send response for requests with no other response
      response.statusCode = 400;
      response.write("No Response");
      response.end();
  }
});

server.listen(PORT, (err) => {
  err ? console.error(err) : console.log(`listening on port ${PORT}`);
});
