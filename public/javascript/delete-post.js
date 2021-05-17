$(".delete-post-btn").on("click", async (event) => {
  event.preventDefault();
  event.stopPropagation();
  const id = event.currentTarget.dataset.id;

  try {
    const response = await fetch(`/api/recipes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status == 200) {
      location.replace("/");
    }
  } catch (e) {
    // TODO: show error message
  }
});
