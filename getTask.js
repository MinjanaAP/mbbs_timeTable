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
        taskList.innerHTML = ''; 

        //? get count based on status
        let todoCount = 0;
        let inprogressCount =0;
        let doneCount =0;

        //? set new status
        let Status='';

        //? Group tasks by deuDate
        const groupedTasks = {};
        for(let id in tasks){
            const task = tasks[id];
            task.id = id;

            if(task.status==='todo'){
                todoCount++;
            }if(task.status==='inprogress'){
                inprogressCount++;
            }if(task.status==='done'){
                doneCount++;
            }

            const completedDate = task.CompletedDate;
            if(!groupedTasks[completedDate]){
                groupedTasks[completedDate] = [];
            }
            groupedTasks[completedDate].push(task);
        }

        //? sort tasks by dueDate
        const sortedDueDates = Object.keys(groupedTasks).sort((a,b) => {
            const dateA = new Date(a);
            const dateB = new Date(b);
            return dateA - dateB;
        });

        //? Display tasks in sorted order
        sortedDueDates.forEach((completedDate) => {
            const tasks = groupedTasks[completedDate];
            const dateHeader = document.createElement('h2');
            dateHeader.classList.add('bg-primary', 'text-white', 'p-2', 'text-center', 'rounded','sortedDate');
            dateHeader.innerText = completedDate;
            taskList.appendChild(dateHeader);

            tasks.forEach((task) => {

                //*Count task based on status
                console.log(todoCount,inprogressCount,doneCount);
                document.getElementById('todoCount').textContent = todoCount;
                document.getElementById('inprogressCount').textContent = inprogressCount;
                document.getElementById('doneCount').textContent = doneCount;

                let totalTask = todoCount+inprogressCount+doneCount;
                document.getElementById('totalTasks').textContent = totalTask;
                //console.log(totalTask);

                let todoPercentage = (todoCount/totalTask)*100;
                let inprogressPercentage = (inprogressCount/totalTask)*100;
                let donePercentage = (doneCount/totalTask)*100;
                //console.log(todoPercentage);

                document.getElementById('todoCount').style.width = `${todoPercentage}%`;
                document.getElementById('inprogressCount').style.width = `${inprogressPercentage}%`;
                document.getElementById('doneCount').style.width = `${donePercentage}%`;

                const listItem = document.createElement('li');
                listItem.classList.add('list-group-item');
                listItem.innerHTML = `
                    <div class="container-lg task-container p-3 ">
                    <div class="row mb-3">
                        <div class="col-md-6 col-12">
                            <h6 class="m-0 task-container-topics">Title</h6>
                            <h4 class="ps-2">${task.title}</h4>
                        </div>
                        <div class="col-md-6 col-12 d-md-flex justify-content-end">
                            <div class="d-flex justify-content-between">
                                <h6 class="task-container-topics d-md-none m-0 pt-2">Priority : </h6>
                                <h4><span class="badge" id="badge">${task.priority}</span></h4>
                            </div>
                            <div class="d-flex justify-content-between">
                                <h6 class="task-container-topics d-md-none m-0 pt-2">Status :</h6>
                                <h4><span class="badge mx-md-2" id="badge-status">${task.status}</span></h4>
                            </div>
                        </div>
                    </div>
                    <div class="container-lg task-description px-0 mb-3">
                        <h6 class=" task-container-topics m-0">Description</h6>
                        <h5 class="ps-2">${task.description}</h5>
                    </div>
                    <div class="row dates d-flex justify-content-between mb-3">
                        <div class="col-md-4">
                            <h6 class=" task-container-topics m-0">Due Date</h6>
                            <h4 class="ps-2">${task.CompletedDate}</h4>
                        </div>
                        <div class="col-md-4 d-md-flex justify-content-end">
                            <div class="createdDate">
                                <h6 class=" task-container-topics m-0">Created Date</h6>
                                <h4>${task.createdTime}</h4>
                            </div>
                        </div>
                    </div>
                    <div class="row task-buttons d-flex justify-content-between mb-3">
                        <div class="col-md-4 mb-2 mb-md-0">
                            <!-- Button trigger modal -->
                            <button type="button" class="btn change-status" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                            Change Status
                            </button>
                            
                            <!-- Modal -->
                            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered">
                                <div class="modal-content">
                                <div class="modal-header">
                                    <h4 class="modal-title fs-5" id="staticBackdropLabel">Change Task Status</h4>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <button class="modal-body-btn" onclick="newStatus('todo')"><h4><span class="badge bg-danger" id="badge">todo</span></h4></button>
                                    <button class="modal-body-btn" onclick="newStatus('inprogress')"><h4><span class="badge bg-warning" id="badge">inprogress</span></h4></button>
                                    <button class="modal-body-btn" onclick="newStatus('done')"><h4><span class="badge bg-success" id="badge">done</span></h4></button>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary" onclick="setStatus('${task.id}')" data-bs-dismiss="modal">Set Status</button>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div class="col-md-4 col-12 d-flex align-items-end justify-content-end">
                                <div class="col-6 p-1">
                                    <button class="btn edit-task w-100">Edit</button>
                                </div>
                                <div class="col-6 p-1">
                                    <button class="btn delete-task w-100"  onclick="deleteTask('${task.id}')">Delete</button>
                                </div>
                        </div>
                    </div>

                </div>
            `;
            taskList.appendChild(listItem);

            //? Change the badge color based on the priority
            const badge = listItem.querySelector('#badge');
            if (task.priority === 'High') {
                badge.classList.add('bg-danger');
            } else if (task.priority === 'Medium') {
                badge.classList.add('bg-warning');
            } else {
                badge.classList.add('bg-success');
            }

            const badgeStatus = listItem.querySelector('#badge-status');
            if (task.status === 'todo') {
                badgeStatus.classList.add('bg-danger');
            } else if (task.status === 'inprogress') {
                badgeStatus.classList.add('bg-warning');
            } else {
                badgeStatus.classList.add('bg-success');
            }
        });
            
});
    
        });
    }

    //*delete function
    const deleteTask = (taskId)=>{
        //console.log(taskId);
        db.child(taskId).remove()
            .then(()=>{
                console.log('Task deleted successfully');
                Swal.fire({
                    title: "Task Deleted",
                    text: "Task deleted successfully",
                    icon: "success"
                });
                fetchTasks();
            })
            .catch((error)=>{
                console.error("Error deleting task: ", error);
                Swal.fire({
                    title: "Error",
                    text: "An error occurred while deleting the task",
                    icon: "error"
                });
            })
    }

    //*set new Status
    const newStatus = (newStatus)=>{
        Status = newStatus;
    }

    //*set new Status in db
    const setStatus = (taskId)=>{
        //console.log(Status + taskId);
        db.child(taskId).update({status:Status})
        .then(()=>{
            console.log('Task status is updated to ' + Status);
            Swal.fire({
                title: "Status Updated",
                text: "Task status updated successfully",
                icon: "success"
            });
            fetchTasks(); 
        })
        .catch((error) => {
            console.error("Error updating task status: ", error);
            Swal.fire({
                title: "Error",
                text: "An error occurred while updating the task status",
                icon: "error"
            });
        });
    }

// Fetch and display tasks when the page loads
document.addEventListener('DOMContentLoaded', fetchTasks);