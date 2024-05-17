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

document.getElementById('addTaskForm').addEventListener('submit',submitForm);

function submitForm(e){
    e.preventDefault();
    //?get input value
    var createdTime = new Date();
    var title = getElementValue('taskTitle');
    var description = getElementValue('taskDescription');
    var CompletedDate = getElementValue('taskDate');
    var priority = getElementValue('taskPriority');

    //console.log(title,description,date,priority,createdTime);
    saveTask(title,description,CompletedDate,priority,createdTime);
}

const saveTask = (title,description,CompletedDate,priority,createdTime) => {
    var newTask = db.push();
    newTask.set({
        title: title,
        description: description,
        CompletedDate: CompletedDate,
        priority: priority,
        createdTime: createdTime.toLocaleDateString()
    });
    console.log('Task saved successfully');

    Swal.fire({
        title: "Task Saved",
        text: "Task saved successfully",
        icon: "success"
    });

    document.getElementById('addTaskForm').reset();
}

const getElementValue = (id) => {
    return document.getElementById(id).value;
}


