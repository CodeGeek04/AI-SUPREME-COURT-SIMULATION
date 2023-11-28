import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import CaseList from './components/CaseList';
import Courtroom from './components/Courtroom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/courtroom/:caseId" element={<Courtroom />} />
        <Route path="/" element={<CaseList />} />
      </Routes>
    </Router>
  );
}

export default App;