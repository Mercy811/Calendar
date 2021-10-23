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
    // for(i in data.events){
    //     console.log(data.events[i].start_time.substring(0,10));
    //     let oneEvent = document.createElement("p");
    //     oneEvent.innerHTML = data.events[i].title;
    //     document.getElementById(data.events[i].start_time.substring(0,10)).appendChild(oneEvent)
    // }
    console.log(data.events);

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