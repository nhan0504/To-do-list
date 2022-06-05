const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

// Classes name
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// List to hold all the to do
let LIST = [], id = 0;

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
document.addEventListener("keyup", function(even) {
    if (event.keyCode == 13) {
        const toDo = input.value;
        if (toDo) {
            addToDo(toDo, id, false, false);
            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            })
            id++;
        }
        input.value = "";
    }
});