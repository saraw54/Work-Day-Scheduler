var timeArray = ["9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"];

function addTodBox(i) {
    return "<div id=\"" + timeArray[i] + "\" class=\"col-xs-4 col-sm-2\">" + timeArray[i] + "</div>";
}

function addToDo(i) {
    var bgColor = "past";
    //if statements goes here
    return "<input id=\"" + timeArray[i] + "note\" class=\"col-xs-10 col-sm-8 " + bgColor + "\" > </input>";
}

function addSaveBtn(i) {
    return "<button id=\"" + timeArray[i] + "btn\" class=\"col-xs-2 col-sm-2\"> S </button>";
}

function buildTable() {
    var testing = $("#testing");
    var accum = "";
    for (var i = 0; i < timeArray.length; i++) {
        accum += addTodBox(i);
        accum += addToDo(i);
        accum += addSaveBtn(i);
    }
    testing.html(accum);

}
//executed at load time
buildTable();