document.getElementById("logout-btn").addEventListener("click", function (event) {
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.getElementById("login-container").style.display = "block";
    document.getElementById("calendar-container").style.display = "none";
}, false);