function refundAccept(id) {
    socket.emit('refundRequest', id);
    document.getElementById(id).remove();
}

function refundRefuse(id) {
    socket.emit('refundRequestDeny', id);
    document.getElementById(id).remove();
}

socket.on("refundMessage", (hasRefunded) => {
    console.log(hasRefunded);
    if (hasRefunded) {
        alertMessage("Character has been refunded");
    } else {
        alertMessage("Request denied");
    }
    var requestNumber = document.getElementById("request-table").rows.length;
    console.log(requestNumber);
    if (requestNumber == 0) {
        updateTableEmpty();
    }
});

function updateTableEmpty() {
    table.innerHTML = "No request pending";
}