import React, { Component, useState } from 'react';
import { ReactDOM } from 'react';

import logo from './logo.svg';
import * as C from './App.styles';
import TaskList from './components/TaskList/TaskList';
import ListsRow from './components/ListsRow/ListsRow';
import Task from './components/Task/Task';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


const getItems = (count, offset = 0): Array<Object> => {
  return Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k + offset}`,
    content: `item ${k + offset}`
  }));
}

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

interface Result {
  droppable: Array<Object>,
  droppable2: Array<Object>,
  droppable3: Array<Object>,
}

const id2List = {
  droppable: 'todo',
  droppable2: 'progress',
  droppable3: 'done'
};

interface State { todo: void; progress: void; done: void; }

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  background: "#F2F2F2",
  borderRadius: '20px',
  border: 0,

  // styles we need to apply on draggables
  ...draggableStyle,
});

const taskslists = [{ title: "To-do", id: "todo", name: "droppable" }, { title: "In Progress", id: "progress", name: "droppable2" }, { title: "Done", id: "done", name: "droppable3" }]

function App() {
  const move = (source, destination, droppableSource, droppableDestination): Result => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    let result = {} as Result;
    /* console.log(sourceClone) */
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    if (!result.droppable) result.droppable = state.todo;
    if (!result.droppable2) result.droppable2 = state.progress;
    if (!result.droppable3) result.droppable3 = state.done;

    return result;
  };

  const [state, setState] = useState({
    todo: getItems(8),
    progress: getItems(2, 8),
    done: getItems(2, 10),
  });

  const getList = (id) => state[id2List[id]];

  const onDragEnd = (result) => {
    const { source, destination } = result;
    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        getList(source.droppableId),
        source.index,
        destination.index
      );

      let _state;

      if (source.droppableId === 'droppable2') {
        _state = { progress: items };
      } else if (source.droppableId === 'droppable') {
        _state = { todo: items};
      } else if (source.droppableId === 'droppable3') { 
        _state = { done: items}
      }

      setState({...state, ..._state});
    } else {
      const result: Result = move(
        getList(source.droppableId),
        getList(destination.droppableId),
        source,
        destination
      );
      
      console.log("RESULT")
      console.log(result);
      
      let _state = {
        todo: { ...result.droppable} ,
        progress: { ...result.droppable2 },
        done: { ...result.droppable3 }
      }

      console.log(_state);

      setState({
        todo: result.droppable as Array<any>,
        progress: result.droppable2 as Array<any>,
        done: result.droppable3 as Array<any>
      });

      /* console.log(state) */;
    }
  };

  let list;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
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
          {
            taskslists?.map((list, k) => {
              return (
                <Droppable droppableId={list.name} key={list.id}>
                  {(provided, snapshot) => (
                    <div ref={provided.innerRef}>

                      <TaskList title={list.title}>
                        {getList(list.name).map?console.log("AQUIIII"):''}
                        {getList(list.name).map?console.log(getList(list.name)):''}

                        {getList(list.name)?.map((item, index) =>
                        (
                          <Draggable
                            draggableId={item.id}
                            index={index}
                            key={item.id}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={getItemStyle(
                                  snapshot.isDragging,
                                  provided.draggableProps.style
                                )}>

                                <Task>
                                </Task>
                              </div>
                            )}
                          </Draggable>
                        )
                        )}
                      </TaskList>
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              )
            })
          }
        </ListsRow>

      </C.AppBackground>
    </DragDropContext>
  );
}

export default App;
