function signup(data){
    document.getElementById("signup-msg").innerHTML = data.msg; 
    if (data.success) {
        alert("Successfully sign up!");
        clearSignup();
        displayLogin ();
        
        
    }
  
}
function displayLogin () {
    document.getElementById("signup-container").style.display = "none";
    document.getElementById("calendar-container").style.display = "none";
    document.getElementById("login-container").style.display = "block";

}

function clearSignup () {
    document.getElementById("new_username").value = "";
    document.getElementById("new_password").value = "";
    document.getElementById("repassword").value = "";

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
    
        clearSignup();

        
}

// Bind the AJAX call to button click
document.getElementById("sign_up_submit").addEventListener("click", signupAjax, false);
document.getElementById("reset_signup").addEventListener("click",clearSignup,false);
document.getElementById("back_login").addEventListener("click",displayLogin,false);
