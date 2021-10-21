function loginJudge(data){
    if (data.success){
        document.getElementById("login-container").style.display = "none";
        document.getElementById("calendar-container").style.display = "block";
        setCookie("user_id",data.user_id,1);
        setCookie("username",data.username,1);
    }else{
        document.getElementById("login-msg").innerHTML = data.msg;
    }
    
}


function loginAjax(event) {
    const username = document.getElementById("username").value; // Get the username from the form
    const password = document.getElementById("password").value; // Get the password from the form

    // Make a URL-encoded string for passing POST data:
    const data = { 'username': username, 'password': password };

    fetch("login.php", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' }
    })
        .then(response => response.json())
        .then(data => loginJudge(data))
        .catch(error => console.error('Error:', error))
}

document.getElementById("login-btn").addEventListener("click", loginAjax, false); // Bind the AJAX call to button click