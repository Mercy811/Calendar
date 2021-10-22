function loginJudge(data){
    if (data.success){
        document.getElementById("login-container").style.display = "none";
        document.getElementById("calendar-container").style.display = "block";
        document.getElementById("welcome-user").innerHTML = "Welcome, "+data.username;
        setCookie("user_id",data.user_id,1);
        setCookie("username",data.username,1);
        document.getElementById("login-msg").innerHTML = "";
    }else{
        document.getElementById("login-msg").innerHTML = data.msg;
    }
    
}


function loginAjax(event) {
    const username = document.getElementById("username").value; // Get the username from the form
    const password = document.getElementById("password").value; // Get the password from the form

    // Make a URL-encoded string for passing POST data:
    const data = { 'username': username, 'password': password };

    fetch("php/login.php", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' }
    })
        .then(response => response.json())
        .then(data => loginJudge(data))
        .catch(error => console.error('Error:', error))
}

// Bind the AJAX call to button click
document.getElementById("login-btn").addEventListener("click", loginAjax, false);
