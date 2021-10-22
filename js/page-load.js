document.addEventListener('DOMContentLoaded', (event)=>{
    let username = getCookie("username");
    let user_id = getCookie("user_id");
    if(username){
        document.getElementById("login-container").style.display = "none";
        document.getElementById("calendar-container").style.display = "block";
        document.getElementById("welcome-user").innerHTML = "Welcome, "+username;
        loadEventAjax(user_id);
    }
})

function loadEvent(data){
    console.log(data.start_time.substring(0,10));
    let oneEvent = document.createElement("p");
    oneEvent.innerHTML = data.title;
    document.getElementById(data.start_time.substring(0,10)).appendChild(oneEvent)

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