// Populate the textbox with the selected radio button value
function populateTextBox(question) {
  const selectedInput = document.querySelector(`input[name="${question}"]:checked`);
  if (selectedInput) {
      const selectedValue = selectedInput.value;
      document.getElementById(`${question}Text`).value = selectedValue;
  } else {
      alert(`Please select an option for ${question}`);
  }
}

// Update slider value
function updateSliderValue(value) {
  document.getElementById('serviceRatingValue').textContent = value;
}

// Handle form submission
document.getElementById('new-feedback-form').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const formData = new FormData(this);
  const feedbackData = {};
  formData.forEach((value, key) => {
      feedbackData[key] = value;
  });

  fetch('/submit-feedback', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(feedbackData)
  })
  .then(response => response.text())
  .then(data => {
      alert(data);
      this.reset();
  })
  .catch(error => console.error('Error:', error));
});
const express = require('express');
const app = express();

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Other routes and middleware setup

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
