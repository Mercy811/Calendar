"use strict";

function guestLogin() {
  document.getElementById("login-container").style.display = "none";
  document.getElementById("signup-container").style.display = "none";
  document.getElementById("user-info-container").style.display = "block";
  document.getElementById("tags-container").style.display = "none";
  document.getElementById("new-event-container").style.display = "none";
  document.getElementById("calendar-container").style.display = "block";
  var events = document.getElementsByClassName("event-btn");

  while (events.length > 0) {
    events[0].parentNode.removeChild(events[0]);
  }

  setCookie("username", "Guest");
}

function loginJudge(data) {
  if (data.success) {
    document.getElementById("login-container").style.display = "none";
    document.getElementById("calendar-container").style.display = "block";
    document.getElementById("welcome-user").innerHTML = "Welcome, " + data.username;
    setCookie("username", data.username, 1);
    setCookie("token", data.token, 1);
    document.getElementById("login-msg").innerHTML = "";

    if (getCookie("username") != "Guest") {
      // loadEventAjax();
      loadPage();
    }
  } else {
    document.getElementById("login-msg").innerHTML = data.msg;
  }
}

function loginAjax(event) {
  var username = document.getElementById("username").value; // Get the username from the form

  var password = document.getElementById("password").value; // Get the password from the form
  // Make a URL-encoded string for passing POST data:

  var data = {
    'username': username,
    'password': password
  };
  fetch("php/login.php", {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json'
    }
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    return loginJudge(data);
  })["catch"](function (error) {
    return console.error('Error:', error);
  });
}

function clearInput() {
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
} // Bind the AJAX call to button click


document.getElementById("login-btn").addEventListener("click", loginAjax, false); // document.getElementById("reset_login").addEventListener("click", function(){clearInput();}, false);

document.getElementById("login_as_guest").addEventListener("click", guestLogin, false);