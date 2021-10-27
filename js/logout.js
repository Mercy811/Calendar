// reference: https://www.javascripttutorial.net/dom/manipulating/remove-all-child-nodes/
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}


document.getElementById("logout-btn").addEventListener("click", function (event) {


    let events = document.getElementsByClassName("event-btn");
    if(events!=null){
        while(events.length>0){
            events[0].parentNode.removeChild(events[0]);
        }
    }

    let tags = document.getElementsByClassName("tags");
    if(tags!=null){
        while(tags.length>0){
            tags[0].parentNode.removeChild(tags[0]);
        }
    }

    let brs = document.getElementsByTagName('br');
    if(brs!=null){
        while (brs.length>1) {
            brs[0].parentNode.removeChild(brs[0]);
        }  
    }

    // let eventDialogs = document.getElementsByClassName("event-dialog");
    // if(eventDialogs!=null){
    //     while(eventDialogs.length>0){
    //         // removeAllChildNodes(eventDialogs[0]);
    //         while(eventDialogs[0].firstChild){
    //             eventDialogs[0].removeChild(eventDialogs[0].firstChild);
    //         }
    //     }
    // }


    
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.getElementById("login-container").style.display = "block";
    document.getElementById("calendar-container").style.display = "none";
    document.getElementById("tags-container").style.display = "none";
    document.getElementById("new-event-container").style.display = "none";
    document.getElementById("user-info-container").style.display = "none";
    document.getElementById("welcome-user").innerHTML = "";
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    
}, false);