import React, { useState } from 'react';
import * as C from "./Task.styles";
import todoIcon from "./todo.png";
import progressIcon from "./progress.png";
import doneIcon from "./done.png";
import discardIcon from "./discard-task-icon.svg"
import saveIcon from "./save-task-icon.svg"

interface TaskProps {
    title: string;
    description: string;
    list: "todo" | "progress" | "done" | "";
    innerRef: any;
}

const TaskDefaults: TaskProps = {
    title: "Get the trash out",
    description: "Some description",
    list: "todo",
    innerRef: Element,
}

const listIndicator = (name) => {
    if (name == "todo") return todoIcon;
    if (name == "progress") return progressIcon;
    if (name == "done") return doneIcon;
}

const orderOfIndicator = {
    'todo': 0,
    'progress': 1,
    'done': 2
}

const progressOrder = {
    0: 'todo',
    1: 'progress',
    2: 'done'
};

export const GetTaskProps = (props={}): TaskProps => {
    return {...TaskDefaults, ...props }
}

function Task({props=GetTaskProps(), children}) {
    const [expanded, setExpanded] = useState(false);
    const toggleExpanded = () => setExpanded(!expanded);
    const handleClick = (e) => {
        e.preventDefault();
        toggleExpanded();
    }

    const [state, setState] = useState<TaskProps>(props);
    const [description, setDescription] = useState(state.description);

    const toggleNextIndicator = () => {
        let indicator = orderOfIndicator[state.list];
        let nextIndicator = indicator+1<Object.keys(progressOrder).length?indicator+1:0;
        setState({...state, ...{list: progressOrder[nextIndicator]} });
    }

    const discardDescription = (e) => {
        setDescription(state.description);
        handleClick(e);
    }

    const saveDescription = (e) => {
        setState({...state, ...{description: description}});
        console.log(state);
        handleClick(e);
    }

    return (
        <C.Container expanded={expanded}>
            <C.TaskTitle expanded={expanded}>
                <C.TaskIndicator src={listIndicator(state.list)} onClick={toggleNextIndicator} image={state.list}></C.TaskIndicator>
                <C.TaskTitleText onClick={expanded?()=>{}:handleClick}>{props.title}</C.TaskTitleText>
            </C.TaskTitle>

            <C.TaskDescriptionWrapper expanded={expanded}>
                <C.TaskDescription 
                value={description} 
                expanded={expanded} 
                onChange={(event)=>{setDescription(event.target.value)}}></C.TaskDescription>
            </C.TaskDescriptionWrapper>

            <C.TaskButtons>
                <C.TaskButton onClick={expanded?discardDescription:()=>{}} model={'discard'}>
                    <img src={discardIcon}/>
                    Discard
                </C.TaskButton>
                <C.TaskButton onClick={expanded?saveDescription:()=>{}} model={'save'}>
                <img src={saveIcon}/>
                    Save task
                </C.TaskButton>
            </C.TaskButtons>

            {children}
        </C.Container>
    )
}

export default Task;