import React, { useState } from 'react';
import * as C from "./Task.styles";
import todoIcon from "./todo.png";
import progressIcon from "./progress.png";
import doneIcon from "./done.png";
import discardIcon from "./discard-task-icon.svg"
import saveIcon from "./save-task-icon.svg"

import { TaskState } from "../../app/types"
import { useAppSelector, useAppDispatch} from '../../app/hooks';
import { updateTaskById } from '../../app/tasklistsReducer/tasklistsSlice';

const listIndicator = (name) => {
    if (name === "dot") return todoIcon;
    if (name === "circle") return progressIcon;
    if (name === "sharp") return doneIcon;
}

const orderOfIndicator = {
    'dot': 0,
    'circle': 1,
    'sharp': 2
}

const progressOrder = {
    0: 'dot',
    1: 'circle',
    2: 'sharp'
};

function Task({_props={id: 0, listName:''}}) {

    const mData = useAppSelector((state) => state)
    const dispatch = useAppDispatch();

    let props;
    for (const _task in mData[_props.listName]) {
        let task = mData[_props.listName][_task]
        if (task.id === _props.id) {
            props = task as TaskState;
        }
    };

    const [expanded, setExpanded] = useState(false);
    const toggleExpanded = () => {
        setExpanded(!expanded)
    };

    const [state, setState] = useState(props);
    const [description, setDescription] = useState(state?.description);


    const handleClick = (e) => {
        e.preventDefault();
        setState({...state, ...{open: !state.open}})
        toggleExpanded();
    }

    const toggleNextIndicator = () => {
        let indicator = orderOfIndicator[state.indicator];
        let nextIndicator = indicator+1<Object.keys(progressOrder).length?indicator+1:0;

        let changes = {...state, ...{indicator: progressOrder[nextIndicator]}};

        dispatch(updateTaskById({id: props.id, state: changes}))

        setState({...state, ...{indicator: progressOrder[nextIndicator]} });
    }

    const discardDescription = (e) => {
        setDescription(state.description);
        handleClick(e);
    }

    const saveDescription = (e) => {
        let changes = {...state, ...{description: description}};

        dispatch(updateTaskById({id: props.id, state: changes}))
        setState({...state, ...{description: description}});
        handleClick(e);
    }

    return (
        <C.Container expanded={expanded}>
            {/* {console.log(state)} */}
            <C.TaskTitle expanded={expanded}>
                <C.TaskIndicator src={listIndicator(state?.indicator)} onClick={toggleNextIndicator} image={state?.indicator}></C.TaskIndicator>
                <C.TaskTitleText onClick={expanded?()=>{}:handleClick}>{state?.title}</C.TaskTitleText>
            </C.TaskTitle>

            <C.TaskDescriptionWrapper expanded={expanded}>
                <C.TaskDescription 
                value={description} 
                expanded={expanded} 
                onChange={(event)=>{setDescription(event.target.value)}}></C.TaskDescription>
            </C.TaskDescriptionWrapper>

            <C.TaskButtons>
                <C.TaskButton onClick={expanded?discardDescription:()=>{}} model={'discard'}>
                    <img src={discardIcon} alt={"Discard description"}/>
                    Discard
                </C.TaskButton>
                <C.TaskButton onClick={expanded?saveDescription:()=>{}} model={'save'}>
                <img src={saveIcon} alt={"Save description"}/>
                    Save task
                </C.TaskButton>
            </C.TaskButtons>

        </C.Container>
    )
}

export default Task;