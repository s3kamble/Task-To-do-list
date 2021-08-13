
import { addRequest,createRequest,deleteRequest,updateRequest,taskRequestApi } from "../apiCalls/apiCalls.js";
// import { taskRequestApi } from "../apiCalls/taskAPI.js";
import { addTaskToDom } from "../components/task.js";


export const displayAll = (tasks)=>{
          if (tasks != null) {       
            tasks.forEach((task) => {
                   addTaskToDom(task);
            }
        )}
}

export const createNewTask=async (event)=>{
   
        let taskDesc=document.taskInput.task.value;
        if(taskDesc!=" "){ 
            let createData={content: taskDesc, 
                createdAt:new Date().toLocaleString(), 
                updatedAt: ""
            }

            let resData=await createRequest(createData)       
            addTaskToDom(resData);
            document.taskInput.task.value=" ";

    }
    else{
        alert("Empty input");
    }    
}


export const deleteTask = async (Tasks,Taskid) =>{
   
    let removeDiv=document.getElementById(Taskid);
    alert("This task will be permanently deleted");
    removeDiv.remove();
    deleteRequest(Taskid);
  
}

export const completeTask = async (Taskid) => {
    let Tasks = await taskRequestApi()
    
    const index = Tasks.findIndex(obj => {
        return obj.taskId === Taskid;
    });  
   
    alert("Mark as completed?");
    let putData = {"content":Tasks[index].content,
                "createdAt":new Date().toLocaleString(),
                "updatedAt":" ",
                "isComplete":true}
               
     updateRequest(Taskid,putData);
               
    
    let completeDiv=document.getElementById(Taskid);

    if(completeDiv.isComplete === false){
        completeDiv.style.backgroundColor="rgba(172, 255, 47, 0.384)";
        completeDiv.lastChild.textContent="Done";
        completeDiv.lastChild.disabled="true";
    
    }
   
}


export const updateTask= async(Taskid,desc,log)=>{
   
    let Tasks = await taskRequestApi();
    
    const index = Tasks.findIndex(obj => {
        return obj.taskId === Taskid;
    });
  
    if(Tasks[index].isComplete===false){
        let completeDiv=document.getElementById(Taskid); 
        
        completeDiv.lastChild.hidden=true;
        desc.disabled="";
        
        let taskUpdate=completeDiv.getElementsByTagName("button")[0]; 
        taskUpdate.textContent="Save";

        taskUpdate.onclick= async()=>{
               
                if( taskUpdate.textContent="Save"){
                    completeDiv.lastChild.hidden=false;
                    desc.disabled="true";
                    taskUpdate.textContent="Edit Task";
                    
                }
                else{
                    completeDiv.lastChild.hidden=true;
                    desc.disabled="";
                    taskUpdate.textContent="Save";

                }
                 let putData = {"content":desc.value,
                    "createdAt":new Date().toLocaleString(),
                    "updatedAt":" ",
                    "isComplete":false}
                
                updateRequest(Taskid,putData);            
 
          }


          
    }
   
          
}
