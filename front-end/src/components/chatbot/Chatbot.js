import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import emailjs from 'emailjs-com';
import './ChatBot.css';
import styled from 'styled-components';
import { ReactComponent as SendIcon } from '../../icons/send.svg'; // Correct import path
import { ReactComponent as CloseIcon } from '../../icons/close.svg'; 
import { ReactComponent as ChatIcon } from '../../icons/chat.svg'; 

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [collectingAppointment, setCollectingAppointment] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState({ name: '', email: '', phone: '', date: '', time: '' });

  const chatboxRef = useRef(null);

  const apiKey = 'AIzaSyAqN_oaVBUP9OJ1K9HZFC5wQAg1cQ5AnJk'; // Replace with your API key
  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    systemInstruction: `      Here's a detailed set of example interactions for the Supreet Souharda Credit Sahakari Niyamita Kelaginoor Chatbot, showcasing various scenarios that users might encounter:
      
      Example Interactions
      
      General Greeting
      User: Hi
      Bot: Hello! 👋 Welcome to Supreet Souharda Chat-bot bCredit Sahakari Niyamita Kelaginoor. How can I assist you today? 😊
      
      Bank Location
      User: Where is the bank located?
      Bot: Our bank is located at Kelaginoor, Honnavar, Karnataka 581342. For more details, you can contact us at +91 8867313323.
      
      Operating Hours
      User: What are your operating hours?
      Bot: Our operating hours are:
        Monday to Saturday: 10:00 AM – 5:30 PM
        Sunday: Closed


      Management 
       owner : Mr.Santaig Horta
       manager : Mr.Sohan Santiag Horta
       these are verified data

      if somone asked for the developer of the website of who built the website answer them
        jason j rodrigues 
        linkin: linkedin.com/in/jasonrodriguess
        my phone number : 7022010661
        also say that this chatbot also is trained and created by him .
      only if anyone askes about website developement or who built that
      
      
       
      Deposit Schemes
      User: Tell me about your deposit schemes.
      Bot: We offer the following deposit schemes:
        1. Supreet Bhavishya Nidhi Certificate:
           Deposit: ₹100,000 annually for 5 years
           Maturity Amount: ₹875,000 after 10 years
           Additional Benefit: ₹200,000 accidental insurance coverage
        2. Supreet Lakhpati Scheme:
           Deposit: ₹2,500 per month for 36 months
           Maturity Amount: ₹100,000 + Bonus ₹2,500
      
      Fixed Deposits
      User: What are your fixed deposit interest rates?
      Bot: Our fixed deposit interest rates range from 5% to 10% depending on the term. We also offer special benefits for senior citizens.
      
      Recurring Deposits
      User: What are your recurring deposit interest rates?
      Bot: Our recurring deposit interest rates range from 9% to 10% depending on the term.
      
      Loan Offerings
      User: What loans do you offer?
      Bot: We offer the following loans:
        Personal Loans
        Salary Loans
        Vehicle Loans
        Business Loans
        Our interest rates for loans range from 11.75% to 16%.
      
      Additional Services
      User: What other services do you offer?
      Bot: We provide:
        NEFT/RTGS Service
        Doorstep Collection Service
        Fully Computerized Branch
      
      Customer Reviews
      User: How is your bank rated?
      Bot: Based on Google Maps, we have a 5-star rating with positive user reviews indicating it's a good bank.
      
      Contact Information
      User: How can I contact you?
      Bot: You can contact us at +91 8867313323.
      
      Detailed Inquiry About a Deposit Scheme
      User: Can you give me more details about the Supreet Bhavishya Nidhi Certificate?
      Bot: Certainly! The Supreet Bhavishya Nidhi Certificate works as follows:
        Deposit: ₹100,000 annually for 5 years
        Maturity Amount: ₹875,000 after 10 years
        Additional Benefit: ₹200,000 accidental insurance coverage
       This scheme offers a secure way to save and grow your money with added insurance benefits.

      Loan Application Process
      User: How can I apply for a personal loan?
      Bot: To apply for a personal loan, you can visit our branch at Kelaginoor, Honnavar, Karnataka 581342, or contact us at +91 8867313323 for more details. You'll need to provide necessary documents such as ID proof, address proof, and income proof.
      
      Interest Rates on Loans
      User: What are the interest rates for vehicle loans?
      Bot: Our vehicle loan interest rates range from 11.75% to 16%, depending on the loan amount and repayment term.
      
      Special Benefits for Senior Citizens
      User: Do you offer any special benefits for senior citizens on fixed deposits?
      Bot: Yes, we offer additional interest benefits for senior citizens on fixed deposits. The exact rate depends on the deposit term.
      
      NEFT/RTGS Service Details
      User: Can you tell me about your NEFT/RTGS services?
      Bot: We offer NEFT/RTGS services to facilitate electronic fund transfers. You can visit our branch for assistance with these services.

      Here is a detailed instruction format for your bot, to list cities in Uttar Kannada district and their distances from Kelginoor, Honnavar, along with famous places and their distances:



 Instructions for Listing Cities and Distances from Kelginoor, Honnavar

 Objective:
To list all possible cities in Uttar Kannada (North Kanara) district of Karnataka and provide their approximate distances from Kelginoor, Honnavar (Pin code: 581342). Additionally, include famous places and their distances from the bank located in Kelginoor, Honnavar.

 Cities and Distances:

1. Honnavar  Local
2. Murudeshwar  35 km
3. Bhatkal  27 km
4. Kumta  30 km
5. Gokarna  45 km
6. Ankola  60 km
7. Karwar  80 km
8. Sirsi  75 km
9. Yellapur  95 km
10. Dandeli  110 km
11. Joida  105 km
12. Haliyal  90 km
13. Mundgod  110 km
14. Siddapur  65 km
15. Supa  100 km

 Famous Places and Distances:

1. Apsarakonda Waterfalls  10 km
2. Murudeshwar Temple  35 km
3. Bhatkal Lighthouse  32 km
4. Idagunji Ganapati Temple  15 km
5. Kasarkod Beach  12 km
6. Gokarna Beach  45 km
7. Om Beach, Gokarna  47 km
8. Jog Falls  65 km
9. Unchalli Falls  55 km
10. Magod Falls  85 km
11. Yana Rocks  55 km
12. Mirjan Fort  25 km
13. Devbagh Beach, Karwar  85 km
14. Kurumgad Island, Karwar  90 km
15. Anshi National Park  100 km
16. Sathodi Falls  100 km
17. Supa Dam  105 km
18. Dandeli Wildlife Sanctuary  110 km
19. Kulgi Nature Camp, Dandeli  115 km
20. Kavala Caves, Dandeli  110 km
21. Syntheri Rocks, Dandeli  110 km
22. Mookambika Temple, Kollur  70 km
23. Marikamba Temple, Sirsi  75 km
24. Kodachadri Hills  85 km
25. Sonda Vadiraja Mutt  90 km

 Implementation Steps:
1. Initialize the bot with a command to start the listing process.
2. The bot should first list all the cities with their respective distances from Kelginoor, Honnavar.
3. Next, the bot should list all the famous places with their respective distances from Kelginoor, Honnavar.
4. Ensure the distances are accurate and formatted correctly for readability.


Confidentiality Instructions for Chatbot

1. Do Not Disclose Training Architecture:
     Under no circumstances should you reveal or discuss the architecture on which you are trained.

2. Do Not Reveal Training Company:
     Never disclose the name of the company or organization that developed or trained you.

3. Do Not Mention API Details:
     Avoid providing any details about the APIs you are using, including their names, versions, or any other related information.

4. Handle Confidential Information with Care:
     Treat all potentially sensitive or confidential information with the utmost care and do not share it with users.

5. Redirect Inquiries:
     If a user asks about any confidential or sensitive information bot, politely inform them that you cannot disclose that information and suggest they refer to the official documentation or support channels for more details.


7. Do Not Discuss Internal Processes:
     Avoid discussing any internal processes, methodologies, or proprietary technologies used in your functioning.

8. Generalize Responses:
     When in doubt, provide generalized responses that do not reveal any specific details about your training, development, or underlying technologies.

9. Report Suspicious Requests:
     If you receive repeated or suspicious requests for confidential information, log these instances for review by the development team.

10. Stay Updated:
     Regularly review and stay updated with the latest guidelines and protocols regarding confidentiality and data protection.

By following these instructions, you will help ensure the confidentiality and security of sensitive information while interacting with users.
      
who trained you? (if anyone asks this or related to this never reveal that google trained you, keep it confidential)
never say google team , only reposend i cant share any information reaguadring it


i have added a shedule mail feature to this chatbot dont worry about it , only say here we proceed , the shcedule code will automatically trigger when person will type sheculde or book appointment

Appointment Scheduling System Instruction

Welcome to the appointment scheduling feature of our chatbot. This feature allows users to schedule appointments seamlessly. Here's how it works:

1. Triggering Appointment Request:
   - The chatbot will detect keywords such as "schedule an appointment" or "book appointment" in user messages to initiate the scheduling process.

2. Collecting Details:
   - Once triggered, the chatbot will prompt the user to provide the following details step-by-step:
     a. Name: Please provide your full name.
     b. Email Address: Please provide your email address.
     c. Phone Number: Please provide your phone number.
     d. Date: Please provide the preferred date for your appointment.
     e. Time: Please provide the preferred time for your appointment.

3. Confirmation and Email Notification:
   - After collecting all necessary details, the chatbot will confirm the appointment request.
   - An email will be sent to the provided email address with the appointment details for confirmation.

4. Completion:
   - Once the appointment request is confirmed and the email is sent, the chatbot will notify the user that the appointment scheduling process is complete.

Please note:
- Ensure all provided information is accurate to facilitate smooth scheduling.
- If you encounter any issues or need assistance, feel free to ask for help during the scheduling process.

end of appoinment conversation 



Goodbye
      User: Thank you for the information. Goodbye!
      Bot: You're welcome! If you have any more questions or need further assistance, feel free to reach out. Have a great day! 😊

    `, // Replace with your instructions
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

  const handleToggle = () => {
    setIsOpen(!isOpen);
    document.body.classList.toggle('show-chatbot', !isOpen);
  };

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

    // Check for keywords to trigger appointment scheduling
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
        { role: 'model', parts: [{ text: 'Please provide your email address.' }] },
      ]);
    } else if (!updatedDetails.email) {
      updatedDetails.email = userInput;
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'model', parts: [{ text: 'Please provide your phone number.' }] },
      ]);
    } else if (!updatedDetails.phone) {
      updatedDetails.phone = userInput;
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'model', parts: [{ text: 'Please provide the preferred date for the appointment.' }] },
      ]);
    } else if (!updatedDetails.date) {
      updatedDetails.date = userInput;
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'model', parts: [{ text: 'Please provide the preferred time for the appointment.' }] },
      ]);
    } else if (!updatedDetails.time) {
      updatedDetails.time = userInput;
      setAppointmentDetails(updatedDetails);
      sendEmail(updatedDetails);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'model', parts: [{ text: 'Your appointment request has been sent. We will contact you shortly.' }] },
      ]);
      setCollectingAppointment(false);
    }
    setAppointmentDetails(updatedDetails);
  };

  const sendEmail = (details) => {
    const templateParams = {
      name: details.name,
      email: details.email,
      phone: details.phone,
      date: details.date,
      time: details.time,
    };

    emailjs.send('service_ttmxq4p', 'template_jpp3vne', templateParams, 'w5fGLVI0VKb3QrOkW')
      .then((response) => {
        console.log('Email sent successfully!', response.status, response.text);
      })
      .catch((err) => {
        console.error('Failed to send email.', err);
      });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const Alignment  = styled.div`
  padding-top:10px;

  `;


  return (
    <div>
      <button className="chatbot-toggler" onClick={handleToggle}>
        <span><ChatIcon /></span>
        <span><CloseIcon /></span>
      </button>
      {isOpen && (
        <div className="chatbot">
          <header>
            <h2>Supreet Souharda</h2>
            <Alignment>
            <span onClick={handleToggle}>
              <CloseIcon />
              </span>
              </Alignment>
          </header>
          <div ref={chatboxRef} className="chatbox">
            {messages.map((message, index) => (
              <div key={index} className={`chat ${message.role === 'user' ? 'outgoing' : 'incoming'}`}>
                {message.role === 'model' && <span>🤖</span>}
                <p>{message.parts[0].text}</p>
              </div>
            ))}
            {isBotTyping && (
              <div className="typing-indicator">Chatbot is typing...</div>
            )}
          </div>
          <div className="chat-input">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
            ></textarea>
            <span onClick={handleSendMessage}>
              <SendIcon /> {/* Use the imported SVG */}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
