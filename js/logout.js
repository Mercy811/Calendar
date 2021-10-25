document.getElementById("logout-btn").addEventListener("click", function (event) {

    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.getElementById("login-container").style.display = "block";
    document.getElementById("calendar-container").style.display = "none";
    document.getElementById("tags-container").style.display = "none";
    document.getElementById("new-event-container").style.display = "none";
    document.getElementById("welcome-user").innerHTML = "";
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    
}, false);