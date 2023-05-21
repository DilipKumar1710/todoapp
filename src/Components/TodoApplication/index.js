import { Component } from "react";
import {v4 as uuidv4} from 'uuid';
import Cookies from 'js-cookie';
import TodoTaskItems from "../TodoTaskItems";
import './style.css';

class TodoApplication extends Component{
    state = {
        taskName:'',
        initialTaskItems:[],
    }

    onClickLogout = () => {
        const {history} = this.props;

        Cookies.remove('jwt_token');

        history.replace('/login');
    }

    onCheckTaskItem = (taskId) => {
        this.setState(prevState =>({
            initialTaskItems: prevState.initialTaskItems.map(eachTask =>{
                if (taskId === eachTask.taskId){
                    return{...eachTask, isChecked: !eachTask.isChecked}
                }
                return eachTask
            })
        }))
    }

    onGivenTaskDetails = event => {
        this.setState({taskName: event.target.value});
    }

    onSubmitFormDetails = event => {
        event.preventDefault();
        const {taskName,initialTaskItems} = this.state;

        if (taskName === ""){
            alert("Task Details Should not be empty, Please Enter Task Details...")
            return;
        }

        const newTask = {
            taskId:uuidv4(),
            taskName,
            isChecked:false,
        }

        console.log(newTask);

        const newTaskItem = [...initialTaskItems,newTask]

        this.setState({initialTaskItems:newTaskItem,taskName:''})

    }

    deleteTaskItem = (taskId) => {
        const {initialTaskItems} = this.state;

        const filterTaskItems = initialTaskItems.filter(eachTask => eachTask.taskId !== taskId);

        this.setState({initialTaskItems:filterTaskItems});
    }

    saveTasksItems = () =>{
        const {initialTaskItems} = this.state;

        localStorage.setItem('taskList',JSON.stringify(initialTaskItems));

    }

    getTodoList = () => {
        const stringifyList = localStorage.getItem('taskList')
        let getTasksList = JSON.parse(stringifyList);

        if (getTasksList === null){
            return []
        }
        else{
            this.setState({initialTaskItems:getTasksList});
        }
    }

    componentDidMount = () =>{
        this.getTodoList();
    }

    render(){
        const {initialTaskItems,taskName} = this.state;

        return(
            <div className="todo-main-container">
                <div className="content-container">
                <nav>
                    <h1>TODO LIST</h1>
                    <button onClick={this.onClickLogout}>Logout</button>
                </nav>
                    <form className="todo-form-container" onSubmit={this.onSubmitFormDetails}>
                        <input 
                        type="text"
                        placeholder="Please Enter a Task name.."
                        onChange={this.onGivenTaskDetails}
                        value={taskName}
                        />
                        <button type="submit">Add Task</button>
                    </form>
                    <ul>
                        {initialTaskItems.map((eachTask) => {
                            return(
                                <TodoTaskItems key={eachTask.taskId} taskDetails={eachTask} deleteTaskItem={this.deleteTaskItem} onCheckTaskItem={this.onCheckTaskItem}/>
                            )
                        })}
                    </ul>
                    <button className="save-btn" onClick={this.saveTasksItems}>Save</button>
                </div>
            </div>
        )
    }
}

export default TodoApplication;