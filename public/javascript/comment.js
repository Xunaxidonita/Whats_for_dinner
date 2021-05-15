$(".comment-form").on("submit", async (event) => {
  event.preventDefault();
  event.stopPropagation();
  const data = $(event.currentTarget)
    .serializeArray()
    .reduce(function (obj, item) {
      obj[item.name] = item.value;
      return obj;
    }, {});
  try {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    debugger;
    if (response.status == 200) {
      location.replace("/");
    }
  } catch (e) {
    // TODO: show error message
  }
});
