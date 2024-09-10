/* form handler */
const registrationFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#register_name').value.trim();
    const email = document.querySelector('#register_user').value.trim();
    const password = document.querySelector('#register_pass').value.trim();

    if(password.length < 8) {
        alert("Password must be more than 8 characters!");

        return;
    }


    if (name && email) {
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

/* event listener */
document.getElementById("registerButton").addEventListener('click', registrationFormHandler);