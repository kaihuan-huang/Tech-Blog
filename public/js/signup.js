const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#name-signup").value.trim();
  const useremail = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  // /api/user
  if (useremail && password) {
    const response = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({
        username,
        useremail,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });
    console.log(useremail, password);
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to signup");
      // Swal.fire({
      //   icon: "error",
      //   title: "Oops...",
      //   text: "Something went wrong!",
      // });
    }
  }
};

document
  .querySelector("#signup-form")
  .addEventListener("submit", signupFormHandler);
