import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

/*Notice how we're importing App from ./App
index.js is basically where the DOM of react is being called 
to render stuff. It is in strictmode and simply calls App which
has all the info on how to render the element (a div in this case inside of
  index.html) with css and other templates or whatever named 'root'.*/

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

