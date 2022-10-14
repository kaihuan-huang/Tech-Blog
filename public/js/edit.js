//update post
async function editFormHandler(event) {
    event.preventDefault();

    const post_id = document.querySelector('input[name="post-id"]').value.trim();
    const title = document.querySelector('input[name="post-title"]').value.trim();
    const body = document.querySelector('textarea[name="post-body"]').value.trim();
    console.log(title);
    console.log(body);

    await fetch(`/api/posts/${post_id}`, {
      method: "PUT",
      body: JSON.stringify({
        title,
        body,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // document.location.replace("/dashboard");
    document.location.href=" /posts/"+ post_id;
  };
  
  //Delete 
  const deleteClickHandler = async () => {
    const post_id = document.querySelector('input[name="post-id"]').value;
    await fetch(`/api/posts/${post_id}`, {
      method: "DELETE",
    });
  
    document.location.replace("/dashboard");
  };
  
  document
    .querySelector("#edit-post-form")
    .addEventListener("click", editFormHandler);
  
  document
    .querySelector("#delete-btn")
    .addEventListener("click", deleteClickHandler);
  