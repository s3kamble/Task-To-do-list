
import { deleteTask ,updateTask,completeTask} from "../actions/domOperations.js";

export const addTaskToDom = (task) => {
    let taskList= document.getElementById("taskList");
    let taskDiv= document.createElement("div");
    let taskDesc =document.createElement("textarea");
    let taskLog = document.createElement("p");
    let delBtn =  document.createElement("button");
    let completeBtn= document.createElement("input")
    let updateBtn =  document.createElement("button");
   
    taskDiv.className="mainCard";
    taskDiv.id=task.taskId;

    taskDesc.textContent=task.content
    taskDesc.className="taskAdded";
    taskDesc.disabled="true";

    taskLog.className="date"; 
    taskLog.textContent=task.createdAt;
    
    delBtn.textContent="Delete";
    delBtn.className="btn-danger";

    updateBtn.textContent="Edit task";
    updateBtn.className="editTask";

    completeBtn.type="checkbox"
    completeBtn.className="completeBtn";


    delBtn.onclick=(e)=>{
        deleteTask(task,taskDiv.id);
    }

    updateBtn.onclick=(e)=>{ 
        updateTask(taskDiv.id,taskDesc);
    }

    completeBtn.onclick=()=>{
        completeTask(taskDiv.id);
    }

    taskDiv.appendChild(taskDesc);
    taskDiv.appendChild(taskLog);
    taskDiv.appendChild(updateBtn);
    taskDiv.appendChild(delBtn);
    taskDiv.appendChild(completeBtn);

    taskList.appendChild(taskDiv);
    
}

