$(".signup-form").on("submit", async (event) => {
  event.preventDefault();
  event.stopPropagation();

  const data = $(event.currentTarget)
    .serializeArray()
    .reduce(function (obj, item) {
      obj[item.name] = item.value;
      return obj;
    }, {});

  try {
    const response = await fetch("/api/users/", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    if (response.status == 200) {
      location.replace("/");
      return;
    }

    // else
    // show error message
  } catch (e) {
    // TODO: show error message
  }
});

$(".login-form").on("submit", async (event) => {
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
    if (response.status == 200) {
      location.replace("/");
    }
  } catch (e) {
    // TODO: show error message
  }
});
