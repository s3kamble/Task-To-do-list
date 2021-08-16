
import { createNewTask } from "./actions/domOperations.js";
import {getRequest} from "./apiCalls/apiCalls.js";
// import "../styles/style.css";

window.onload = async function () {

   let data =await getRequest();
   
   data.forEach(task => {
      if (task.isComplete == true){
         let completeDiv=document.getElementById(task.taskId);
         completeDiv.style.backgroundColor="rgba(172, 255, 47, 0.384)";
      }     
   });
   
    return;
};

let taskInput=document.getElementById("addInput");
taskInput.onclick = ()=>{
   console.log("app")
   // addRequest()
   createNewTask()
}
 