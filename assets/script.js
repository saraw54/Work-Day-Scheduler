//sets current date and time for header and past/present/future times
var currentDate = moment();
console.log(currentDate);
$("#currentDay").text(currentDate.format("dddd, MMMM Do YYYY"))
var currentTime = currentDate.format("h:mm:ss a")
console.log(currentTime)
currentTime = moment().format("H");

/**
 * Gets the CSS class to use for coloring a row
 * @param rowTime - the hour that the colored row represents 0-23
 * @returns past|present|future (these are CSS class names)
 */
function colorRow(rowTime) {
    if (currentTime > rowTime) {
        return "past";
    }
    else if (currentTime < rowTime) {
        return "future";

    }
    else {
        return "present";
    }
}

//sets times to view on calendar

var timeArray = ["9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"];

/**
 * builds a div layer string for time of day 
 * @param i -  index to the time array
 * @returns - populates times to table
 */

function addTodBox(i) {
    return "<div id=\"" + timeArray[i] + "\" class=\"col-xs-4 col-sm-2\">" + timeArray[i] + "</div>";
}

/**
 * builds an input box in calendar row
 * @param i -  index to input to determine time to assign input to
 * @returns - populates task to table
 */

function addToDo(i) {
    var bgColor = colorRow(i + 9);
    return "<input id=\"" + timeArray[i] + "note\" class=\"col-xs-10 col-sm-8 " + bgColor + "\" > </input>";
}

/** */

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
    localStorage.setItem("task", JSON.stringify(saveTask));
}
//executed at load time/build calender/populate input
buildTable();
populateTable();

