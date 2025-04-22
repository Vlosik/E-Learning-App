const axios = require('axios');

const sendMessage = async (prompt) => {
    const response = await axios.post('http://localhost:11434/api/generate', {
      model: 'gemma:2b',
      prompt,
      stream: false,
      options: {
        temperature: 0.5,
        top_p: 0.9,
        top_k: 40,
        repeat_penalty: 1.2,
        num_predict: 200
      }
    });
  
    return response.data.response;
};
  
module.exports = { 
    sendMessage
 };