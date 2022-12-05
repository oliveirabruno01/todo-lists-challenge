import React from 'react';
import * as C from './TaskList.styles';
import Task, { GetTaskProps}  from '../Task/Task';

function TaskList({title, children}) {
    return(
        <C.Container>
            <div>
                <C.TaskListTitle fixed>{title}</C.TaskListTitle>
                <C.Dots>&#11044; &#11044; &#11044;</C.Dots>
            </div>
            
            <C.Scrollabe>
                {children}
            </C.Scrollabe>
        </C.Container>
    )
}

export default TaskList;