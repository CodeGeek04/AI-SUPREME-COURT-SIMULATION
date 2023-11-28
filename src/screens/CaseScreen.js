import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';

const CaseScreen = () => {
  const [caseStatus, setCaseStatus] = useState('Pending');

  const handleStartCase = () => {
    setCaseStatus('In Progress');
  };

  const handleFinishCase = () => {
    setCaseStatus('Completed');
  };

  return (
    <View>
      <Text>Case Status: {caseStatus}</Text>
      {caseStatus === 'Pending' && (
        <Button title="Start Case" onPress={handleStartCase} />
      )}
      {caseStatus === 'In Progress' && (
        <Button title="Finish Case" onPress={handleFinishCase} />
      )}
    </View>
  );
};

export default CaseScreen;