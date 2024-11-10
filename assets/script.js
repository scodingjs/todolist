const formEntryEl = document.getElementById("form-entry")
const taskTitleEl = document.getElementById('task-title')
const taskDueDateEl = document.getElementById('task-due-date')
const taskDescriptionEl = document.getElementById("task-description")
const clearFormEl = document.getElementById("clear-form")
const closeFormEl = document.getElementById("close-form")
const taskSchema = JSON.parse(localStorage.getItem("taskboard")) || []

formEntryEl.addEventListener("submit", function (event) {
    event.preventDefault()
    let task = {
        title: taskTitleEl.value,
        dueDate: taskDueDateEl.value,
        description: taskDescriptionEl.value,
        id:(new Date.getTime() * (Math.random() * 100000)),
        status:"Todo"
    }
    taskSchema.push(task)
    localStorage.setItem("taskboard", JSON.stringify(taskSchema))
    console.log("Input", task)
    clearForm()
})
 

clearFormEl.addEventListener("click", function (event) {
    event.preventDefault()
    clearForm()
})

function clearForm(){
    taskDescriptionEl.value = ""
    taskDueDateEl.value = ""
    taskTitleEl.value = ""
}

function createCards(){
    const taskSchema = JSON.parse(localStorage.getItem("taskboard")) || []
    let cards = ""
    taskSchema.forEach(task => {
        return(`<section>
            <h4>{task}</h4>
        </section>`)
    })
}