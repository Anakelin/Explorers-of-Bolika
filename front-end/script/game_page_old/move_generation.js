function buildMove(row,col) {
    let range = move;
    exploreGrid(row,col, range);
    getDiv(row+"-"+col).classList.remove(moveClass);  
}

function exploreGrid(row, col, range) {
    if (range === 0) {
        return;
    }

    // Explore in all directions
    const directions = [
        { row: -1, col: 0 },   // Up
        { row: 1, col: 0 },   // Down
        { row: 0, col: -1 },   // Left
        { row: 0, col: 1 },   // Right
    ];

    for (const dir of directions) {
        let isBlocked = false;
        const newRow = row + dir.row;
        const newCol = col + dir.col;
            if(newRow >= 0 && newRow < size && newCol >= 0 && newCol < size) {
                if (!getDiv(newRow+"-"+newCol).classList.contains(wallClass)) {
                    isBlocked = isClassPresent(newRow+"-"+newCol,enemClass);
                    
                    getDiv(newRow+"-"+newCol).classList.add(moveClass);  
                    const newRange = range - 1;
                    
                    if(!isBlocked) {
                        exploreGrid(newRow, newCol, newRange);
                    }
            } 
        }
    }
}