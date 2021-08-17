/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/apiCalls/apiCalls.js




// const url = "http://127.0.0.1:3000/tasks";
const url = "https://to-do-list-backend-app.herokuapp.com/tasks";

window.addEventListener('offline', function(e) { 
    alert("You are currently offline");
    location.reload();
});


window.addEventListener('online', function(e) {   
    alert("You are back online");    
    location.reload();

});


const taskRequestApi = async (obj={}) =>{

    try{
  
         let response = await fetch(url,obj);
         let data = await response.json();
         let fetchedData = await data.data;

         return fetchedData

         }    
    catch(err){
        alert("Failed to fetch data from server",err);

    }
 }


const getRequest = async (event) =>{
    let data=await taskRequestApi();
    displayAll(data);
    return data
}

const createRequest = async (data)=>{

    let obj={
        method:"POST",
        headers: {
            "Accept": 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(data)
    }
   let response= await taskRequestApi(obj);
   return response
}


const updateRequest = (Taskid,data) =>{
    try{
        return fetch(`${url}/${Taskid}`,{
            method:"PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(data)
          
        })
    }catch(err){
        alert("Failed to fetch data from server",err)

    }
}

const deleteRequest = async(Taskid) =>{
    try{
        let delData = await fetch(`${url}/${Taskid}`,{
            method:"DELETE",
        });
        return delData.status;
    }catch(err){
        alert("Failed to delete");
        return err
     
    }

}


;// CONCATENATED MODULE: ./src/components/task.js



const addTaskToDom = (task) => {
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
        updateTask(taskDiv.id,taskDesc,taskLog);
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


;// CONCATENATED MODULE: ./src/actions/domOperations.js





const displayAll = (tasks)=>{
          if (tasks != null) {       
            tasks.forEach((task) => {
                   addTaskToDom(task);
            }
        )}
}

const createNewTask=async ()=>{
     
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


const deleteTask = async (Tasks,Taskid) =>{

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

const completeTask = async (Taskid) => {
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


const updateTask= async(Taskid,desc,log)=>{
     
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



;// CONCATENATED MODULE: ./src/app.js





window.onload = async function () {

   let data =await getRequest();
   
   data.forEach(task => {
      if (task.isComplete == true){
         let completeDiv=document.getElementById(task.taskId);
         completeDiv.style.backgroundColor="rgba(172, 255, 47, 0.384)";
         let updateBtn = completeDiv.getElementsByTagName("button")[0];
         updateBtn.disabled = true ;
      }     
   });
   
    return;
};

let taskInput=document.getElementById("addInput");
taskInput.onclick = (event)=>{
   event.preventDefault();
   createNewTask()
}
 
/******/ })()
;