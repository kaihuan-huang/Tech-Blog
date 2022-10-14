//create 
const newFormHandler = async (event) => {
  event.preventDefault();
  const title = document.querySelector('input[name="post-title"]').value.trim();
  const body = document.querySelector('textarea[name="post-body"]').value.trim();
  console.log(title);
  console.log(body);

  await fetch(`/api/posts`, {
    method: "POST",
    body: JSON.stringify({
      title,
      body,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  document.location.replace("/dashboard");
  
};

document.querySelector("#new-post-form").addEventListener("submit", newFormHandler);
