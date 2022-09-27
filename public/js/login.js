const loginFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    // const username = document.querySelector("#name-login").value.trim();
    const useremail = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (useremail && password) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        // username,
        useremail,
        password
      }),
      headers: { "Content-Type": "application/json" },
    });
    console.log("useremail, password", useremail, password);
    if (response.ok) {
      console.log("response", response);
      document.location.replace("/dashboard");
    } else {
      console.error();
      alert("Failed to login");
      // Swal.fire({
      //   icon: "error",
      //   title: "Oops...",
      //   text: "Failed to login",
      // });
    }
  }
};

document
  .querySelector("#login-form")
  .addEventListener("submit", loginFormHandler);
