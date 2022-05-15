var currentDate = moment();
console.log(currentDate);
$("#currentDay").text(currentDate.format("dddd, MMMM Do YYYY"))
var currentTime = currentDate.format("h:mm:ss a")
console.log(currentTime)

function colorRow(rowTime) {
    var taskNow = moment(currentTime, "ha");
    // var taskEntry = moment(time, "H A");
    if (taskNow.isBefore(rowTime) === true) {
        return "past";
    }
    else if (taskNow.isAfter(rowTime) === true) {
        return "future";

    }
    return "present";
}

var timeArray = ["9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"];

function addTodBox(i) {
    return "<div id=\"" + timeArray[i] + "\" class=\"col-xs-4 col-sm-2\">" + timeArray[i] + "</div>";
}

function addToDo(i) {
    var bgColor = colorRow(i);
    //if statements goes here
    return "<input id=\"" + timeArray[i] + "note\" class=\"col-xs-10 col-sm-8 " + bgColor + "\" > </input>";
}

function addSaveBtn(i) {
    return "<button id=\"" + timeArray[i] + "btn\" class=\"col-xs-2 col-sm-2\" onclick=saveTask(\"" + timeArray[i] + "\")> S </button>";
}

function buildTable() {
    var calenderTable = $("#calenderTable");
    var accum = "";
    for (var i = 0; i < timeArray.length; i++) {
        accum += addTodBox(i);
        accum += addToDo(i);
        accum += addSaveBtn(i);
    }
    calenderTable.html(accum);
}
function getTask() {
    var saveTask = localStorage.getItem("task");
    if (saveTask == null) {
        saveTask = {

        };
    }
    else {
        saveTask = JSON.parse(saveTask)

    }
    return saveTask;
}


function populateTable() {
    var tasks = getTask();
    for (var x = 0; x < timeArray.length; x++) {
        var tableBody = $("#" + timeArray[x] + "note");
        tableBody.val(tasks[timeArray[x]]);
    }
}


function saveTask(id) {
    console.log("saveTask");
    var saveTask = getTask();

    saveTask[id] = $("#" + id + "note").val();
    // saveTask.push(addSaveBtn);
    localStorage.setItem("task", JSON.stringify(saveTask));
}
//executed at load time
buildTable();
populateTable();

