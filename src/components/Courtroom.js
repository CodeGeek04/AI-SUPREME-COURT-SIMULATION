import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Courtroom() {
  const caseNum = useParams().caseId;
  const navigate = useNavigate();


  const cases = JSON.parse(localStorage.getItem('cases') || '[]');
  console.log(cases);
  const caseItem = cases.find((item) => item.caseNum === caseNum);
  const [chatMessages, setChatMessages] = useState(caseItem.chatList || []);

  if (!caseItem) {
    return <p>No case found with the provided case number.</p>;
  }

  const handleCloseCase = () => {
    const updatedCases = cases.map((item) => {
      if (item.caseNum === caseNum) {
        return { ...item, status: 'closed' };
      }
      return item;
    });
    localStorage.setItem('cases', JSON.stringify(updatedCases));
    navigate('/');
  };

  // const sleep = (milliseconds) => {
  //   return new Promise((resolve) => setTimeout(resolve, milliseconds));
  // };

  const handleStartProceedings = async (prevAgent) => {
    const agents = ['judge', 
    'defendant', 
    'jury', 
    'defendantLawyer', 
    'plaintiffLawyer', 
    'plaintiff', 
    'witness'];
    const storedCases = JSON.parse(localStorage.getItem('cases'));
    const storedCaseItem = storedCases.find((item) => item.caseNum === caseNum);

    // Initialize chatList as an empty array if it is undefined or null
    const chatList = storedCaseItem.chatList || [];
    const length = chatList.length;

    const filteredAgents = agents.filter((agent) => {
      if (agent === 'jury' && chatList.length <= 5) {
        return false; // Exclude 'jury' if chat list length is less than or equal to 5
      }
      return agent !== prevAgent; // Exclude the previous agent
    });
  // Select a random agent from the filtered agents
    const randomAgent = filteredAgents[Math.floor(Math.random() * filteredAgents.length)];
    // const randomAgent = "defendant";

    // Get the specific agent's response from their respective file
    import(`./agents/${randomAgent}.js`)
      .then(async (agentModule) => {
        // Assuming the agent module exports a function named `getResponse`
        const response = await agentModule.getResponse(chatList);
  
        // Display the response
  
        // Extract caseItem from local storage
  
        // Push the agent and response to the chatList
        const updatedChatList = [...chatList, { agent: randomAgent, msg: response }];
        const updatedState = [...chatList, { agent: randomAgent, msg: response }];
        const updatedCaseItem = { ...storedCaseItem, chatList: updatedChatList };

        setChatMessages(updatedState);
  
        // Update the caseItem in localStorage
        const updatedCases = storedCases.map((item) => {
          if (item.caseNum === caseNum) {
            return updatedCaseItem;
          }
          return item;
        });
        localStorage.setItem('cases', JSON.stringify(updatedCases));
        console.log(updatedCaseItem.chatList);
        console.log("____________________________");
  
        // Recursive call with the updated caseItem
  
        if (randomAgent === 'jury') {
          return; // Return from the function if randomAgent is 'jury'
        }
        else{
          handleStartProceedings(randomAgent);
        }
      });
  };

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div>
      <h2>Case Information</h2>
      <p>Case Number: {caseItem.caseNum}</p>
      <p>Case Info: {caseItem.caseInfo}</p>
      <p>Plaintiff Lawyer: {caseItem.plaintiffLawyer}</p>
      <p>Defendant Lawyer: {caseItem.defendantLawyer}</p>
      <p>Plaintiff Name: {caseItem.plaintiffName}</p>
      <p>Defendant Name: {caseItem.defendantName}</p>
      <p>Judge: {caseItem.judge}</p>
      <button onClick={handleStartProceedings}>Start Proceedings</button>
      <button onClick={handleCloseCase}>Close Case</button>
      <button onClick={handleGoBack}>Go Back to Case List</button>
      <h2>Chat Messages</h2>
      <div>
        {chatMessages.map((message, index) => (
          <div key={index}>
            <p> {message.agent} : {message.msg}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courtroom;