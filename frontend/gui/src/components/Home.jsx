import React from 'react'
import TaskForm from './forms/TaskForm'
import TaskListView from './TaskListView'
import axios from 'axios'

class Home extends React.Component {

    state = {
        tasks: [],
        taskLoading: true,
        errorMsg: null,
        successMsg: null,
        body: "",
        loggedIn: false
    }

    componentDidMount = () => {
        const url = "/api/task/"
        // get token from localStorage
        const token = localStorage.getItem('token')
        if (!token) {
            this.setState({
                errorMsg: "You are not logged in. Please login to view your tasks.",
                taskLoading: false
            })
            return
        }

        else {
            this.setState({
                loggedIn: true
            })
        }

        const headers = {
            'Authorization': `Token ${token}`
        }
        axios.get(url, { headers: headers })
            .then(data => {
                if (data.status === 200) {
                    data.data.results.forEach(item => {
                        this.state.tasks.push(item)
                        this.setState({
                            ...this.state.tasks,
                            filteredTasks: [...this.state.tasks],
                            taskLoading: false
                        })
                    })
                }
            })
            .catch(error => {
                this.setState({
                    errorMsg: "Error loading tasks",
                    taskLoading: false
                })
            })
    }

    changeStatus = (task, status, flag) => {
        const tasks = [...this.state.tasks]
        const newTask = tasks.find(single_task => single_task.id === task.id)
        let successMsg;
        if (flag === 'completed') {
            newTask.completed = status
            successMsg = status ? "Task marked as completed" : "Task marked as not completed"
        }
        else {
            newTask.starred = status
            successMsg = status ? "Task marked as starred" : "Task removed from starred"
        }

        this.setState({
            tasks
        })

        const url = `/api/task/update/${task.id}/`
        const token = localStorage.getItem('token')
        let data;
        const headers = {
            'Authorization': `Token ${token}`
        }
        if (flag === "completed") {
            data = {
                completed: status
            }
        }
        else {
            data = {
                starred: status
            }
        }
        axios.patch(url, data, { headers: headers })
            .then(data => {
                if (data.status === 200) {
                    this.setState({
                        successMsg: successMsg
                    })
                }
            })
            .catch(error => {
                this.setState({
                    errorMsg: "Error changing this task.",
                    taskLoading: false
                })
            })
    }

    deleteTask = (task) => {
        const token = localStorage.getItem('token')
        const headers = {
            'Authorization': `Token ${token}`
        }
        const url = `/api/task/delete/${task.id}/`
        axios.delete(url, { headers: headers })
            .then(data => {
                if (data.status === 204) {
                    this.setState({
                        successMsg: "Task deleted successfully"
                    })

                    const tasks = [...this.state.tasks]
                    const newTask = tasks.filter(single_task => single_task.id !== task.id)
                    const newTaskFilter = this.state.filteredTasks.filter(single_task => single_task.id !== task.id)

                    this.setState({
                        tasks: newTask,
                        filteredTasks: newTaskFilter
                    })
                }
            })
            .catch(error => {
                this.setState({
                    errorMsg: "Error deleting this task.",
                    taskLoading: false
                })
            })
    }

    createNewTask = (event) => {
        event.preventDefault();

        // set loading to true
        this.setState({
            loading: true,
            errorMsg: null,
            successMsg: null
        })

        const token = localStorage.getItem('token')
        const headers = {
            'Authorization': `Token ${token}`
        }
        const url = "/api/task/create/"
        axios.post(url, {
            body: this.state.body
        }, { headers: headers })
            .then(data => {
                const tasks = []
                
                tasks.push(data.data)
                tasks.push(...this.state.tasks)


                this.setState({
                    loading: false,
                    successMsg: "Task created successfully",
                    errorMsg: null,
                    tasks
                })
            })
            .catch(error => {
                this.setState({
                    loading: false,
                    errorMsg: "Something went wrong, could not create task.",
                    successMsg: null
                })

            })

    }

    changeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleFilter = (flag) => {
        const tasks = [...this.state.tasks]
        let filteredTasks;
        if(flag === 'completed'){
            filteredTasks = tasks.filter(task => task.completed)
        }
        else if(flag === 'starred'){
            filteredTasks = tasks.filter(task => task.starred)
        }
        else {
            filteredTasks = tasks
        }
        this.setState({
            filteredTasks: filteredTasks
        })
    }

    render() {
        return (
            <div>
                <h1 className="display-4 text-center">Task App (React + Django)</h1>
                {this.state.loggedIn ?
                    <div>
                        <div className="my-4">
                            <TaskForm
                                createNewTask={this.createNewTask}
                                changeHandler={this.changeHandler}
                                state={this.state}
                            />
                        </div>
                        {this.state.errorMsg}
                        {this.state.successMsg}
                        <h4 className="my-2">
                            <span className="mousePointer underLine" onClick={() => this.handleFilter('all')}>Tasks</span> |&nbsp;
                            <span className="mousePointer underLine" onClick={() => this.handleFilter('completed')}>Completed</span> |&nbsp;
                            <span className="mousePointer underLine" onClick={() => this.handleFilter('starred')}>Starred</span> 
                        </h4>

                        {this.state.taskLoading ?
                            "Loading...Please wait" :
                            <div className="my-4">
                                <TaskListView
                                    changeStatus={this.changeStatus}
                                    tasks={this.state.filteredTasks}
                                    deleteTask={this.deleteTask} />
                            </div>
                        }
                    </div>
                    :
                    <div className="text-center">{this.state.errorMsg}</div>

                }
            </div>
        );
    }
}


export default Home;
