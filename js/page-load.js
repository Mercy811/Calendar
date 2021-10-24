document.addEventListener('DOMContentLoaded', (event)=>{
    let username = getCookie("username");
    let user_id = getCookie("user_id");
    if(username){
        document.getElementById("login-container").style.display = "none";
        document.getElementById("signup-container").style.display = "none";
        document.getElementById("calendar-container").style.display = "block";
        document.getElementById("welcome-user").innerHTML = "Welcome, "+username;
        loadEventAjax(user_id);
        loadTagAjax(user_id);
    }
})