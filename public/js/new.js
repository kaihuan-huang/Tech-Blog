const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value.trim();
  const body = document
    .querySelector('input[textarea="post-body"]')
    .value.trim();

  await fetch("/api/posts", {
    method: "POST",
    body: JSON.stringify({ body, title }),
    headers: { "Content-Type": "application/json" },
  });

  document.location.replace("/dashboard");
};

document.querySelector(".new-form").addEventListener("submit", newFormHandler);
