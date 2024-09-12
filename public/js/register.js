/* Form handler */
const registrationFormHandler = async (event) => {
    event.preventDefault();
  
    // Receive user input
    const name = document.querySelector('#register_name').value.trim();
    const email = document.querySelector('#register_user').value.trim();
    const password = document.querySelector('#register_pass').value.trim();

    // Simple front-end password length validation
    if(password.length < 8) {
        alert("Password must be more than 8 characters!");
        return;
    }

    // Run code if neither field are empty
    if (name && email) {
      // POST request to back-end server route (inserts user record into DB)
      const response = await fetch('/api/users/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        alert("Succesfully registered!");
        document.location.replace('/');
      } else {
        alert('Failed to create account');
      }
    }
  };

/* Button event listener */
document.getElementById("registerButton").addEventListener('click', registrationFormHandler);