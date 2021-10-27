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

    const data = {'title':title,
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

// urgent event callback function
function isUrgent(start_time){
    let current_time = new Date();
    time_inteval = (new Date(start_time).getTime() - new Date(current_time).getTime())/60000;
    if (time_inteval < 120 && time_inteval >0) {  

        return true;     
    }
    return false;
}

//delete event function

function deleteEvent (eventId) {
    const event_id= eventId;

    // Make a URL-encoded string for passing POST data:
    const data = { 'event_id': event_id};

    fetch("php/delete.php", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' }
    })
        .then(response => response.json())
        .catch(error => console.error('Error:', error))
}

// ---------------
// Edit EVENT
function editEvent (eventId, title, startTime, endTime, content) {

    const data = {
                  'event_id': eventId, 
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
        .catch((error) => {
            console.log(error);
          })

}


// load event funvtion
function loadEvent(data){
    if (data.msg){
        alert(data.msg);
        return
    }
    let table = document.getElementById("calendar-content-table");
    let firstDateTimeStamp = new Date(table.children[1].firstChild.id.substring(0,10)).getTime();
    let lastdateTimeStamp = new Date(table.lastChild.lastChild.id.substring(0,10)).getTime();

    for(i in data){
        let cellId = data[i].start_time.substring(0,10);
        if (!isDisplay(firstDateTimeStamp,lastdateTimeStamp,new Date(cellId).getTime())){
            continue;
        }

        if (isUrgent(data[i].start_time)) {
            //加到reminder里
            let reminderNode = document.getElementById("approaching_event");
            let urgent_event= document.createElement("p");
            urgent_event.innerHTML = "<strong>Title: </strong>" +data[i].title +" <strong>Start Time: </strong> "+ data[i].start_time + " " + "<strong>Duration: </strong>" + data[i].duration +" minutes <br>"  ;
            reminderNode.appendChild(urgent_event);
            
        }
        
        let eventId = data[i].event_id;
        let eventTag = data[i].tag;

        let eventContainer = document.createElement("div");
        eventContainer.className = "event-container";

        // <p>
        //     <button id="event-btn-{eventID}" class="event-btn">{title}</button>
        // </p>
        let eventP = document.createElement("p");
        let eventBtn = document.createElement("button");
        eventBtn.id = "event-btn-"+eventId;
        eventBtn.innerHTML = data[i].title;
        eventBtn.className = "event-btn"
        eventBtn.className = eventBtn.className + " event-tag-all";
        if (eventTag){
            eventBtn.className = eventBtn.className + " event-tag-"+eventTag;
        }
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
        eventDialog.className = "event-dialog";
        let eventForm = document.createElement("form");

        let titleP = document.createElement("input");
        titleP.value= data[i].title;
        titleP.id = "event-title-"+eventId;
        let startTimeP = document.createElement("input");
        startTimeP.value = data[i].start_time;
        let endTimeP = document.createElement("input");
        endTimeP.value = data[i].end_time;
        let contentP = document.createElement("input");
        contentP.value= data[i].content;
        contentP.id = "event-content-" + eventId;
        let tagP = document.createElement("input");
        tagP.value = data[i].tag;

        let contentDeleteBtn = document.createElement("button");
        contentDeleteBtn.innerHTML = "Delete";
        contentDeleteBtn.id = "event-delete-"+eventId;
        let editBtn = document.createElement("button");
        editBtn.innerHTML = "Edit";
        editBtn.id = "event-edit-" + eventId;

        let title_label = document.createElement("label");
        title_label.innerHTML = "*Title";
        let st_label = document.createElement("label");
        st_label.innerHTML = "*Start Time";
        let et_label = document.createElement("label");
        et_label.innerHTML = "*End Time";
        let content_label = document.createElement("label");
        content_label.innerHTML = "*Content";
        let tag_label = document.createElement("label");
        tag_label.innerHTML = "*Tag";

        eventForm.appendChild(title_label);
        eventForm.appendChild(titleP);
        eventForm.appendChild(st_label);
        eventForm.appendChild(startTimeP);
        eventForm.appendChild(et_label);
        eventForm.appendChild(endTimeP);
        eventForm.appendChild(content_label);
        eventForm.appendChild(contentP);
        eventForm.appendChild(tag_label);
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
        document.getElementById(editBtn.id).addEventListener("click", function(){editEvent(eventId, titleP.value, startTimeP.value, endTimeP.value, contentP.value)});

    }

}

function loadEventAjax(){
    const data = {'token':getCookie('token')};   
    
    fetch("php/loadEvent.php",{
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'content-type': 'application/json'}
    })
    .then(response => response.json())
    .then(data => loadEvent(data))
    .catch(error => console.error('Error:', error));

}


