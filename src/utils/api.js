const fetchCases = async () => {
  try {
    const response = await fetch('/api/cases');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching cases:', error);
    throw error;
  }
};

const fetchLawyers = async () => {
  try {
    const response = await fetch('/api/lawyers');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching lawyers:', error);
    throw error;
  }
};

export { fetchCases, fetchLawyers };