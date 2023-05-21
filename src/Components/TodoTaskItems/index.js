import './style.css';

const TodoTaskItems = (props) =>{
    const {taskDetails,deleteTaskItem,onCheckTaskItem} = props;
    const {taskId, taskName, isChecked} = taskDetails;

    const onClickedDeleteBtn = () =>{
        deleteTaskItem(taskId)
    }

    const onChangeCheckboxStatus = () =>{
        onCheckTaskItem(taskId)
    }

    const checked = isChecked ? "checked" : "";

    return(
        <li className="task-container">
            <div className='checkbox-and-task-container'>
                <input type='checkbox' id={taskId} name="task" onChange={onChangeCheckboxStatus}/>
                <label htmlFor={taskId} className={checked}>{taskName}</label>
            </div>
            <button className='delete-btn' onClick={onClickedDeleteBtn}><img src="https://assets.ccbp.in/frontend/react-js/delete-img.png" alt="delete-icon"/></button>
        </li>
    )
}

export default TodoTaskItems;