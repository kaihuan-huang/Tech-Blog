const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value.trim();
  const content = document
    .querySelector('input[name="post-content"]')
    .value.trim();

  await fetch("/api/posts", {
    method: "POST",
    body: JSON.stringify({ content, title }),
    headers: { "Content-Type": "application/json" },
  });

  document.location.replace("/dashboard");
};

document.querySelector(".new-post-form").addEventListener("submit", newFormHandler);
