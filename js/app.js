const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

// Classes name
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// List to hold all the to do
let LIST, id;

// Get to do list from local storage
let data = localStorage.getItem("TODO");

// Check if to do list is empty or not
if (data) {
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST); // Show the list to the user interface
} else {
    LIST = [];
    id = 0;
}

// Load the list to user interface
function loadList(array) {
    array.forEach(element => {
        addToDo(element.name, element.id, element.done, element.trash);
    });
}

// Show date
const options = {weekday : "long", month: "short", day: "numeric"};
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options);

// Add to do
function addToDo(toDo, id, done, trash) {
    if (trash) { return; }
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    const item = `
                <li class="item">
                    <i class="fa ${DONE} co" job="complete" id = ${id}></i>
                        <p class="text ${LINE}">${toDo}</p>
                        <i class="fa fa-trash-o de" job="delete" id="0"></i>
                </li>
                `
    const position = "beforeend";
    list.insertAdjacentHTML(position, item);
}

// Add item to the list when hit enter
document.addEventListener("keyup", function(event) {
    if (event.key == "Enter") {
        const toDo = input.value;
        if (toDo) {
            addToDo(toDo, id, false, false);
            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            })
            // Add the todo list to local storage
            localStorage.setItem("TODO", JSON.stringify(LIST));
            id++;
        }
        input.value = "";
    }
});

// Complete to do button
function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

// Remove to do
function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

list.addEventListener("click", function(event){
    const element = event.target;
    const elementJob = element.attributes.job.value;
    if (elementJob == "complete") {
        completeToDo(element);
    } else if (elementJob == "delete"){
        removeToDo(element);
        // Add the todo list to local storage
        localStorage.setItem("TODO", JSON.stringify(LIST));
    }
});

clear.addEventListener("click", () => {
    localStorage.clear();
    location.reload();
} )