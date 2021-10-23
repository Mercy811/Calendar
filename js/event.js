// ---------------
// CREATE EVENT
$("#new-event-dialog").dialog({
    autoOpen: false,
});
$("#new-event-btn").click(function () {
    $("#new-event-dialog").dialog("open");
});

function newEventResponse(data){
    alert(data.msg);
    console.log(data.msg);
}

function newEventAjax(event){
    const title = document.getElementById("title").value;
    const start_time = document.getElementById("start-time").value;
    const end_time = document.getElementById("end-time").value;
    const event_content = document.getElementById("event-content").value;
    const user_id = getCookie("user_id");

    const data = {'user_id':user_id,
                  'title':title,
                  'start_time':start_time,
                  'end_time':end_time,
                  'duration':(new Date(end_time) - new Date(start_time))/60000,
                  'event_content':event_content};

    fetch("php/new-event.php",{
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'content-type':'application/json'}
    })
        .then(response => response.json())
        .then(data => newEventResponse(data))
        .catch(error => console.error('Error:', error))
}

// Bind the AJAX call to button click
document.getElementById("create-event-btn").addEventListener("click", newEventAjax, false);

// ---------------
// DISPLAY EVENT
function loadEvent(data){
    for(i in data){
        
        let cellId = data[i].start_time.substring(0,10);

        let eventContainer = document.createElement("div");
        eventContainer.className = "event-container";

        // <p>
        //     <button id="event-btn-{yyyy-mm-dd}">{title}</button>
        // </p>
        let eventP = document.createElement("p");
        let eventBtn = document.createElement("button");
        eventBtn.id = "event-btn-"+cellId;
        eventBtn.innerHTML = data[i].title;
        eventP.appendChild(eventBtn);

        // <div id="event-dialog-{yyyy-mm-dd}" title="{title}">
        //     <form>
        //         <p>{title}</p>
        //         <p>{start-time}</p>
        //         <p>{end-time}</p>
        //         <p>{content}</p>
        //     </form>
        // </div>
        let eventDialog = document.createElement("div");
        eventDialog.id = "event-dialog-"+cellId;
        eventDialog.title = "Event Detail";
        let eventForm = document.createElement("form");
        let titleP = document.createElement("p");
        titleP.innerHTML = data[i].title;
        let startTimeP = document.createElement("p");
        startTimeP.innerHTML = data[i].start_time;
        let endTimeP = document.createElement("p");
        endTimeP.innerHTML = data[i].end_time;
        let contentP = document.createElement("p");
        contentP.innerHTML = data[i].content;

        eventForm.appendChild(titleP);
        eventForm.appendChild(startTimeP);
        eventForm.appendChild(endTimeP);
        eventForm.appendChild(contentP);
        eventDialog.appendChild(eventForm);

        // <div id="event-container">
        // eventP
        // eventDialog
        // </div>
        eventContainer.appendChild(eventP);
        eventContainer.appendChild(eventDialog);

        document.getElementById(cellId).appendChild(eventContainer)

        $("#event-dialog-"+cellId).dialog({
            autoOpen: false,
        });
        $("#event-btn-"+cellId).click(function () {
            $("#event-dialog-"+cellId).dialog("open");
        });
    }

}

function loadEventAjax(user_id){
    console.log("loadEventAjax");


    const data = {'user_id':user_id};
    
    fetch("php/loadEvent.php",{
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'content-type': 'application/json'}
    })
    .then(response => response.json())
    .then(data => loadEvent(data))
    .catch(error => console.error('Error:', error))
}