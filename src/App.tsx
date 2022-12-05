import React from 'react';
import logo from './logo.svg';
import * as C from './App.styles';
import TaskList from './components/TaskList/TaskList';
import ListsRow from './components/ListsRow/ListsRow';

function App() {
  return (
    <C.AppBackground>
      <C.AppHeader>
        <C.AppLogo src={logo} alt="logo" />

        <C.AppWelcome>
          Room of Thoughts
        </C.AppWelcome>
        <C.AppSplash>
          Don't think, throw in the room
        </C.AppSplash>

      </C.AppHeader>

      <ListsRow>
        <TaskList title={"To-do"}></TaskList>
        <TaskList title={"In Progress"}></TaskList>
        <TaskList title={"Done"}></TaskList>
      </ListsRow>
      
    </C.AppBackground>
  );
}

export default App;
