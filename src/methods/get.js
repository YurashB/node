export function get(request, response) {
  const url = request.url.split("?")[0];

  switch (url) {
    case "/":
      response.statusCode = 200;
      response.write("Welcome to home page");
      response.end();
      break;

    case "/posts":
      if (request.query.searchParams.get("id")) {
        const id = Number.parseInt(request.query.searchParams.get("id"));
        response.statusCode = 200;
        response.setHeader("Content-Type", "application/json");
        const post = request.posts.filter((post) => post.id === id);
        response.write(JSON.stringify(post));
        response.end();
      } else {
        response.statusCode = 200;
        response.setHeader("Content-Type", "application/json");
        response.write(JSON.stringify(request.posts));
        response.end();
      }
      break;

    default:
      response.statusCode = 400;
      response.write(`CANNOT GET ${request.url}`);
      response.end();
  }
}
