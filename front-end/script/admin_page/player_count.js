var socket = io();

socket.emit('adminConnection');

socket.on('playerCount', (count) => {
    getDiv('player-active-value').innerHTML = count;    
});

function pageChange(link) {
    socket.emit('pageLeave');
    window.location.href = link;
}