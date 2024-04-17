function getDiv(id) {
    return document.getElementById(id);
}

socket.emit('requestReport');

socket.on('receiveReport', (query) => {
    let list = getDiv("request-list");
    console.log(list);
    query.forEach(function (record) {
        
        let desc = "";
        var request = document.createElement("div");
        request.classList.add("request");
        switch(record.state) {
            case "Solved":
                request.classList.add("solved");
                desc = "Your request has been solved.";
                break;
            case "Pending":
                request.classList.add("pending");
                desc = "Your request is now pending.";
                break;
            case "Denied":
                request.classList.add("denied");
                desc = "Your request was denied."
                break;
            default:
                break;
        }
        
        var requestId = document.createElement("div");
        requestId.classList = "request-id";
        requestId.innerText = record.id;

        var requestHero = document.createElement("div");
        requestHero.classList = "request-hero";
        requestHero.innerText = record.hero;

        var requestState = document.createElement("div");
        requestState.classList = "request-state";
        requestState.innerText = record.state;

        var requestDesc = document.createElement("div");
        requestDesc.classList = "request-state-desc";
        requestDesc.innerText = desc;
        
        request.appendChild(requestId);
        request.appendChild(requestHero);
        request.appendChild(requestState);
        request.appendChild(requestDesc);
        list.appendChild(request);
        console.log(record.id, record.hero, record.state);
    })  
});

socket.on('deleteSolvedResponse', () => {
    setTimeout(function(){
        pageChange("./report_center_see.html");
    },500);
});