import { createNewTask, displayAll } from "../actions/domOperations.js";

// const url = "http://127.0.0.1:3000/tasks";
const url = "https://to-do-list-backend-app.herokuapp.com/tasks";

export const taskRequestApi = async (obj={}) =>{
    try{

         let response = await fetch(url,obj);
         let data = await response.json();
         let fetchedData = await data.data;
 
         return fetchedData
         }    
    catch{
        console.log("Error");
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
        console.log("Error",err);
    }
}

export const deleteRequest = (Taskid) =>{
    try{
        return fetch(`${url}/${Taskid}`,{
            method:"DELETE",
        })
    }catch(err){
        console.log("Error",err);
    }

}

