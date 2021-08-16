import { alertModal } from "../actions/alert_modal.js";
import { createNewTask, displayAll } from "../actions/domOperations.js";


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


export const taskRequestApi = async (obj={}) =>{
    console.log(obj)
    try{
         console.log("try");
         let response = await fetch(url,obj);
         let data = await response.json();
         let fetchedData = await data.data;
 

         console.log(fetchedData,obj)
         return fetchedData

         }    
    catch(err){
       console.log(err)
        alert("Failed to fetch data from server",err);

    }
 }


export const getRequest = async (event) =>{
    let data=await taskRequestApi();
    displayAll(data);
    return data
}

export const createRequest = async (data)=>{
   console.log("createreq",data)

    let obj={
        method:"POST",
        headers: {
            "Accept": 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(data)
    }
   let response= await taskRequestApi(obj);
   console.log(response)
   return response
}

// export const addRequest =async (event) =>{
//    console.log("addRequest")

//     createNewTask();
// }

export const updateRequest = (Taskid,data) =>{
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

export const deleteRequest = async(Taskid) =>{
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

