const formatName = (name) => {
  return name.toUpperCase();
};

const calculateAge = (birthYear) => {
  const currentYear = new Date().getFullYear();
  return currentYear - birthYear;
};

export { formatName, calculateAge };