import { createNewTask, displayAll } from "../actions/domOperations.js";

// const url = "http://127.0.0.1:3000/tasks";
const url = "https://to-do-list-backend-app.herokuapp.com/tasks";

window.addEventListener('offline', function(e) { 
    alert("You are currently offline");
    location.reload();
});


window.addEventListener('online', function(e) {   
    location.reload();
});


export const taskRequestApi = async (obj={}) =>{
    try{

         let response = await fetch(url,obj);
         let data = await response.json();
         let fetchedData = await data.data;
 
         return fetchedData
         }    
    catch(err){
        alert("Failed to fetch data from server",err)
    }
 }


export const getRequest = async (event) =>{
    let data=await taskRequestApi();
    displayAll(data);
    return data
}

export const createRequest = async (data)=>{
    let obj={
        method:"POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(data)
    }
    await taskRequestApi(obj)
}

export const addRequest =async (event) =>{
    createNewTask();
}

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

export const deleteRequest = (Taskid) =>{
    try{
        return fetch(`${url}/${Taskid}`,{
            method:"DELETE",
        })
    }catch(err){
        alert("Failed to fetch data from server",err)

    }

}

