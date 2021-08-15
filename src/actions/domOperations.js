
import { addRequest,createRequest,deleteRequest,updateRequest,taskRequestApi } from "../apiCalls/apiCalls.js";
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
   
    let completeDiv=document.getElementById(Taskid);
    let checkBox = completeDiv.getElementsByClassName("completeBtn");
    let updateBtn = completeDiv.getElementsByClassName("editTask");
   
   if(Tasks[index].isComplete==true && checkBox[0].checked ==false){
        alert("Yet to complete?");
        completeDiv.style.backgroundColor="rgba(137, 43, 226, 0.13)";
        let putData = { "content":Tasks[index].content,
                        "createdAt":new Date().toLocaleString(),
                        "updatedAt":" ",
                        "isComplete":false
                    }
                
        updateRequest(Taskid,putData);
   }
   else if(Tasks[index].isComplete==false && checkBox[0].checked ==true){
        alert("Mark as complete?");
        completeDiv.style.backgroundColor="rgba(172, 255, 47, 0.384)";
        updateBtn.disabled = "true" ;
        
        let putData = { "content":Tasks[index].content,
                        "createdAt":new Date().toLocaleString(),
                        "updatedAt":" ",
                        "isComplete":true
                    }
                
        updateRequest(Taskid,putData);
   }
                   
}


export const updateTask= async(Taskid,desc)=>{
   
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
           
                let putData = { "content":desc.value,
                                "createdAt":new Date().toLocaleString(),
                                "updatedAt":" ",
                                "isComplete":false
                            }
                
                updateRequest(Taskid,putData); 
                                        
                        
          }
          
    }
   
          
}
