function tagChecked(event){
    if(event.target.checked){
        events = document.getElementsByClassName("event-tag-"+event.target.id);
        for(let j=0; j<events.length; j+=1){
            events[j].style.display = "inline-block";
        }
    }else{
        events = document.getElementsByClassName("event-tag-"+event.target.id);
        for(let j=0; j<events.length; j+=1){
            events[j].style.display = "none";
        }
    }
}

document.getElementById("all").addEventListener("change",tagChecked,false);

function loadTag(data){
    if (data.msg){
        alert(data.msg);
        return
    }

    let tagContainer = document.getElementById("tags-container");
    for(i in data){
        if(i==0){
            continue;
        }
        let tagLabel = document.createElement("label");
        tagLabel.innerHTML = data[i].tag;

        let tagCheckbox = document.createElement("input");
        tagCheckbox.setAttribute("type","checkbox");
        tagCheckbox.id = data[i].tag;
        tagCheckbox.addEventListener("change",tagChecked,false);

        let newline = document.createElement("br");

        tagContainer.appendChild(tagCheckbox);
        tagContainer.appendChild(tagLabel);
        tagContainer.appendChild(newline);
        
    }
}
function loadTagAjax(){
    const data = {'token':getCookie('token')};
    
    fetch("php/loadTag.php",{
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'content-type': 'application/json'}
    })
    .then(response => response.json())
    .then(data => loadTag(data))
    .catch(error => console.error('Error:', error))
}