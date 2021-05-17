
$(".edit-post-form").on("submit", async (event) => {
  event.preventDefault();
  event.stopPropagation();
  const data = $(event.currentTarget)
    .serializeArray()
    .reduce(function (obj, item) {
      obj[item.name] = item.value;
      return obj;
    }, {});
  try {
    const response = await fetch(`/api/recipes/${data.id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status == 200) {
      location.replace(`/recipe/${data.id}`);
    }
  } catch (e) {
    // TODO: show error message
  }
});