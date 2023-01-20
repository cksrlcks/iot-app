import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

//mock server (browser service worker)
const { worker } = require('./mocks/browser');
worker.start({
    onUnhandledRequest: 'bypass',
    scope: '/api',
    quiet: true,
});

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
