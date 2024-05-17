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
    var status = 'todo';

    if(title === '' || description === '' || CompletedDate === '' || priority === ''){
        Swal.fire({
            title: "Error",
            text: "Please fill all the fields",
            icon: "error"
        });
        return;
    }else if(new Date(CompletedDate) < new Date(createdTime.toLocaleDateString())){
        Swal.fire({
            title: "Error",
            text: "Due date should be greater than current date",
            icon: "error"
        });
        return;
    }else{
        saveTask(title,description,CompletedDate,priority,createdTime,status);
    }
    //console.log(title,description,date,priority,createdTime);
   
}

const saveTask = (title,description,CompletedDate,priority,createdTime,status) => {
    var newTask = db.push();
    newTask.set({
        title: title,
        description: description,
        CompletedDate: CompletedDate,
        priority: priority,
        createdTime: createdTime.toLocaleDateString(),
        status: status
    });
    console.log('Task saved successfully');

    Swal.fire({
        title: "Task Saved",
        text: "Task saved successfully",
        icon: "success"
    });

    document.getElementById('addTaskForm').reset();
    //?redirect to todoList page after some delay
    const redirect = () => {
        window.location.href = 'todoList.html';
    }
    setTimeout(redirect,2000);
}

const getElementValue = (id) => {
    return document.getElementById(id).value;
}


