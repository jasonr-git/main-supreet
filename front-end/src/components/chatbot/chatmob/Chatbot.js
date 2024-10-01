import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { GoogleGenerativeAI } from '@google/generative-ai';
import emailjs from 'emailjs-com';
import { ReactComponent as SendIcon } from '../../../icons/send.svg';
import { ReactComponent as Bot2 } from '../../../icons/bot2.svg'; 

// Styled Components
const ChatbotWrapper = styled.div`
  position: fixed;
  right: -40%;
  top: 50%;
  transform: translate(-50%, -50%); // Center horizontally and vertically
  width: 90vw;
  max-width: 420px;
  height: 70vh;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(15px);
  border-radius: 15px;
  overflow: hidden;
  opacity: 1;
  pointer-events: auto;
  box-shadow: 0 0 128px 0 rgba(0, 0, 0, 0.1), 0 32px 64px -48px rgba(0, 0, 0, 0.5);
  transition: all 0.1s ease;
`;

const ChatbotHeader = styled.header`
  padding: 16px 0;
  position: relative;
  text-align: center;
  color: #fff;
  background: linear-gradient(45deg, rgba(255, 0, 0, 0.4), rgba(0, 0, 255, 0.4));
  backdrop-filter: blur(25px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  h2 {
    font-size: 1.5rem;
    color: #f2f2f2;
    border-radius: 25px;
  }
`;

const Chatbox = styled.div`
  overflow-y: auto;
  height: calc(100% - 80px);
  padding: 20px 10px;

  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background: #fff;
    border-radius: 25px;
  }

  ::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 25px;
  }
`;

const Chat = styled.div`
  display: flex;
  list-style: none;
  justify-content: ${({ role }) => (role === 'user' ? 'flex-end' : 'flex-start')};
  margin: 20px 0;

  span {
    width: 32px;
    height: 32px;
    color: #fff;
    cursor: default;
    display: ${({ role }) => (role === 'model' ? 'flex' : 'none')};
    align-items: center;
    justify-content: center;
    background: #000000;
    border-radius: 50%;
    margin-right: 10px;

    svg {
      width: 24px;
      height: 24px;
    }
  }

  p {
    white-space: pre-wrap;
    padding: 12px 16px;
    border-radius: 20px;
    max-width: 75%;
    font-size: 0.95rem;
    background: ${({ role }) => (role === 'user' ? '#b2dcff' : '#f2f2f2')};
    color: #000;
    border-radius: ${({ role }) => (role === 'user' ? '20px 20px 0 20px' : '20px 20px 20px 0')};
  }
`;

const TypingIndicator = styled.div`
  font-style: italic;
  color: #dcdcdc;
  font-size: small;
`;

const ChatInputWrapper = styled.div`
  display: flex;
  gap: 5px;
  position: absolute;
  bottom: 0;
  width: 100%;
  background: #fff;
  padding: 10px 15px;
  border-top: 1px solid #ddd;
`;

const TextArea = styled.textarea`
  height: 55px;
  width: 100%;
  border: none;
  outline: none;
  resize: none;
  max-height: 180px;
  padding: 10px;
  font-size: 1rem;

  &:valid ~ span {
    visibility: visible;
  }
`;

const SendButton = styled.span`
  align-self: flex-end;
  color: #000000;
  cursor: pointer;
  height: 55px;
  display: flex;
  align-items: center;
  font-size: 1.5rem;

  svg {
    width: 28px;
    height: 28px;
  }
`;

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [collectingAppointment, setCollectingAppointment] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState({ name: '', email: '', phone: '', date: '', time: '' });

  const chatboxRef = useRef(null);

  const apiKey = 'YOUR_API_KEY'; // Replace with your API key
  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: 'text/plain',
  };

  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    const userMessage = { role: 'user', parts: [{ text: input }] };
    setMessages([...messages, userMessage]);

    if (collectingAppointment) {
      handleAppointmentInput(input);
      setInput('');
      return;
    }

    setIsBotTyping(true);

    const chatSession = await model.startChat({
      generationConfig,
      history: [...messages, userMessage],
    });

    const result = await chatSession.sendMessage(input);
    const sanitizedResponse = result.response.text().replace(/\*\*/g, '');

    const botMessage = { role: 'model', parts: [{ text: sanitizedResponse }] };
    setMessages([...messages, userMessage, botMessage]);

    if (input.toLowerCase().includes('schedule an appointment') || input.toLowerCase().includes('book an appointment')) {
      setCollectingAppointment(true);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'model', parts: [{ text: 'Sure, I can help with that. Please provide your name.' }] },
      ]);
    }

    setIsBotTyping(false);
    setInput('');
  };

  const handleAppointmentInput = (userInput) => {
    const updatedDetails = { ...appointmentDetails };

    if (!updatedDetails.name) {
      updatedDetails.name = userInput;
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'model', parts: [{ text: 'Great, can you provide your email address?' }] },
      ]);
    } else if (!updatedDetails.email) {
      updatedDetails.email = userInput;
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'model', parts: [{ text: 'Now, please share your phone number.' }] },
      ]);
    } else if (!updatedDetails.phone) {
      updatedDetails.phone = userInput;
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'model', parts: [{ text: 'Which date would you prefer?' }] },
      ]);
    } else if (!updatedDetails.date) {
      updatedDetails.date = userInput;
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'model', parts: [{ text: 'Lastly, what time works best for you?' }] },
      ]);
    } else if (!updatedDetails.time) {
      updatedDetails.time = userInput;
      setAppointmentDetails(updatedDetails);
      sendAppointmentEmail(updatedDetails);
    }

    setAppointmentDetails(updatedDetails);
    setInput('');
  };

  const sendAppointmentEmail = (appointmentDetails) => {
    const templateParams = {
      name: appointmentDetails.name,
      email: appointmentDetails.email,
      phone: appointmentDetails.phone,
      date: appointmentDetails.date,
      time: appointmentDetails.time,
    };

    emailjs.send('your-service-id', 'your-template-id', templateParams, 'your-user-id')
      .then(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { role: 'model', parts: [{ text: 'Your appointment has been scheduled successfully!' }] },
        ]);
        setCollectingAppointment(false);
        setAppointmentDetails({ name: '', email: '', phone: '', date: '', time: '' });
      })
      .catch(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { role: 'model', parts: [{ text: 'There was an error scheduling your appointment. Please try again later.' }] },
        ]);
      });
  };

  return (
    <ChatbotWrapper>
      <ChatbotHeader>
        <h2>Supreet Souharda</h2>
      </ChatbotHeader>
      <Chatbox ref={chatboxRef}>
        {messages.map((message, index) => (
          <Chat key={index} role={message.role}>
            <span>{message.role === 'model' && <Bot2 />}</span>
            <p>{message.parts[0].text}</p>
          </Chat>
        ))}
        {isBotTyping && <TypingIndicator>Bot is typing...</TypingIndicator>}
      </Chatbox>

      <ChatInputWrapper>
        <TextArea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          required
        />
        <SendButton onClick={handleSendMessage}><SendIcon /></SendButton>
      </ChatInputWrapper>
    </ChatbotWrapper>
  );
};

export default ChatBot;
