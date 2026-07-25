import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Get the root element from the HTML
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// Create the React root and render the main App component
// React.StrictMode activates additional checks and warnings for its descendants.
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);