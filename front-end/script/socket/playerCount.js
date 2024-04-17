// Establish a connection to the server
var socket = io();

// Listen for the 'playerCount' event from the server
socket.on('playerCount', function(count) {
    console.log('Player count:', count);
    // You can update your UI or perform any action based on the player count here
});

function pageChange(link) {
    socket.emit('pageLeave');
    window.location.href = link;
}