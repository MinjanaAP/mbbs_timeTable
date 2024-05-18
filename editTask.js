// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCY81_uCq8osd3Pegidp1RMEJJDPhOvGvI",
    authDomain: "todolist-86225.firebaseapp.com",
    databaseURL: "https://todolist-86225-default-rtdb.firebaseio.com",
    projectId: "todolist-86225",
    storageBucket: "todolist-86225.appspot.com",
    messagingSenderId: "334070713211",
    appId: "1:334070713211:web:d307ac9edf30f3e3514bde"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference to the database
const db = firebase.database().ref('todoList');

// Function to get query parameters
const getQueryParam = (param) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const taskId = getQueryParam('taskId');
console.log(taskId);

// Function to open the edit form and populate it with task details
const openEditForm = (taskId) => {
    if (!taskId) {
        console.error("Task ID is null or undefined");
        return;
    }

    // Get the task details
    db.child(taskId).once('value', (snapshot) => {
        const task = snapshot.val();
        if (task) {
            // Populate the edit form with task details
            document.getElementById('editTaskTitle').value = task.title;
            document.getElementById('editTaskDescription').value = task.description;
            document.getElementById('editTaskDate').value = task.CompletedDate;
            document.getElementById('editTaskPriority').value = task.priority;
        } else {
            console.error("Task not found");
        }
    });
}

// Function to update the task
const updateTask = () => {
    if (!taskId) {
        console.error("Task ID is null or undefined");
        return;
    }

    var title = document.getElementById('editTaskTitle').value;
    var description = document.getElementById('editTaskDescription').value;
    var CompletedDate = document.getElementById('editTaskDate').value;
    var priority = document.getElementById('editTaskPriority').value;
    var createdTime = new Date().toLocaleDateString() + ' updated';
    var editedTime = new Date();

    const updatedTasks = {
        title: title,
        description: description,
        CompletedDate: CompletedDate,
        priority: priority,
        createdTime: createdTime,
    }

    if(title === '' || description === '' || CompletedDate === '' || priority === ''){
        Swal.fire({
            title: "Error",
            text: "Please fill all the fields",
            icon: "error"
        });
        return;
    }else if(new Date(CompletedDate) < new Date(editedTime.toLocaleDateString())){
        Swal.fire({
            title: "Error",
            text: "Due date should be greater than current date",
            icon: "error"
        });
        return;
    }

    //console.log(updatedTasks);

    db.child(taskId).update(updatedTasks)
        .then(() => {
            console.log('Task updated successfully');
            Swal.fire({
                title: "Task Updated",
                text: "Task updated successfully",
                icon: "success"
            });
            const redirect = () => {
                window.location.href = 'todoList.html';
            }
            setTimeout(redirect, 2000);
        })
        .catch((error) => {
            console.error("Error updating task: ", error);
            Swal.fire({
                title: "Error",
                text: "An error occurred while updating the task",
                icon: "error"
            });
        });
}

// Ensure DOM is fully loaded before running openEditForm
document.addEventListener('DOMContentLoaded', () => {
    openEditForm(taskId);
});
