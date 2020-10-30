import React from 'react'

const SingleTask = ({ task, changeStatus, deleteTask }) => {
    return (

        <li className="list-group-item d-flex">
            <div className="d-flex justify-content-start">
                <div className="form-check">
                    <input
                        onChange={(event) => changeStatus(task, event.target.checked, 'completed')}
                        checked={task.completed}
                        className="form-check-input"
                        type="checkbox"
                        name={task.id}
                        id={task.id} />
                    <label className="form-check-label mousePointer" htmlFor={task.id}>
                        {task.completed ? <del>{task.body}</del> : task.body}
                    </label>
                </div>
            </div>
            <div
                className="ml-auto p-2">
                {
                    task.starred ?
                    <i style={{color: 'green'}} onClick={(event) => changeStatus(task, !task.starred, 'starred')} className="fa fa-star mousePointer"></i>
                    :
                    <i style={{color: 'green'}} onClick={(event) => changeStatus(task, !task.starred, 'starred')} className="fa fa-star-o mousePointer"></i>
                }
                <button onClick={() => deleteTask(task)} className="ml-2 btn btn-danger">Delete</button>
            </div>
            
        </li>
    )
}

const TaskListView = ({ tasks, changeStatus, deleteTask }) => {

    return (
        <div className="my-2">
            <ul className="list-group">
                {tasks.map(task => {
                    return (
                        <SingleTask
                            changeStatus={changeStatus}
                            key={task.id}
                            task={task}
                            deleteTask={deleteTask} />
                    )
                })}
            </ul>
        </div>
    );
}


export default TaskListView;
