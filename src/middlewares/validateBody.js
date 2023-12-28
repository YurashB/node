export function validatePost(post) {
  if (
    post.id === undefined ||
    post.title === undefined ||
    Object.keys(post).length !== 2
  ) {
    throw new Error("Invalid post provided");
  }
}
