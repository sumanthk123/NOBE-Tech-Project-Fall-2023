const axios = require('axios');
// this is where the LieLLM bug is -> reason is due to Network Error. Need to fix backend.

const apiKey = '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'; // Replace with your actual API key
const apiUrl = 'https://api.openai.com/v1/engines/text-davinci-003/completions';

// Function to fetch the transcription from the Flask backend
async function fetchTranscription(key) {
  try {
    const response = await fetch(`http://localhost:5001/get_transcription/${key}`);
    const data = await response.json();
    if (response.ok) {
      return data.transcription;
    } else {
      throw new Error(data.error || 'Failed to fetch transcription');
    }
  } catch (error) {
    console.error('Error fetching transcription:', error);
  }
}

// Example usage: Assuming you have a key from the video upload response
const keyFromUpload = 'your_video_key'; // Replace with your actual key received from upload response
fetchTranscription(keyFromUpload).then(transcriptionText => {
  if (transcriptionText) {
    // Now you have the transcription, you can pass it to generateText or use it as needed
    generateText(messages, transcriptionText);
  }
});

// Function to generate text with GPT-3 in a conversational format
function generateText(messages, transcription) {
  // Add the transcription to the messages array
  messages.push({"role": "user", "content": transcription});

  // Construct the prompt from the messages
  let conversation = messages.map(msg => {
    return `${msg.role === 'user' ? 'User:' : 'Assistant:'} ${msg.content}`;
  }).join("\n");

  axios.post(apiUrl, {
    prompt: conversation,
    max_tokens: 50
  }, {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      console.log(response.data.choices[0].text); // output -> comparison vector
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// Example usage
const messages = [
  {"role": "system", "content": "You are a model which is supposed to read a transcription and produce a vector <positive, negative, neutral> based off of what the content of the transcription is, the total of the vector sum must equal to 1."},
];

