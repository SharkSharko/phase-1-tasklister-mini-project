document.addEventListener("DOMContentLoaded", () => {
  let form = document.getElementById('create-task-form')
let task = document.getElementById('task')

  form.addEventListener('submit', (e)=> {
  e.preventDefault()
  const li = document.createElement('li')
  const taskInput = document.getElementById('new-task-description')
  li.textContent =  taskInput.value + " "
  const btn =  document.createElement('button')
   btn.textContent = 'x'
  li.appendChild(btn)
  tasks.appendChild(li)
  btn.addEventListener('click', handleDelete)
})
  
  function handleDelete(e){
  e.target.parentNode.remove()
  } 
})
