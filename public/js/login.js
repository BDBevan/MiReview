const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#username').value.trim();
  const password = document.querySelector('#password').value.trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // alert("Succesfully logged in!");
      document.location.replace('/');
    } else {
      alert('Failed to log in');
    }
  }
};

document.getElementById("loginButton").addEventListener('click', loginFormHandler);
