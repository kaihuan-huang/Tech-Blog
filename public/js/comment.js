const commentFormHandler = async (event) => {
  event.preventDefault();

  const comment = document
    .querySelector('textarea[name="comment"]')
    .value.trim();

  if (comment) {
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ post_id, comment }),
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

  //Delete comments
  // const deleteComment = async () => {
  //   const user_id = document.querySelector('input[name="user-id"]').value;
  //   await fetch(`/api/post/${user_id}`, {
  //     method: "DELETE",
  //   });
  
  //   document.location.replace("/dashboard");
  // };
  
  // document
  //   .querySelector("#delete-btn")
  //   .addEventListener("click", deleteClickHandler);
  