function loadPage(){
    let username = getCookie("username");

    if (username){
        document.getElementById("login-container").style.display = "none";
        document.getElementById("signup-container").style.display = "none";
        document.getElementById("calendar-container").style.display = "block";
        document.getElementById("user-info-container").style.display = "block";

        document.getElementById("new-event-container").style.display = "block";
        document.getElementById("tags-container").style.display = "block";
        document.getElementById("welcome-user").innerHTML = "Welcome, "+username;
        

        if (getCookie("username") != "Guest"){
            loadEventAjax();
            loadTagAjax();
        }  
    }
}

// document.addEventListener('DOMContentLoaded', loadPage, false);