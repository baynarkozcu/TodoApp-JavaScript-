

const newTodo = document.querySelector(".input-todo");

const newTodoButton = document.querySelector(".btn-todo-add");
const todoList = document.querySelector('.todo-list');

newTodoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', todoEvents);
document.addEventListener('DOMContentLoaded', getTodosLocalStorage);

function todoEvents(e){
    const targetItem = e.target;

    if(targetItem.classList.contains('todo-btn-completed')){
        //toggle : Dizi İçerisinde Değer Varsa Siliyor, Yoksa Ekliyor..
        targetItem.parentElement.classList.toggle('todo-completed');
    }else if(targetItem.classList.contains('todo-delete')){
        if(confirm("Are You Sure ?")){
            targetItem.parentElement.classList.toggle('deleted');
            const deletedTodo = targetItem.parentElement.children[0].innerText;
    
            deleteTodoLocalStorage(deletedTodo);
            // (transitionend) Bir üstteki fonksiyon işlevini bekler, bittikten sonra fonksiyon içerisindeki işlemleri gerçekleştirir.
            targetItem.parentElement.addEventListener('transitionend', ()=>{
                targetItem.parentElement.remove();
            });
        }

    }
}


function addTodo(e){
    e.preventDefault();

    if(newTodo.value.trim() != ''){
        
        addTodoTemplate(newTodo.value);
    //Save Local Storage
    saveTodoLocalStorage(newTodo.value);
    newTodo.value = '';

    }


}

function localStorageConvertArray(){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    return todos;
}


function saveTodoLocalStorage(newTodo){
    let todos = localStorageConvertArray();

    todos.push(newTodo);

    localStorage.setItem('todos' , JSON.stringify(todos));
}

function getTodosLocalStorage(){
    let todos = localStorageConvertArray();

    todos.forEach(todo => {
        addTodoTemplate(todo);
    });
}

function deleteTodoLocalStorage(todo){
    let todos = localStorageConvertArray();

    const deletedTodoIndex = todos.indexOf(todo);
    todos.splice(deletedTodoIndex, 1);
    
    localStorage.setItem('todos', JSON.stringify(todos));
}

function addTodoTemplate(todo){
                //Create <div>
const newTodoDiv = document.createElement('div');
newTodoDiv.classList.add('todo-item');

//Create <li>
const newTodoLi = document.createElement('li');
newTodoLi.classList.add('todo-content');
newTodoLi.innerText = todo;

//div.add(li)
newTodoDiv.appendChild(newTodoLi);


//Create completedButton
const todoCompletedButton = document.createElement('button');
todoCompletedButton.classList.add('todo-btn');
todoCompletedButton.classList.add('todo-btn-completed');
todoCompletedButton.innerHTML = '<i class="far fa-check-square"></i>'
newTodoDiv.appendChild(todoCompletedButton);

//Create deleteButton
const todoDeleteButton = document.createElement('button');
todoDeleteButton.classList.add('todo-btn');
todoDeleteButton.classList.add('todo-delete');
todoDeleteButton.innerHTML = '<i class="far fa-trash-alt"></i>';
newTodoDiv.appendChild(todoDeleteButton);
    //list.add(div)
    todoList.appendChild(newTodoDiv);
}


