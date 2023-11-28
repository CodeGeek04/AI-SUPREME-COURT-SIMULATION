import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import HomeScreen from './HomeScreen'; // Import the HomeScreen component

ReactDOM.render(
  <React.StrictMode>
    <App>
      <HomeScreen /> {/* Render the HomeScreen component */}
    </App>
  </React.StrictMode>,
  document.getElementById('root')
);

// module.exports = {
//   api,
//   helpers,
// };