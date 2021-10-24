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
    const event_tag = document.getElementById("event-tag").value;
    const user_id = getCookie("user_id");

    const data = {'user_id':user_id,
                  'title':title,
                  'start_time':start_time,
                  'end_time':end_time,
                  'duration':(new Date(end_time) - new Date(start_time))/60000,
                  'event_content':event_content,
                  'event_tag':event_tag,
                  'token':getCookie("token")};

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

// Only display events on the "current" month
function isDisplay(firstDate, LastDate, date){
    if(date>firstDate && date<LastDate){
        return true;
    }else{
        return false;
    }
}

//delete event function

function deleteEvent (eventId) {
    const event_id= eventId;
    const user_id = getCookie("user_id");

    // Make a URL-encoded string for passing POST data:
    const data = { 'event_id': event_id, "user_id":user_id};

    fetch("php/delete.php", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' }
    })
        .then(response => response.json())
        .catch(error => console.error('Error:', error))
}


// load event funvtion
function loadEvent(data){
    let table = document.getElementById("calendar-content-table");
    let firstDateTimeStamp = new Date(table.children[1].firstChild.id.substring(0,10)).getTime();
    let lastdateTimeStamp = new Date(table.lastChild.lastChild.id.substring(0,10)).getTime();

    for(i in data){
        let cellId = data[i].start_time.substring(0,10);
        if (!isDisplay(firstDateTimeStamp,lastdateTimeStamp,new Date(cellId).getTime())){
            continue;
        }
        
        let eventId = data[i].event_id;

        let eventContainer = document.createElement("div");
        eventContainer.className = "event-container";

        // <p>
        //     <button id="event-btn-{eventID}">{title}</button>
        // </p>
        let eventP = document.createElement("p");
        let eventBtn = document.createElement("button");
        eventBtn.id = "event-btn-"+eventId;
        eventBtn.className = "event-btn"
        eventBtn.innerHTML = data[i].title;
        eventP.appendChild(eventBtn);

        // <div id="event-dialog-{eventId}" title="{title}">
        //     <form>
        //         <p>{title}</p>
        //         <p>{start-time}</p>
        //         <p>{end-time}</p>
        //         <p>{content}</p>
        //         <p>{tag}</p>
        //     </form>
        // </div>
        let eventDialog = document.createElement("div");
        eventDialog.id = "event-dialog-"+eventId;
        eventDialog.title = "Event Detail";
        let eventForm = document.createElement("form");

        let titleP = document.createElement("input");
        titleP.value= data[i].title;
        let startTimeP = document.createElement("input");
        startTimeP.value = data[i].start_time;
        let endTimeP = document.createElement("input");
        endTimeP.value= data[i].end_time;
        let contentP = document.createElement("input");
        contentP.value= data[i].content;
        let tagP = document.createElement("input");
        tagP.value = data[i].tag;

        let contentDeleteBtn = document.createElement("button");
        contentDeleteBtn.innerHTML = "Delete";
        contentDeleteBtn.id = "event-delete-"+eventId;
        let editBtn = document.createElement("button");
        editBtn.innerHTML = "Edit";
        editBtn.id = "event-edit-"+eventId;

        eventForm.appendChild(titleP);
        eventForm.appendChild(startTimeP);
        eventForm.appendChild(endTimeP);
        eventForm.appendChild(contentP);
        eventForm.appendChild(tagP);

        eventForm.appendChild(contentDeleteBtn);
        eventForm.appendChild(editBtn);

        eventDialog.appendChild(eventForm);
       

        // <div id="event-container">
        // eventP
        // eventDialog
        // </div>
        eventContainer.appendChild(eventP);
        eventContainer.appendChild(eventDialog);

        document.getElementById(cellId).appendChild(eventContainer);

        

        $("#event-dialog-"+eventId).dialog({
            autoOpen: false,
        });
        $("#event-btn-"+eventId).click(function () {
            $("#event-dialog-"+eventId).dialog("open");
        });

        document.getElementById(contentDeleteBtn.id).addEventListener("click", function(){deleteEvent(eventId)});
        document.getElementById(editBtn.id).addEventListener("click", function(){ editEvent(eventId,titleP.value,startTimeP,endTimeP,contentP)});

    }

}

function loadEventAjax(user_id){
    const data = {'user_id':user_id,'token':getCookie('token')};
    
    fetch("php/loadEvent.php",{
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'content-type': 'application/json'}
    })
    .then(response => response.json())
    .then(data => loadEvent(data))
    .catch(error => console.error('Error:', error))
}


function editEvent (eventId, title, startTime, endTime, content) {

    const user_id = getCookie("user_id");
    const data = {
                  'event_id': eventId, 
                  "user_id":user_id,
                  'title':title,
                  'start_time':startTime,
                  'end_time':endTime,
                  'duration':(new Date(endTime) - new Date(startTime))/60000,
                  'event_content':content,
                  'token':getCookie("token")};

    fetch("php/edit.php", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' }
    })
        .then(response => response.json())
        .then(data => alert(data.msg))
        .catch(error => console.error('Error:', error))
}