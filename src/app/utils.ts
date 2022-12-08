import { TaskState } from "./types";


export interface Result {
    droppable: Array<Object>,
    droppable2: Array<Object>,
    droppable3: Array<Object>,
    droppable4: Array<Object>,
}

export const reorder = (_list, startIndex, endIndex, _state, _listId) => {
    console.log(_list)

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

export const id2List = {
    droppable: 'todo',
    droppable2: 'progress',
    droppable3: 'done',
    droppable4: 'new'
};

export const getItemStyle = (isDragging, draggableStyle, custom) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    background: "#F2F2F2",
    borderRadius: '20px',
    border: 0,

    // styles we need to apply on draggables
    ...draggableStyle,
    ...custom
});

export const taskslists = [{ title: "To-do", id: "todo", name: "droppable" }, { title: "In Progress", id: "progress", name: "droppable2" }, { title: "Done", id: "done", name: "droppable3" }, { title: "New", id: "new", name: "droppable4" }]

export const reorderList = (list) => {
    const tList = JSON.parse(JSON.stringify(list))
    let newIndex = 0;
    for (const item in tList) {
        if (list[item]) {
            tList[item].index = newIndex
            newIndex++;
        };
    }
    return tList;
}