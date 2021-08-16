
import { createRequest,deleteRequest,updateRequest,taskRequestApi } from "../apiCalls/apiCalls.js";
import { addTaskToDom } from "../components/task.js";


export const displayAll = (tasks)=>{
          if (tasks != null) {       
            tasks.forEach((task) => {
                   addTaskToDom(task);
            }
        )}
}

export const createNewTask=async ()=>{
     
        let taskDesc=document.taskInput.task.value;
        if(taskDesc!=" "){ 
            let createData={
                    content: taskDesc, 
                    createdAt:new Date().toLocaleString(), 
                    updatedAt: ""
            }

            let resData=await createRequest(createData) ;     
            addTaskToDom(resData);
            document.taskInput.task.value=" ";

            }
            else{
                alert("Empty input");
            }    
}


export const deleteTask = async (Tasks,Taskid) =>{

    let del=await deleteRequest(Taskid);
    if(del == "TypeError: Failed to fetch"){
        window.location.reload();
    }
    else{
        
        let removeDiv=document.getElementById(Taskid);
        alert("This task will be permanently deleted");
        removeDiv.remove();
    }
  
}

export const completeTask = async (Taskid) => {
    let Tasks = await taskRequestApi()
    
    const index = Tasks.findIndex(obj => {
        return obj.taskId === Taskid;
    });  
   
    let completeDiv=document.getElementById(Taskid);
    let checkBox = completeDiv.getElementsByClassName("completeBtn");
    let updateBtn = completeDiv.getElementsByTagName("button")[0];
   
   if(Tasks[index].isComplete==true && checkBox[0].checked ==false){
        alert("Yet to complete?");
        completeDiv.style.backgroundColor="rgba(137, 43, 226, 0.13)";
        updateBtn.disabled = false ;

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
        updateBtn.disabled = true ;
        
        let putData = { "content":Tasks[index].content,
                        "createdAt":new Date().toLocaleString(),
                        "updatedAt":" ",
                        "isComplete":true
                    }
                
        updateRequest(Taskid,putData);
   }
                   
}


export const updateTask= async(Taskid,desc,log)=>{
     
    let Tasks = await taskRequestApi();

    
    const index = Tasks.findIndex(obj => {
        return obj.taskId === Taskid;
    });

    alert("Edit task?");
  
    if(Tasks[index].isComplete===false){
        let completeDiv=document.getElementById(Taskid);       
        let taskUpdate=completeDiv.getElementsByTagName("button")[0]; 

        if(taskUpdate.textContent == "Save"){
            completeDiv.lastChild.hidden=false;
            desc.disabled="true";
            taskUpdate.textContent = "Edit task"
        }
        else{
            completeDiv.lastChild.hidden=true;
            desc.disabled="";
            taskUpdate.textContent = "Save"
        }


        desc.addEventListener('change',()=>{
            let putData = { 
                "content":desc.value,
                "createdAt":new Date().toLocaleString(),
                "updatedAt":" ",
                "isComplete":false
            }
          
            updateRequest(Taskid,putData); 
        })
       
     

          
    }
   
          
}


