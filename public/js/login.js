const loginFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
    console.log(email,password);
    if (email && password) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the dashboard page
        document.location.replace('/dashboard');
      } else {
        console.log('res',response.body);
        alert(response.statusText);
      }
    }
  };
  console.log('login page')
  console.log(  document
    .querySelector('#login-btn'))
  document
    .querySelector('#login-btn')
    .addEventListener('click', loginFormHandler);
  