/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./styles/style.css":
/*!**************************!*\
  !*** ./styles/style.css ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://webpack/./styles/style.css?");

/***/ }),

/***/ "./src/actions/domOperations.js":
/*!**************************************!*\
  !*** ./src/actions/domOperations.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"displayAll\": () => (/* binding */ displayAll),\n/* harmony export */   \"createNewTask\": () => (/* binding */ createNewTask),\n/* harmony export */   \"deleteTask\": () => (/* binding */ deleteTask),\n/* harmony export */   \"completeTask\": () => (/* binding */ completeTask),\n/* harmony export */   \"updateTask\": () => (/* binding */ updateTask)\n/* harmony export */ });\n/* harmony import */ var _apiCalls_apiCalls_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../apiCalls/apiCalls.js */ \"./src/apiCalls/apiCalls.js\");\n/* harmony import */ var _components_task_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/task.js */ \"./src/components/task.js\");\n\n\n\n\n\nconst displayAll = (tasks)=>{\n          if (tasks != null) {       \n            tasks.forEach((task) => {\n                   (0,_components_task_js__WEBPACK_IMPORTED_MODULE_1__.addTaskToDom)(task);\n            }\n        )}\n}\n\nconst createNewTask=async ()=>{\n     \n        let taskDesc=document.taskInput.task.value;\n        console.log(taskDesc)\n        if(taskDesc!=\" \"){ \n            let createData={\n                    content: taskDesc, \n                    createdAt:new Date().toLocaleString(), \n                    updatedAt: \"\"\n            }\n\n            let resData=await (0,_apiCalls_apiCalls_js__WEBPACK_IMPORTED_MODULE_0__.createRequest)(createData) ;     \n            (0,_components_task_js__WEBPACK_IMPORTED_MODULE_1__.addTaskToDom)(createData);\n            document.taskInput.task.value=\" \";\n\n            }\n            else{\n                alert(\"Empty input\");\n            }    \n}\n\n\nconst deleteTask = async (Tasks,Taskid) =>{\n\n    let del=await (0,_apiCalls_apiCalls_js__WEBPACK_IMPORTED_MODULE_0__.deleteRequest)(Taskid);\n    if(del == \"TypeError: Failed to fetch\"){\n        window.location.reload();\n    }\n    else{\n        \n        let removeDiv=document.getElementById(Taskid);\n        alert(\"This task will be permanently deleted\");\n        removeDiv.remove();\n    }\n  \n}\n\nconst completeTask = async (Taskid) => {\n    let Tasks = await (0,_apiCalls_apiCalls_js__WEBPACK_IMPORTED_MODULE_0__.taskRequestApi)()\n    \n    const index = Tasks.findIndex(obj => {\n        return obj.taskId === Taskid;\n    });  \n   \n    let completeDiv=document.getElementById(Taskid);\n    let checkBox = completeDiv.getElementsByClassName(\"completeBtn\");\n    let updateBtn = completeDiv.getElementsByTagName(\"button\")[0];\n   \n   if(Tasks[index].isComplete==true && checkBox[0].checked ==false){\n        alert(\"Yet to complete?\");\n        completeDiv.style.backgroundColor=\"rgba(137, 43, 226, 0.13)\";\n        updateBtn.disabled = false ;\n\n        let putData = { \"content\":Tasks[index].content,\n                        \"createdAt\":new Date().toLocaleString(),\n                        \"updatedAt\":\" \",\n                        \"isComplete\":false\n                    }\n                \n        ;(0,_apiCalls_apiCalls_js__WEBPACK_IMPORTED_MODULE_0__.updateRequest)(Taskid,putData);\n   }\n   else if(Tasks[index].isComplete==false && checkBox[0].checked ==true){\n        alert(\"Mark as complete?\");\n        completeDiv.style.backgroundColor=\"rgba(172, 255, 47, 0.384)\";\n        updateBtn.disabled = true ;\n        \n        let putData = { \"content\":Tasks[index].content,\n                        \"createdAt\":new Date().toLocaleString(),\n                        \"updatedAt\":\" \",\n                        \"isComplete\":true\n                    }\n                \n        ;(0,_apiCalls_apiCalls_js__WEBPACK_IMPORTED_MODULE_0__.updateRequest)(Taskid,putData);\n   }\n                   \n}\n\n\nconst updateTask= async(Taskid,desc,log)=>{\n     \n    let Tasks = await (0,_apiCalls_apiCalls_js__WEBPACK_IMPORTED_MODULE_0__.taskRequestApi)();\n\n    \n    const index = Tasks.findIndex(obj => {\n        return obj.taskId === Taskid;\n    });\n\n    alert(\"Edit task?\");\n  \n    if(Tasks[index].isComplete===false){\n        let completeDiv=document.getElementById(Taskid);       \n        let taskUpdate=completeDiv.getElementsByTagName(\"button\")[0]; \n\n        if(taskUpdate.textContent == \"Save\"){\n            completeDiv.lastChild.hidden=false;\n            desc.disabled=\"true\";\n            taskUpdate.textContent = \"Edit task\"\n        }\n        else{\n            completeDiv.lastChild.hidden=true;\n            desc.disabled=\"\";\n            taskUpdate.textContent = \"Save\"\n        }\n\n\n        desc.addEventListener('change',()=>{\n            let putData = { \n                \"content\":desc.value,\n                \"createdAt\":new Date().toLocaleString(),\n                \"updatedAt\":\" \",\n                \"isComplete\":false\n            }\n          \n            ;(0,_apiCalls_apiCalls_js__WEBPACK_IMPORTED_MODULE_0__.updateRequest)(Taskid,putData); \n        })\n       \n     \n\n          \n    }\n   \n          \n}\n\n\n\n\n//# sourceURL=webpack://webpack/./src/actions/domOperations.js?");

/***/ }),

/***/ "./src/apiCalls/apiCalls.js":
/*!**********************************!*\
  !*** ./src/apiCalls/apiCalls.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"taskRequestApi\": () => (/* binding */ taskRequestApi),\n/* harmony export */   \"getRequest\": () => (/* binding */ getRequest),\n/* harmony export */   \"createRequest\": () => (/* binding */ createRequest),\n/* harmony export */   \"updateRequest\": () => (/* binding */ updateRequest),\n/* harmony export */   \"deleteRequest\": () => (/* binding */ deleteRequest)\n/* harmony export */ });\n/* harmony import */ var _actions_domOperations_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/domOperations.js */ \"./src/actions/domOperations.js\");\n\n\n\n\n// const url = \"http://127.0.0.1:3000/tasks\";\nconst url = \"https://to-do-list-backend-app.herokuapp.com/tasks\";\n\nwindow.addEventListener('offline', function(e) { \n    alert(\"You are currently offline\");\n    location.reload();\n});\n\n\nwindow.addEventListener('online', function(e) {   \n    alert(\"You are back online\");    \n    location.reload();\n\n});\n\n\nconst taskRequestApi = async (obj={}) =>{\n\n    try{\n  \n         let response = await fetch(url,obj);\n         let data = await response.json();\n         let fetchedData = await data.data;\n\n         return fetchedData\n\n         }    \n    catch(err){\n        alert(\"Failed to fetch data from server\",err);\n\n    }\n }\n\n\nconst getRequest = async (event) =>{\n    let data=await taskRequestApi();\n    (0,_actions_domOperations_js__WEBPACK_IMPORTED_MODULE_0__.displayAll)(data);\n    return data\n}\n\nconst createRequest = async (data)=>{\n\n    let obj={\n        method:\"POST\",\n        headers: {\n            \"Accept\": 'application/json',\n            'Content-Type': 'application/json'\n        },\n        body:JSON.stringify(data)\n    }\n   let response= await taskRequestApi(obj);\n   return response\n}\n\n\nconst updateRequest = (Taskid,data) =>{\n    try{\n        return fetch(`${url}/${Taskid}`,{\n            method:\"PUT\",\n            headers: {\n                'Accept': 'application/json',\n                'Content-Type': 'application/json'\n            },\n            body:JSON.stringify(data)\n          \n        })\n    }catch(err){\n        alert(\"Failed to fetch data from server\",err)\n\n    }\n}\n\nconst deleteRequest = async(Taskid) =>{\n    try{\n        let delData = await fetch(`${url}/${Taskid}`,{\n            method:\"DELETE\",\n        });\n        return delData.status;\n    }catch(err){\n        alert(\"Failed to delete\");\n        return err\n     \n    }\n\n}\n\n\n\n//# sourceURL=webpack://webpack/./src/apiCalls/apiCalls.js?");

/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _actions_domOperations_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actions/domOperations.js */ \"./src/actions/domOperations.js\");\n/* harmony import */ var _apiCalls_apiCalls_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./apiCalls/apiCalls.js */ \"./src/apiCalls/apiCalls.js\");\n/* harmony import */ var _styles_style_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../styles/style.css */ \"./styles/style.css\");\n\n\n\n\n\nwindow.onload = async function () {\n\n   let data =await (0,_apiCalls_apiCalls_js__WEBPACK_IMPORTED_MODULE_1__.getRequest)();\n   \n   data.forEach(task => {\n      if (task.isComplete == true){\n         let completeDiv=document.getElementById(task.taskId);\n         completeDiv.style.backgroundColor=\"rgba(172, 255, 47, 0.384)\";\n         let updateBtn = completeDiv.getElementsByTagName(\"button\")[0];\n         updateBtn.disabled = true ;\n      }     \n   });\n   \n    return;\n};\n\nlet taskInput=document.getElementById(\"addInput\");\ntaskInput.onclick = (event)=>{\n   event.preventDefault();\n   (0,_actions_domOperations_js__WEBPACK_IMPORTED_MODULE_0__.createNewTask)()\n}\n \n\n//# sourceURL=webpack://webpack/./src/app.js?");

/***/ }),

/***/ "./src/components/task.js":
/*!********************************!*\
  !*** ./src/components/task.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"addTaskToDom\": () => (/* binding */ addTaskToDom)\n/* harmony export */ });\n/* harmony import */ var _actions_domOperations_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/domOperations.js */ \"./src/actions/domOperations.js\");\n\n\n\nconst addTaskToDom = (task) => {\n    let taskList= document.getElementById(\"taskList\");\n    let taskDiv= document.createElement(\"div\");\n    let taskDesc =document.createElement(\"textarea\");\n    let taskLog = document.createElement(\"p\");\n    let delBtn =  document.createElement(\"button\");\n    let completeBtn= document.createElement(\"input\")\n    let updateBtn =  document.createElement(\"button\");\n   \n    taskDiv.className=\"mainCard\";\n    taskDiv.id=task.taskId;\n\n    taskDesc.textContent=task.content\n    taskDesc.className=\"taskAdded\";\n    taskDesc.disabled=\"true\";\n\n    taskLog.className=\"date\"; \n    taskLog.textContent=task.createdAt;\n    \n    delBtn.textContent=\"Delete\";\n    delBtn.className=\"btn-danger\";\n\n    updateBtn.textContent=\"Edit task\";\n    updateBtn.className=\"editTask\";\n\n    completeBtn.type=\"checkbox\"\n    completeBtn.className=\"completeBtn\";\n\n\n    delBtn.onclick=(e)=>{\n        (0,_actions_domOperations_js__WEBPACK_IMPORTED_MODULE_0__.deleteTask)(task,taskDiv.id);\n    }\n\n    updateBtn.onclick=(e)=>{ \n        ;(0,_actions_domOperations_js__WEBPACK_IMPORTED_MODULE_0__.updateTask)(taskDiv.id,taskDesc,taskLog);\n    }\n\n    completeBtn.onclick=()=>{\n        ;(0,_actions_domOperations_js__WEBPACK_IMPORTED_MODULE_0__.completeTask)(taskDiv.id);\n    }\n\n    taskDiv.appendChild(taskDesc);\n    taskDiv.appendChild(taskLog);\n    taskDiv.appendChild(updateBtn);\n    taskDiv.appendChild(delBtn);\n    taskDiv.appendChild(completeBtn);\n\n    taskList.appendChild(taskDiv);\n    \n}\n\n\n\n//# sourceURL=webpack://webpack/./src/components/task.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.js");
/******/ 	
/******/ })()
;