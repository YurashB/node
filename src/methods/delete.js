export function deleteR(request, response) {
  const url = request.url.split("?")[0];

  if (url === "/posts") {
    const id = request.query.searchParams.get("id");
    response.statusCode = 200;
    response.setHeader("Content-Type", "application/json");
    request.posts.splice(id, 1);
    response.write(JSON.stringify(request.posts));
    response.end();
  } else {
    response.statusCode = 400;
    response.write(`CANNOT DELETE ${request.url}`);
    response.end();
  }
}
