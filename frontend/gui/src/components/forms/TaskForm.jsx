import React from 'react'

const TaskForm = (props) => {

        return (

            <form onSubmit={props.createNewTask}>
                <div className="form-group">
                    <input
                        type="text"
                        name="body"
                        onChange={props.changeHandler}
                        className="form-control"
                        value={props.state.body}
                        placeholder="Complete class works..." />
                </div>
                { props.state.loading && "Submitting... Please wait"}
            </form>
        );
    }

export default TaskForm;
