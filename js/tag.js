function loadTag(data){
    let tagContainer = document.getElementById("tags-container");
    for(i in data){
        let tagLabel = document.createElement("label");
        tagLabel.innerHTML = data[i].tag;

        let tagCheckbox = document.createElement("input");
        tagCheckbox.setAttribute("type","checkbox");
        tagCheckbox.id = "tag-checkbox-"+data[i].tag;

        tagContainer.appendChild(tagCheckbox);
        tagContainer.appendChild(tagLabel);
        
    }
}
function loadTagAjax(user_id){
    const data = {'user_id':user_id,'token':getCookie('token')};
    
    fetch("php/loadTag.php",{
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'content-type': 'application/json'}
    })
    .then(response => response.json())
    .then(data => loadTag(data))
    .catch(error => console.error('Error:', error))
}