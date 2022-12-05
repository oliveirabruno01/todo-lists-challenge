import React from 'react';
import * as C from './TaskList.styles';
import Task, { GetTaskProps}  from '../Task/Task';

function TaskList({title}) {
    return(
        <C.Container>
            <C.TaskListTitle>{title}</C.TaskListTitle>
            <C.Dots>⏺  ⏺  ⏺</C.Dots>
            <Task></Task>
        </C.Container>
    )
}

export default TaskList;