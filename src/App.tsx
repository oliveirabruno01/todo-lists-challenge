import React from 'react';
import logo from './logo.svg';
import * as C from './App.styles'; 

function App() {
  return (
    <div className="App">
      <C.AppHeader>
        <C.AppLogo src={logo} alt="logo" />

        <C.AppWelcome>
          Room of Thoughts
        </C.AppWelcome>
        <C.AppSplash>
          Don't think, throw in the room
        </C.AppSplash>

      </C.AppHeader>
    </div>
  );
}

export default App;
