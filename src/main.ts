interface Task{
  id: number,
  text: string,
  completed: boolean,
}

//This method takes a parameter of the typeTask and adds it to the Tasks array in the class
//The tasks array is declared as a private property of the class, which means it can only be accessed from within the class
class TodoList{
  private Tasks: Task[] = []

  addTask(todo:Task){
    this.Tasks.push(todo)
  }

  //This method takes a parameter of type number, which represents the id of the task to be removed 
  removeTaskById(id:number){
    this.Tasks = this.Tasks.filter((todo)=>todo.id !== id)
  }

  //This method returns the Tasks Array
  getTask(){
    return this.Tasks
  }
}

class TodoListUI{
  private todoList: TodoList;

  constructor(todoList:TodoList){
    this.todoList = todoList
  }

  //Updates the user interface to display the list of tasks in the todo list object
  displayTasks(){
    const todoListElement = document.getElementById("todo-list")!
    todoListElement.innerHTML = ""

    this.todoList.getTask().forEach((todo)=>{
        const todoElement = document.createElement("li")
        todoElement.innerHTML = `
          <input type="checkbox" ${todo.completed ? "checked" : ""}/>
          <span>${todo.text}</span>
          <button class="remove-todo" data-id="${todo.id}">Remove</button> 
        `
        todoListElement.appendChild(todoElement)
    })
  }

  //this method adds a new task to the todolist object and updates the user interface to display that new task
  addTodo(){
    const newTodoInput = document.getElementById("new-todo") as HTMLInputElement
    const newTodoText = newTodoInput.value.trim()

    if(newTodoText){
      const newTodo: Task = {
        id: Date.now(),
        text: newTodoText,
        completed: false,
      }

      this.todoList.addTask(newTodo)
      this.displayTasks()
      newTodoInput.value = ""
    }
  }

  //this method removes a task using a specific id from the todolist object and updates the ui after
  removeTodoById(id:number){
    this.todoList.removeTaskById(id)
    this.displayTasks()

  }

  //Event listerners to the HTML elements in the user interface to respond to user interactions
  bindEvents(){
    document
      .getElementById("add-todo")!
      .addEventListener("click", ()=>this.addTodo())
    document.addEventListener("click", (event)=>{
      const target = event.target as HTMLElement
      if(target.matches(".remove-todo")){
        const id = parseInt(target.getAttribute("data-id")!)
        this.removeTodoById(id)
      }
    })
  }
}

const todoList = new TodoList()
const ui = new TodoListUI(todoList)

ui.displayTasks()
ui.bindEvents()