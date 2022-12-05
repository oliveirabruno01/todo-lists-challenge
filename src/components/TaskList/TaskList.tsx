import React from 'react';
import * as C from './TaskList.styles';
import Task, { GetTaskProps}  from '../Task/Task';

function TaskList({title}) {
    return(
        <C.Container>
            <div>
                <C.TaskListTitle fixed>{title}</C.TaskListTitle>
                <C.Dots>⬤  ⬤  ⬤</C.Dots>
            </div>
            
            <C.Scrollabe>
                <Task></Task>
                <Task></Task>
                <Task></Task>
                <Task></Task>
                <Task></Task>
                <Task></Task>
            </C.Scrollabe>
        </C.Container>
    )
}

export default TaskList;