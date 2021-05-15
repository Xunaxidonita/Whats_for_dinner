const addPost = (post) =>
  fetch("/api/recipe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apiKey: "keyTest",
    },
    body: JSON.stringify(post),
  });
