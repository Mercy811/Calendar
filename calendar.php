<?php
session_start();
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>xytCalendar</title>
    <link rel="stylesheet" href="css/style.css">
</head>

<body>
    <!-- TO DO: change it to current date -->
    <p id="selected-month">
        Oct 17
    </p>
    <p>
        <button id="previous-month-btn"> < </button>
        <button id="current-month-btn">Today</button>
        <button id="next-mobth-btn"> > </button>
    </p>
    <p>
        <table id="calendar-content-table">
            <tr>
                <th class="calendar-content-table-cell">Sun</th>
                <th class="calendar-content-table-cell">Mon</th>
                <th class="calendar-content-table-cell">Tue</th>
                <th class="calendar-content-table-cell">Wed</th>
                <th class="calendar-content-table-cell">Thu</th>
                <th class="calendar-content-table-cell">Fri</th>
                <th class="calendar-content-table-cell">Sat</th>
            </tr>
        </table>
    </p>



    <script src="http://classes.engineering.wustl.edu/cse330/content/calendar.min.js"></script>
    <script>
        let today = new Date();
        let currentMonth = new Month(today.getFullYear(),today.getMonth());
        let weeks = currentMonth.getWeeks();
        
        for(var w in weeks){
            var days = weeks[w].getDates();
            var newTr = document.createElement("tr");

            for(var d in days){
                var newTd = newTr.appendChild(document.createElement("td"));
                newTd.appendChild(document.createTextNode(days[d].getDate()));
            }

            document.getElementById("calendar-content-table").appendChild(newTr);
        }

        console.log("typeof",typeof(weeks[0][0]));

        
    </script>

</body>

</html>