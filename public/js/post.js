/* post form handler */
const postReviewFormHandler = async (event) => {
    event.preventDefault();
  
    const media_type = document.querySelector('#media_type').value.trim();
    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#review').value.trim();
    const user_id = document.querySelector('#user_id').value.trim();

    // const user_name = document.querySelector('#user_name').value.trim();
  
    if (title && content && media_type && user_id) {
      const response = await fetch('/api/post', {
        method: 'POST',
        body: JSON.stringify({ media_type, title, content, user_id }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        alert("Successfully posted a review!");
        document.location.replace('/reviews');
      } else {
        alert('Failed to post review');
      }
    }
  };

/* button event listener */
document.getElementById("postReviewButton").addEventListener('click', postReviewFormHandler);