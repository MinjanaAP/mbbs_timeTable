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

//?reference database
const db = firebase.database().ref('todoList');

const fetchTasks = () => {
    db.once('value', (snapshot) => {
        const tasks = snapshot.val();
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = ''; // Clear the task list

        for (let id in tasks) {
            const task = tasks[id];
            const listItem = document.createElement('li');
            listItem.classList.add('list-group-item');
            listItem.innerHTML = `
                <h5><strong>Tittle : </strong>${task.title}</h5>
                <p><strong>Description : </strong>${task.description}</p>
                <p><strong>Deu Date : </strong> ${task.CompletedDate}</p>
                <p><strong>Priority : </strong> ${task.priority}</p>
                <p><strong>Created Date : </strong> ${task.createdTime}</p>
            `;
            taskList.appendChild(listItem);
        }
    });
}

// Fetch and display tasks when the page loads
document.addEventListener('DOMContentLoaded', fetchTasks);