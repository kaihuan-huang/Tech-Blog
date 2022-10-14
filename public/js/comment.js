const commentFormHandler = async (event) => {
  event.preventDefault();

  const comment = document
    .querySelector('textarea[name="comment"]')
    .value.trim();

  const post_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  if (comment) {
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ post_id, comment }),
      headers: { "Content-Type": "application/json" },
    });
    console.log('res',response);
    if (response.ok) {
      document.location.href=" /posts/"+ post_id;
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector(".comment-form")
  .addEventListener("submit", commentFormHandler);



// //For singlePost Comment page
// const singlePostCommentFormHandler = async (event) => {
//   event.preventDefault();

//   const comment = document
//     .querySelector('textarea[name="comment"]')
//     .value.trim();
//     const post_id = window.location.toString().split('/')[
//       window.location.toString().split('/').length - 1
//   ];
  
//   if (comment) {
//     const response = await fetch("/api/posts/${post_id}", {
//       method: "POST",
//       body: JSON.stringify({ post_id, comment }),
//       headers: { "Content-Type": "application/json" },
//     });

//     if (response.ok) {
//       document.location.reload();
//     } else {
//       alert(response.statusText);
//     }
//   }
// };

// document
//   .querySelector(".singlePostComment")
//   .addEventListener("submit", singlePostCommentFormHandler);
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
  