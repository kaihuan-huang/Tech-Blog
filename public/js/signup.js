const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#name-signup").value.trim();
  const useremail = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  // /api/user
  if (useremail && password) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        username,
        useremail,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });
    console.log(username ,useremail, password);
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to signup");
    }
  }
};

document
  .querySelector("#signup-form")
  .addEventListener("submit", signupFormHandler);
