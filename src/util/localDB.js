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
    const existTask = tasksCollection?.find(tc => tc._id === taskId)
    const restTasks = tasksCollection?.filter(tc => tc._id !== taskId)
    existTask.status = status
    localStorage.setItem('tasksCollection', JSON.stringify([...restTasks, existTask]))
}
// task update
const updateTask = (task)=>{
    const {_id, title, deadline, priority} = task
    const tasksCollection = JSON.parse(localStorage.getItem('tasksCollection'))
    let expectedTask = tasksCollection?.find(td=> td._id === _id)
    const restTasks = tasksCollection?.filter(td=> td._id !== _id)
    expectedTask = {...expectedTask, title, deadline, priority}
    localStorage.setItem('tasksCollection', JSON.stringify([...restTasks, expectedTask]))
}

// delete task
const deleteTask = (taskId) => {
    const tasksCollection = JSON.parse(localStorage.getItem('tasksCollection'))
    const restTasks = tasksCollection.filter(tc => tc._id !== taskId)
    localStorage.setItem('tasksCollection', JSON.stringify(restTasks))
}


// getMyTasks
const getTasks = () => {
    const tasksCollection = JSON.parse(localStorage.getItem('tasksCollection'))
    return tasksCollection
}

// get a specific task
const getExpectedTask = (taskId) => {
    const tasksCollection = JSON.parse(localStorage.getItem('tasksCollection'))
    const expectedTask = tasksCollection?.find(td=> td?._id === taskId)
    return expectedTask
}


const myLocalDB = { storeTasks, setTaskStatus, deleteTask, updateTask, getTasks, getExpectedTask }

export default myLocalDB