const elForm = document.querySelector(".js-form");
const elInput = document.querySelector(".js-input");
const elList = document.querySelector(".js-list");
const elAllBtn = document.querySelector(".js-all");
const elComplatedBtn = document.querySelector(".js-complated");
const elUncomplatedBtn = document.querySelector(".js-uncomplate");


const todos = [];
let complatedArray =[];
let uncomplatedArray = [];
elForm.addEventListener("submit",(evt)=>{
  evt.preventDefault();

  inputValue = elInput.value;
  elInput.value = "";

  todos.push({
    id : todos.length ? todos.at(-1).id+1 : 1,
    text: inputValue,
    isCompleted: false
  })
  
  
  render(todos,elList)
 
})


elList.addEventListener("click",(evt)=>{
 
  if(evt.target.matches(".todo-delete-btn")){
  let deletedTodoId = evt.target.dataset.todoId;
 
  let deletedTodoIndex = todos.findIndex((item)=>item.id == deletedTodoId);
  todos.splice(deletedTodoIndex,1)
  render([...todos],elList)
}

if(evt.target.matches(".todo-edit-btn")){

  let newText = prompt("yangi text kiriting")
  let editTodoId = evt.target.dataset.todoId;
  let editedTodoItem = todos.find((item)=>item.id==editTodoId)
  editedTodoItem.text = newText;
  render([...todos], elList)
}

if(evt.target.matches(".todo-checkbox")){
  let complatedTodoId = evt.target.dataset.todoId;
  let complatedtodoItem = todos.find((item)=>item.id==complatedTodoId);
  complatedtodoItem.isCompleted= !complatedtodoItem.isCompleted
  render([...todos],elList);
}

})



elAllBtn.addEventListener("click",()=>{
  render([...todos],elList);
})

elComplatedBtn.addEventListener("click",()=>{

render([...complatedArray],elList);
all.textContent=todos.length;


})

elUncomplatedBtn.addEventListener("click",()=>{
  render([...uncomplatedArray],elList);
 
  all.textContent=todos.length;
 
})

function render(array,node) {
  node.innerHTML = "";
  array.forEach((item) => {
     let newItem = document.createElement("li");
     let newText = document.createElement("span");
     let newInput = document.createElement("input");
     let newEditBtn = document.createElement("button");
     let newDeleteBtn = document.createElement("button");

    newText.textContent = item.text;
    newInput.type = "checkbox";
    newEditBtn.textContent = "EDIT";
    newDeleteBtn.textContent = "DELETE";


    newItem.setAttribute("class","list-group-item d-flex align-item-center");
    newInput.setAttribute("class","form-check-input me-2 todo-checkbox");
    newText.setAttribute("class", "flex-grow-1")
    newEditBtn.setAttribute("class","btn btn-warning me-2 todo-edit-btn");
    newDeleteBtn.setAttribute("class","btn btn-danger  todo-delete-btn ");

    newDeleteBtn.dataset.todoId = item.id;
    newEditBtn.dataset.todoId = item.id;
    newInput.dataset.todoId = item.id;
    if(item.isCompleted){
      newInput.checked = true;
      newText.classList.add("text-decoration-line-through")
    }
     

    all.textContent=array.length;
     
  
    newItem.append(newInput, newText, newEditBtn,newDeleteBtn )
    node.appendChild(newItem)
     
  });

   complatedArray = todos.filter((item)=>item.isCompleted)
     complated.textContent = complatedArray.length 

   uncomplatedArray= todos.filter((item)=>!item.isCompleted)
     uncomplated.textContent = uncomplatedArray.length 
}