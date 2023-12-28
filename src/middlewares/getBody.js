import qs from "querystring";
import { validatePost } from "./validateBody.js";
export function getBody(request, response, next) {
  const data = [];

  request.on("data", (dataChunk) => {
    data.push(dataChunk);
  });

  request.on("end", () => {
    request.body = Buffer.concat(data).toString();

    try {
      if (request.headers["content-type"] === "application/json") {
        request.body = JSON.parse(request.body);
        validatePost(request.body);
      } else if (
        request.headers["content-type"] === "application/x-www-form-urlencoded"
      ) {
        request.body = qs.parse(request.body);
        validatePost(request.body);
      } else {
        response.statusCode = 415;
        response.end();
      }

      next(request, response);
    } catch (e) {
      response.statusCode = 400;
      response.setHeader("Content-Type", "application/json");
      response.write(JSON.stringify("Invalid post provided"));
      response.end();
    }
  });
}
