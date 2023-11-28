import React, { useState } from 'react';
// import { Button, Text, View } from 'react-native';

const CaseScreen = () => {
  const [caseStatus, setCaseStatus] = useState('Pending');

  const handleStartCase = () => {
    setCaseStatus('In Progress');
  };

  const handleFinishCase = () => {
    setCaseStatus('Completed');
  };

  return (
    <div>
      <p>Case Status: {caseStatus}</p>
      {caseStatus === 'Pending' && (
        <button onClick={handleStartCase}>Start Case</button>
      )}
      {caseStatus === 'In Progress' && (
        <button onClick={handleFinishCase}>Finish Case</button>
      )}
    </div>
  );
};

export default CaseScreen;