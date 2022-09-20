const commentFormHandler = async (event) => {
  event.preventDefault();

  const comment_text = document
    .querySelector('input[name="comment_text"]')
    .value.trim();

  if (commentText) {
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ post_id, comment_text }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector(".comment-form")
  .addEventListener("submit", commentFormHandler);
