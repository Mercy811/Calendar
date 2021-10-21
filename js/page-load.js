document.addEventListener('DOMContentLoaded', (event)=>{
    let username = getCookie("username");
    if(username){
        document.getElementById("login-container").style.display = "none";
        document.getElementById("calendar-container").style.display = "block";
    }
})