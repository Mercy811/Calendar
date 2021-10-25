document.addEventListener('DOMContentLoaded', (event)=>{
    let username = getCookie("username");
    let user_id = getCookie("user_id");

    if (username){
        if (user_id == "100" &&username == "guest") {
            document.getElementById("login-container").style.display = "none";
            document.getElementById("signup-container").style.display = "none";
            document.getElementById("calendar-container").style.display = "block";
            document.getElementById("user-info-container").style.display = "block";
            document.getElementById("new-event-container").style.display = "none";
            document.getElementById("tags-container").style.display = "none";
            document.getElementById("welcome-user").innerHTML = "Browsing as a guest.";
            document.getElementById("logout-btn").innerHTML = "Back to Login Page";
            loadEventAjax(user_id);
            loadTagAjax(user_id);
        } else {
        document.getElementById("login-container").style.display = "none";
        document.getElementById("signup-container").style.display = "none";
        document.getElementById("calendar-container").style.display = "block";
        document.getElementById("user-info-container").style.display = "block";

        document.getElementById("new-event-container").style.display = "block";
        document.getElementById("tags-container").style.display = "block";
        document.getElementById("welcome-user").innerHTML = "Welcome, "+username;
        

        loadEventAjax(user_id);
        loadTagAjax(user_id);}
    }
})