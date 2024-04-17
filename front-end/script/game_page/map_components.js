const m = {
    Wall : "Wall",
    Hall : "Hall",
    Room : "Room",
    Loot : "Loot",
    Fire : "Fire",
    Enem : "Enem",
    Spawn : "Spawn"
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
var generatedMap = [
    [m.Spawn,m.Wall,m.Wall,m.Wall,m.Wall,m.Wall,m.Wall,m.Wall,m.Wall,m.Wall],
    [m.Hall,m.Wall,m.Wall,m.Loot,m.Room,m.Room,m.Room,m.Room,m.Room,m.Wall],
    [m.Hall,m.Wall,m.Wall,m.Enem,m.Wall,m.Room,m.Room,m.Wall,m.Loot,m.Wall],
    [m.Hall,m.Wall,m.Wall,m.Room,m.Room,m.Room,m.Room,m.Enem,m.Room,m.Wall],
    [m.Hall,m.Hall,m.Hall,m.Room,m.Wall,m.Room,m.Room,m.Wall,m.Room,m.Wall],
    [m.Hall,m.Wall,m.Wall,m.Fire,m.Room,m.Room,m.Room,m.Room,m.Loot,m.Wall],
    [m.Hall,m.Wall,m.Wall,m.Wall,m.Wall,m.Wall,m.Wall,m.Wall,m.Wall,m.Wall],
    [m.Hall,m.Wall,m.Wall,m.Enem,m.Room,m.Room,m.Room,m.Room,m.Loot,m.Wall],
    [m.Hall,m.Wall,m.Wall,m.Room,m.Room,m.Room,m.Enem,m.Room,m.Room,m.Wall],
    [m.Hall,m.Hall,m.Hall,m.Hall,m.Wall,m.Wall,m.Wall,m.Wall,m.Wall,m.Wall],
];