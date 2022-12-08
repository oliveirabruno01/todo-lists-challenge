import React, { Component, useCallback, useEffect, useState } from 'react';
import { ReactDOM } from 'react';

import logo from './logo.svg';
import * as C from './App.styles';
import TaskList from './components/TaskList/TaskList';
import ListsRow from './components/ListsRow/ListsRow';
import Task from './components/Task/Task';

import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

import { useAppSelector, useAppDispatch } from './app/hooks';
import { update, moveTask } from './app/tasklists/tasklistsSlice'
import { TasklistsState, TaskState } from './app/types';

let off_set = 0;

const reorder = (_list, startIndex, endIndex, _state, _listId) => {
  console.log(_list)
  /* 
  0
  1 
  */
  let list = _list;

  let taskIndex: number = list.indexOf(list.find((_task: any) => {
    ;
    return _task.index === startIndex
  }))


  let taskNewIndex: number = list.indexOf(list.find((x: any) => {
    return x.index === endIndex
  }))

  let removedObj = list.find((_task: any) => {
    ;
    return _task.index === startIndex
  })
  let rObj = { ...removedObj } as TaskState;
  rObj.index = endIndex;
  console.log(rObj)

  let insertedObj: any = list.find((_task: any) => {
    return _task.index === endIndex
  })
  let iObj = { ...insertedObj } as TaskState;
  iObj.index = startIndex;
  console.log(iObj)

  list.splice(taskIndex, 1, rObj);
  list.splice(taskNewIndex, 1, iObj)

  console.log(list)
  return list;
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
  const mData = useAppSelector((state) => state)
  const dispatch = useAppDispatch();

  const setMData = (s) => dispatch(update(s));
  /* console.log(mData)
  console.log() */

  const [state, setState] = useState<TasklistsState>({
    todo: Array.from(mData.todo) as Array<TaskState>,
    progress: Array.from(mData.progress) as Array<TaskState>,
    done: Array.from(mData.done) as Array<TaskState>,
  });

  useEffect(() => {
    dispatch(update(state));
  }, [state])


  const reorderList = (list) => {
    const tList = JSON.parse(JSON.stringify(list))
    let newIndex = 0;
    console.log(tList)
    for (const item in tList) {
      if (list[item]) {
        tList[item].index = newIndex
        newIndex++;
      };
    }
    console.log(tList)
    return tList;
  }

  const move = (source, destination, droppableSource, droppableDestination): Result => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    /*     console.log("DSDSA")
        console.log(droppableSource.index)
        console.log(droppableDestination.index) */

    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    let result = {} as Result;

    result[droppableSource.droppableId] = reorderList(sourceClone);
    result[droppableDestination.droppableId] = reorderList(destClone);
    if (!result.droppable) result.droppable = mData.todo;
    if (!result.droppable2) result.droppable2 = mData.progress;
    if (!result.droppable3) result.droppable3 = mData.done;

    return result;
  };

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
        destination.index,
        state,
        id2List[source.droppableId]
      );

      let _state;

      if (source.droppableId === 'droppable2') {
        _state = { progress: items };
      } else if (source.droppableId === 'droppable') {
        _state = { todo: items };
      } else if (source.droppableId === 'droppable3') {
        _state = { done: items }
      }
      console.log(_state)
      setState({ ...state, ...{ _state } });
    } else {
      const result: Result = move(
        getList(source.droppableId),
        getList(destination.droppableId),
        source,
        destination
      );

      let _state = { ...state,
        ...{
        todo: result.droppable as Array<TaskState>,
        progress: result.droppable2 as Array<TaskState>,
        done: result.droppable3 as Array<TaskState>
      }
    }

    setState({
      todo: Array.from({ ..._state }.todo),
      progress: Array.from({ ..._state }.progress),
      done: Array.from({ ..._state }.done),
    })
  }
};

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
                      {/*                         {console.log()}
                        {console.log("LIST")}
                        {console.log(getList(list.id))}
                        {console.log()} */}
                      {getList(list.name)?.sort(function (a, b) {
                        return a.index < b.index ? -1 : a.index > b.index ? 1 : 0;
                      }).map((item: TaskState, index) =>
                      (
                        <Draggable
                          draggableId={`${item.id}`}
                          index={item.index}
                          key={item.id}
                        >

                          {(_provided, _snapshot) => (
                            <div
                              ref={_provided.innerRef}
                              {..._provided.draggableProps}
                              {..._provided.dragHandleProps}
                              style={getItemStyle(
                                _snapshot.isDragging,
                                _provided.draggableProps.style
                              )}>
                              {/* {console.log("TASK")}
                                  {console.log(item)}
                                  {console.log()} */}
                              <Task _props={{ id: item.id, listName: list.id }} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </TaskList>
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
