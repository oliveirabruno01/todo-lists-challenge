import React from 'react';
import * as C from "./Task.styles";

interface TaskProps {
    title: string;
    description: string;
    list: "todo" | "progress" | "done" | "";
}

const TaskDefaults: TaskProps = {
    title: "Get the trash out",
    description: "Some description",
    list: "todo",
}

export const GetTaskProps = (props): TaskProps => {
    return { ...TaskDefaults, ...props }
}

function Task({props=GetTaskProps({})}) {
    return (
        <div>
            {props.title}<br />
            {props.description}<br />
            {props.list}<br />
        </div>
    )
}

export default Task;