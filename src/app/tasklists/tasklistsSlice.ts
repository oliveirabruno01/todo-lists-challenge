import { createSlice, current, Draft, PayloadAction } from '@reduxjs/toolkit'
import { TasklistsState, TaskState } from '../types';

const mockedData: TasklistsState = {
  todo: [
    {
      title: "First Task - todo",
      description: "This is the first task from: todo",
      indicator: 'dot',
      open: false,
      id: 0,
      index: 0
    },
    {
      title: "Second Task - todo",
      description: "This is the second task from: todo",
      indicator: 'dot',
      open: false,
      id: 1,
      index: 1
    },
    {
      title: "Thirdy Task - todo",
      description: "This is the Thirdy task from: todo",
      indicator: 'dot',
      open: false,
      id: 2,
      index: 2
    },
  ],
  progress: [
    {
      title: "First Task - progress",
      description: "This is the first task from: progress",
      indicator: 'dot',
      open: false,
      id: 3,
      index: 0
    },
    {
      title: "Second Task - progress",
      description: "This is the second task from: progress",
      indicator: 'dot',
      open: false,
      id: 4,
      index: 1
    },
  ],
  done: [
    {
      title: "First Task - done",
      description: "This is the first task from: done",
      indicator: 'dot',
      open: false,
      id: 5,
      index: 0
    },
    {
      title: "Second Task - done",
      description: "This is the second task from: done",
      indicator: 'dot',
      open: false,
      id: 6,
      index: 1
    },
    {
      title: "Thirdy Task - done",
      description: "This is the Thirdy task from: done",
      indicator: 'dot',
      open: false,
      id: 7,
      index: 2
    },
    {
      title: "Fourth Task - done",
      description: "This is the Fourth task from: done",
      indicator: 'dot',
      open: false,
      id: 8,
      index: 3
    },
    {
      title: "Fifth Task - done",
      description: "This is the Fifty task from: done",
      indicator: 'dot',
      open: false,
      id: 9,
      index: 4
    },
    {
      title: "Sixty Task - done",
      description: "This is the Sixty task from: done",
      indicator: 'dot',
      open: false,
      id: 10,
      index: 5
    },
  ],
}

const getTaskData = (taskId: number, _state: TasklistsState): {props: TaskState, tasklist: string, taskIndex: number} => {
  let taskData;
  let index = 0;

  for (const list in _state) {
    let listObj: TasklistsState = _state[list];
    for (const task in listObj) {
      let taskObj: TaskState = listObj[task];
      if (taskObj.id == taskId) {
        taskData = {props: taskObj, tasklist:list, taskIndex: index};
        index++;
      }
    }
  }
  return taskData;
}

export const tasklistsSlice = createSlice({
  name: 'tasklists',
  initialState: mockedData,
  reducers: {
    update: (state, action: PayloadAction<TasklistsState>) => {
      state = {...state, ...action.payload}
      console.log(state)
    },
    updateTaskById: (state, action: PayloadAction<{id: number, state: TaskState}>) => {
      let task: TaskState = action.payload.state;
      let taskData = getTaskData(action.payload.id, current(state));
      let newTaskState: TaskState = {...taskData.props, ...task};
      state[taskData.tasklist][taskData.props.index] = newTaskState;
    },
    moveTask: (state, action: PayloadAction<{source: [], dest: [], paths: [string, string], index: number}>) => {
      /* console.log(current(state)) */
      let source = action.payload.source;
      let dest = action.payload.dest;
      let index = action.payload.index;
      let paths = action.payload.paths;

      /* console.log(current(state))
 */
      const [removed] = source.splice(index, 1);
      dest.splice(index, 0, removed);

      let changes: TasklistsState = {todo: [], progress: [], done: []}
      changes[paths[0]] = source;
      changes[paths[1]] = dest;

      let newState = {...current(state), ...changes}

      if (newState.todo.length === 0) newState.todo = current(state).todo
      if (newState.progress.length === 0) newState.progress = current(state).progress
      if (newState.done.length === 0) newState.done = current(state).done

      /* console.log(newState) */
      
      state = newState;
    },
  },
})

// Action creators are generated for each case reducer function
export const { update, updateTaskById, moveTask } = tasklistsSlice.actions

export default tasklistsSlice.reducer