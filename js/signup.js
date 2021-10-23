function signup(data){
    document.getElementById("signup-msg").innerHTML = data.msg; 
    clearInput();   
}

function clearInput () {
    document.getElementById("new_username").innerHTML = "";
    document.getElementById("new_password").innerHTML = "";
    document.getElementById("repassword").innerHTML = "";

}

function signupAjax(event) {
    const username = document.getElementById("new_username").value; // Get the username from the form
    const password = document.getElementById("new_password").value; // Get the password from the form
    const repassword = document.getElementById("repassword").value;

    // Make a URL-encoded string for passing POST data:
    const data = { 'username': username, 'password': password,"repassword":repassword };

    fetch("php/signup.php", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' }
    })
        .then(response => response.json())
        .then(data => signup(data))
        .catch(error => console.error('Error:', error))
}

// Bind the AJAX call to button click
document.getElementById("sign_up_submit").addEventListener("click", signupAjax, false);