const m = {
    Wall: 0,
    Hall: 1,
    Room: 2,
    Loot: 3,
    Fire: 4,
    Enem: 5,
    Spawn: 6
};

//add encounter and heal
/* Map
    id 
    nRooms and nHalls can be calculated
    entrance - position of entrance
    difficulty - i don't remember if it's affected
 */
/* Room
    id
    size 3-
    doors 1-4 position of doors (contains door of instance and neighbour)
    nEnemy - random positions, not on doors.
    nTreasure - random pos, not on walls
    bonfire at center of the room
 */

/*
    E----R----R
    |    |    |
    R----R----R
    |    |    |
    R----R----R
*/
/*
var generatedMap = [
    [m.Spawn, m.Wall, m.Wall, m.Wall, m.Wall, m.Wall, m.Wall, m.Wall, m.Wall, m.Wall],
    [m.Hall, m.Wall, m.Wall, m.Loot, m.Room, m.Room, m.Room, m.Room, m.Room, m.Wall],
    [m.Hall, m.Wall, m.Wall, m.Enem, m.Wall, m.Room, m.Room, m.Wall, m.Loot, m.Wall],
    [m.Hall, m.Wall, m.Wall, m.Room, m.Room, m.Room, m.Room, m.Enem, m.Room, m.Wall],
    [m.Hall, m.Hall, m.Hall, m.Room, m.Wall, m.Room, m.Room, m.Wall, m.Room, m.Wall],
    [m.Hall, m.Wall, m.Wall, m.Fire, m.Room, m.Room, m.Room, m.Room, m.Loot, m.Wall],
    [m.Hall, m.Wall, m.Wall, m.Wall, m.Wall, m.Wall, m.Wall, m.Wall, m.Wall, m.Wall],
    [m.Hall, m.Wall, m.Wall, m.Enem, m.Room, m.Room, m.Room, m.Room, m.Loot, m.Wall],
    [m.Hall, m.Wall, m.Wall, m.Room, m.Room, m.Room, m.Enem, m.Room, m.Room, m.Wall],
    [m.Hall, m.Hall, m.Hall, m.Hall, m.Wall, m.Wall, m.Wall, m.Wall, m.Wall, m.Wall],
];
*/
var generatedMap = [];
var mapDifficulty = localStorage.getItem('diff');
var locationAll = JSON.parse(localStorage.getItem('locationAll'));
var locOffset = locationAll.indexOf(loc);
var diffOffset = mapDifficulty < 1.0 ? 1 : mapDifficulty == 1.0 ? 2 : 3;
var mapId = locOffset * 3 + diffOffset;
socket.emit('requestMap', mapId);

socket.on('receiveMap', (data) => {
    var keys = Object.keys(data[0]);
    
    for (let i = 0; i < keys.length; i++) {
        var row = [];
        for (let j = 0; j < keys.length; j++) {
            row[j] = data[i][keys[j]];
        }
        generatedMap[i] = row;
    }
    socket.emit('gameCanStart');
});

//var map = localStorage.getItem('map');

console.log(map);