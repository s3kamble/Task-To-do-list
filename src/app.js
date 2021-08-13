
import {getRequest,addRequest} from "./apiCalls/apiCalls.js";


window.onload = async function () {

   let data =await getRequest();
   
   data.forEach(task => {
      if (task.isComplete === true){
         let completeDiv=document.getElementById(task.taskId);
         completeDiv.style.backgroundColor="rgba(172, 255, 47, 0.384)";
         completeDiv.lastChild.textContent="Done";
         completeDiv.lastChild.disabled="true";
      }     
   });
   
    return;
};

let taskInput=document.getElementById("addInput");
taskInput.onclick = ()=>{
   addRequest()
}
 