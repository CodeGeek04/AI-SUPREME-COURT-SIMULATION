import React, { useState, useEffect } from 'react';

const CaseList = () => {
  const [cases, setCases] = useState([]);
  const [caseNum, setCaseNum] = useState('');
  const [caseInfo, setCaseInfo] = useState('');
  const [plaintiffLawyer, setPlaintiffLawyer] = useState('');
  const [defendantLawyer, setDefendantLawyer] = useState('');
  const [plaintiffName, setPlaintiffName] = useState('');
  const [defendantName, setDefendantName] = useState('');
  const [judge, setJudge] = useState('');

  useEffect(() => {
    const storedCases = localStorage.getItem('cases');
    if (storedCases) {
      setCases(JSON.parse(storedCases));
    }
  }, []);

  const handleCaseSubmit = (e) => {
    e.preventDefault();
    const newCase = {
      caseNum,
      caseInfo,
      plaintiffLawyer,
      defendantLawyer,
      plaintiffName,
      defendantName,
      judge,
      status: 'open',
      chatList: [{ agent: 'user', msg: `This case is regarding - ${caseInfo}` }],
    };
    const updatedCases = [...cases, newCase];
    localStorage.setItem('cases', JSON.stringify(updatedCases));
    setCases(updatedCases);
    setCaseNum('');
    setCaseInfo('');
    setPlaintiffLawyer('');
    setDefendantLawyer('');
    setPlaintiffName('');
    setDefendantName('');
    setJudge('');
  };

    const handleDeleteAllCases = () => {
        localStorage.removeItem('cases');
        setCases([]);
      };

  const handleCloseCase = (caseNum) => {
    const updatedCases = cases.map((caseItem) => {
      if (caseItem.caseNum === caseNum) {
        return { ...caseItem, status: 'closed' }; // Set the status of the case to 'closed'
      }
      return caseItem;
    });
    localStorage.setItem('cases', JSON.stringify(updatedCases));
    setCases(updatedCases);
  };

  const handleReopenCase = (caseNum) => {
    const updatedCases = cases.map((caseItem) => {
      if (caseItem.caseNum === caseNum) {
        return { ...caseItem, status: 'open' }; // Set the status of the case to 'open'
      }
      return caseItem;
    });
    localStorage.setItem('cases', JSON.stringify(updatedCases));
    setCases(updatedCases);
  };

  const openCases = cases.filter((caseItem) => caseItem.status === 'open');
  const closedCases = cases.filter((caseItem) => caseItem.status === 'closed');

  return (
    <div>
      <h2>Case List</h2>
      <form onSubmit={handleCaseSubmit}>
        <label>
          Case Number:
          <input type="text" value={caseNum} onChange={(e) => setCaseNum(e.target.value)} />
        </label>
        <br />
        <label>
          Case Info:
          <input type="text" value={caseInfo} onChange={(e) => setCaseInfo(e.target.value)} />
        </label>
        <br />
        <label>
          Plaintiff Lawyer:
          <input type="text" value={plaintiffLawyer} onChange={(e) => setPlaintiffLawyer(e.target.value)} />
        </label>
        <br />
        <label>
          Defendant Lawyer:
          <input type="text" value={defendantLawyer} onChange={(e) => setDefendantLawyer(e.target.value)} />
        </label>
        <br />
        <label>
          Plaintiff Name:
          <input type="text" value={plaintiffName} onChange={(e) => setPlaintiffName(e.target.value)} />
        </label>
        <br />
        <label>
          Defendant Name:
          <input type="text" value={defendantName} onChange={(e) => setDefendantName(e.target.value)} />
        </label>
        <br />
        <label>
          Judge:
          <input type="text" value={judge} onChange={(e) => setJudge(e.target.value)} />
        </label>
        <br />
        <button type="submit">Add Case</button>
      </form>
  
      <h3>Open Cases:</h3>
    {openCases.length === 0 ? (
      <p>No open cases found.</p>
    ) : (
      <ul>
        {openCases.map((caseItem) => (
          <li key={caseItem.caseNum}>
            <a href={`/courtroom/${caseItem.caseNum}`}>
              Case Number: {caseItem.caseNum}
            </a>
            <button onClick={() => handleCloseCase(caseItem.caseNum)}>Close Case</button>
          </li>
        ))}
      </ul>
    )}

    <h3>Closed Cases:</h3>
    {closedCases.length === 0 ? (
      <p>No closed cases found.</p>
    ) : (
      <ul>
        {closedCases.map((caseItem) => (
          <li key={caseItem.caseNum}>
            <a href={`/courtroom/${caseItem.caseNum}`}>
              Case Number: {caseItem.caseNum}
            </a>
            <button onClick={() => handleReopenCase(caseItem.caseNum)}>Reopen Case</button>
          </li>
        ))}
      </ul>
    )}

    <button onClick={handleDeleteAllCases}>Delete All Cases</button>
  </div>
);
}

export default CaseList;