import React, { useEffect, useState } from 'react';

import logo from './logo.svg';
import * as C from './App.styles';
import TaskList from './components/TaskList/TaskList';
import ListsRow from './components/ListsRow/ListsRow';
import Task from './components/Task/Task';

import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

import { useAppSelector, useAppDispatch } from './app/hooks';
import { update } from './app/tasklistsReducer/tasklistsSlice'
import { TasklistsState, TaskState } from './app/types';
import { Result, reorder, id2List, getItemStyle, taskslists, reorderList } from './app/utils'


function App() {
  const mData = useAppSelector((state) => state)
  const dispatch = useAppDispatch();

  const [state, setState] = useState<TasklistsState>({
    todo: Array.from(mData.todo) as Array<TaskState>,
    progress: Array.from(mData.progress) as Array<TaskState>,
    done: Array.from(mData.done) as Array<TaskState>,
    new: Array.from(mData.new) as Array<TaskState>,
  });

  useEffect(() => {
    dispatch(update(state));
  }, [state, dispatch])

  const move = (source, destination, droppableSource, droppableDestination): Result => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);

    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    let result = {} as Result;

    result[droppableSource.droppableId] = reorderList(sourceClone);
    result[droppableDestination.droppableId] = reorderList(destClone);
    if (!result.droppable) result.droppable = mData.todo;
    if (!result.droppable2) result.droppable2 = mData.progress;
    if (!result.droppable3) result.droppable3 = mData.done;
    if (!result.droppable4) result.droppable4 = mData.new;

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
      } else if (source.droppableId === 'droppable4') {
        _state = { new: items }
      }

      setState({ ...state, ...{ _state } });
    } else {
      const result: Result = move(
        getList(source.droppableId),
        getList(destination.droppableId),
        source,
        destination
      );

      let _state = {
        ...state,
        ...{
          todo: result.droppable as Array<TaskState>,
          progress: result.droppable2 as Array<TaskState>,
          done: result.droppable3 as Array<TaskState>,
          new: result.droppable4 as Array<TaskState>
        }
      }

      setState({
        todo: Array.from({ ..._state }.todo),
        progress: Array.from({ ..._state }.progress),
        done: Array.from({ ..._state }.done),
        new: Array.from({ ..._state }.new),
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
          <Droppable droppableId='new'>
            {(provided, snapshot) => (
              <div ref={provided.innerRef}>
                <div className="newTaskPlaceholder">
                  <Draggable draggableId='droppable4' index={0}>
                    {(_provided, _snapshot) => (
                      <div ref={_provided.innerRef}
                        {..._provided.draggableProps}
                        {..._provided.dragHandleProps}
                        style={{...getItemStyle(
                          _snapshot.isDragging,
                          _provided.draggableProps.style,
                          {width: '358px'}
                        )}}>
                        <Task _props={{ id: 999, listName: 'new' }}></Task>
                      </div>
                    )}
                  </Draggable>
                </div>
              </div>
            )}
          </Droppable>

        </C.AppHeader>

        <ListsRow>
          {
            taskslists?.map((list, k) => {
              if (list.name === 'droppable4') return (<></>)
              else return (
                <Droppable droppableId={list.name} key={list.id}>
                  {(provided, snapshot) => (
                    <div ref={provided.innerRef}>
                      <TaskList title={list.title}>
                        {getList(list.name)?.sort(function (a, b) {
                          console.log(list.name)
                          return a.index < b.index ? -1 : a.index > b.index ? 1 : 0;
                        })
                          .map((item: TaskState, index) =>
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
                                    _provided.draggableProps.style,
                                    {}
                                  )}>

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
