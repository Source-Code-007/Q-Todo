// store tasks collection
const storeTasks = (task) => {
    const tasksCollection = JSON.parse(localStorage.getItem('tasksCollection'))
    let newTasksCollection = []
    if (tasksCollection) {
        newTasksCollection = [...tasksCollection, task]
    } else {
        newTasksCollection.push(task)
    }
    localStorage.setItem('tasksCollection', JSON.stringify(newTasksCollection))
}

// task status update
const setTaskStatus = (taskId, status) => {
    const tasksCollection = JSON.parse(localStorage.getItem('tasksCollection'))
    const existTask = tasksCollection.find(tc => tc._id === taskId)
    const restTasks = tasksCollection.filter(tc => tc._id !== taskId)
    existTask.status = status
    localStorage.setItem('tasksCollection', JSON.stringify([...restTasks, existTask]))
}
// delete task
const deleteTask = (taskId) => {
    const tasksCollection = JSON.parse(localStorage.getItem('tasksCollection'))
    const restTasks = tasksCollection.filter(tc => tc._id !== taskId)
    localStorage.setItem('tasksCollection', JSON.stringify(restTasks))
}


// getMyTask
const getTasks = () => {
    const tasksCollection = JSON.parse(localStorage.getItem('tasksCollection'))
    console.log(tasksCollection, '32');
    return tasksCollection
}


const myLocalDB = { storeTasks, setTaskStatus, deleteTask, getTasks }

export default myLocalDB