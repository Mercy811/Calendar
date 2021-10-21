function loadCalendar(monthObject) {
    let weeks = monthObject.getWeeks();

    for (let w in weeks) {
        let days = weeks[w].getDates();
        let newTr = document.createElement("tr");
        newTr.className = "calendar-content-table-row";

        for (let d in days) {
            let newTd = newTr.appendChild(document.createElement("td"));
            newTd.className = "calendar-content-table-cell";
            newTd.appendChild(document.createTextNode(days[d].getDate()));
        }

        document.getElementById("calendar-content-table").appendChild(newTr);
    }
}

function clearCalendar() {
    let cells = document.getElementsByClassName("calendar-content-table-cell");
    while (cells.length > 0) {
        cells[0].parentNode.removeChild(cells[0]);
    }
    let rows = document.getElementsByClassName("calendar-content-table-row");
    while (rows.length > 0) {
        rows[0].parentNode.removeChild(rows[0]);
    }
}

function getMonthName(monthObject) {
    let month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    return month[monthObject.month]
}


// calendar initial
// display the current month calendar
let today = new Date();
let todayMonth = new Month(today.getFullYear(), today.getMonth());
let currentMonth = todayMonth;
loadCalendar(currentMonth);

document.getElementById("previous-month-btn").addEventListener("click", function (event) {
    currentMonth = currentMonth.prevMonth();
    clearCalendar();
    loadCalendar(currentMonth);
    document.getElementById("selected-month").innerHTML = currentMonth.year + " " + getMonthName(currentMonth);
}, false);

document.getElementById("current-month-btn").addEventListener("click", function (event) {
    currentMonth = todayMonth;
    clearCalendar();
    loadCalendar(currentMonth);
    document.getElementById("selected-month").innerHTML = currentMonth.year + " " + getMonthName(currentMonth);
}, false);

document.getElementById("next-month-btn").addEventListener("click", function (event) {
    currentMonth = currentMonth.nextMonth();
    clearCalendar();
    loadCalendar(currentMonth);
    document.getElementById("selected-month").innerHTML = currentMonth.year + " " + getMonthName(currentMonth);
}, false);



document.getElementById("selected-month").innerHTML = currentMonth.year + " " + getMonthName(currentMonth);

let username = getCookie("username");
    if(username){
        document.getElementById("welcome-user").innerHTML = "Welcome, "+username;
    }
