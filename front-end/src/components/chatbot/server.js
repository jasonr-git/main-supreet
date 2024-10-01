const express = require('express');
const bodyParser = require('body-parser');
const {
  GoogleGenerativeAI,
} = require('@google/generative-ai');

const app = express();
const port = 3001;

const apiKey = 'AIzaSyAqN_oaVBUP9OJ1K9HZFC5wQAg1cQ5AnJk';
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
  systemInstruction: 'Welcome to Supreet Souharda Credit Sahakari Niyamita Kelaginoor! Feel free to ask any questions or for more details about our services.',
});

const generationConfig = {
  temperature: 0.55,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: 'text/plain',
};

app.use(bodyParser.json());

app.post('/api/chat', async (req, res) => {
  const { message, history } = req.body;

  try {
    const chatSession = model.startChat({
      generationConfig,
      history,
    });

    const result = await chatSession.sendMessage(message);
    res.json({ response: result.response.text() });
  } catch (error) {
    res.status(500).send({ error: 'Error communicating with the AI model' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
