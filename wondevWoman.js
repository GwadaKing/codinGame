/**
 * 
 * MAIN
 * 
 **/
 
let tour             = 1;
let targetCellHeight = "";
let grid             = [];
let myUnits          = [];
let oppUnits         = [];
let possibleActions  = [];
let moveOrder        = "";
let buildOrder       = "";
const size           = parseInt(readline());
const unitsPerPlayer = parseInt(readline());

// game loop
while (true) {
    for (let i = 0; i < size; i++) {
        const row = readline();
        grid[i]   = row.replace(/\./g,"9");
        printErr(grid[i]);
    }
    for (let i = 0; i < unitsPerPlayer; i++) {
        var inputs  = readline().split(' ');
        const unitX = parseInt(inputs[0]);
        const unitY = parseInt(inputs[1]);
        myUnits[i]  = {"x":unitX, "y":unitY};
    }
    for (let i = 0; i < unitsPerPlayer; i++) {
        var inputs = readline().split(' ');
        const otherX = parseInt(inputs[0]);
        const otherY = parseInt(inputs[1]);
        oppUnits[i]  = {"x":otherX, "y":otherY}; // -1 -1 si elles sont hors champ de vision
    }
    const legalActions = parseInt(readline());
    for (let i = 0; i < legalActions; i++) {
        var inputs      = readline().split(' ');
        const atype        = inputs[0];
        const index        = parseInt(inputs[1]);
        const dir1         = inputs[2];
        const dir2         = inputs[3];
        possibleActions[i] = {"order":atype, "id":index, "moveDirection":dir1, "buildDirection":dir2 };
    }
    
    buildOrder = findBestBuild(possibleActions, grid, myUnits[0].x, myUnits[0].y);
    moveOrder  = findBestMove(possibleActions, grid, myUnits[0].x, myUnits[0].y);
    console.log("MOVE&BUILD 0 "+moveOrder+" "+buildOrder);
    myUnits          = [];
    oppUnits         = [];
    possibleActions  = [];
    tour++;
}

/**
 *
 * FIND BEST MOVE
 *
 */
function findBestMove(validActions, grid, x, y) { 
    let bestMoveVal       = 0;
    let bestMove          = "";
    let currentCellHeight = parseInt(grid[y][x]);
    // Traverse all playable cells for best move
    for (let i = 0, n = validActions.length; i < n; i++) {
        currentCellHeight = parseInt(grid[y][x]);
        if (validActions[i].moveDirection === "N") {
            let moveVal = evaluateMove(grid, x, y-1, currentCellHeight);
            //printErr("ENTREE FINDBESTMOVE(N)|||MOVEVAL->"+moveVal);
            if (moveVal > bestMoveVal) {
                bestMove    = "N";
                bestMoveVal = moveVal;
            }
        }
        else if (validActions[i].moveDirection === "NE") {
            let moveVal = evaluateMove(grid, x+1, y-1, currentCellHeight);
            //printErr("ENTREE FINDBESTMOVE(NE)|||MOVEVAL->"+moveVal);
            if (moveVal > bestMoveVal) {
                bestMove    = "NE";
                bestMoveVal = moveVal;
            }
        }
        else if (validActions[i].moveDirection === "E") {
            let moveVal = evaluateMove(grid, x+1, y, currentCellHeight);
            //printErr("ENTREE FINDBESTMOVE(E)|||MOVEVAL->"+moveVal);
            if (moveVal > bestMoveVal) {
                bestMove    = "E";
                bestMoveVal = moveVal;
            }
        }
        else if (validActions[i].moveDirection === "SE") {
            let moveVal = evaluateMove(grid, x+1, y+1, currentCellHeight);
            //printErr("ENTREE FINDBESTMOVE(SE)|||MOVEVAL->"+moveVal);
            if (moveVal > bestMoveVal) {
                bestMove    = "SE";
                bestMoveVal = moveVal;
            }
        }
        else if (validActions[i].moveDirection === "S") {
            let moveVal = evaluateMove(grid, x, y+1, currentCellHeight);
            //printErr("ENTREE FINDBESTMOVE(S)|||MOVEVAL->"+moveVal);
            if (moveVal > bestMoveVal) {
                bestMove    = "S";
                bestMoveVal = moveVal;
            }
        }
        else if (validActions[i].moveDirection === "SW") {
            let moveVal = evaluateMove(grid, x-1, y+1, currentCellHeight);
            //printErr("ENTREE FINDBESTMOVE(SW)|||MOVEVAL->"+moveVal);
            if (moveVal > bestMoveVal) {
                bestMove    = "SW";
                bestMoveVal = moveVal;
            }
        }
        else if (validActions[i].moveDirection === "W") {
            let moveVal = evaluateMove(grid, x-1, y, currentCellHeight);
            //printErr("ENTREE FINDBESTMOVE(W)|||MOVEVAL->"+moveVal);
            if (moveVal > bestMoveVal) {
                bestMove    = "W";
                bestMoveVal = moveVal;
            }
        }
        else if (validActions[i].moveDirection === "NW") {
            let moveVal = evaluateMove(grid, x-1, y-1, currentCellHeight);
            //printErr("ENTREE FINDBESTMOVE(NW)|||MOVEVAL->"+moveVal);
            if (moveVal > bestMoveVal) {
                bestMove    = "NW";
                bestMoveVal = moveVal;
            }
        }
    }
    return bestMove;
}

/**
 *
 * FIND BEST BUILD
 *
 */
function findBestBuild(validActions, grid, x, y) {
    let bestBuildVal      = 0;
    let bestBuild         = "";
    let currentCellHeight = parseInt(grid[y][x]);
    // traverse all build possibilities for best build
    for (let i = 0, l = validActions.length; i < l; i++) {
        if (validActions[i].buildDirection === "N") {
            let buildVal = evaluateBuild(grid, x, y-1, currentCellHeight);
            if (buildVal > bestBuildVal) {
                bestBuild    = "N";
                bestBuildVal = buildVal;
            }
        }
        else if (validActions[i].buildDirection === "NE") {
            let buildVal = evaluateBuild(grid, x+1, y-1, currentCellHeight);
            if (buildVal > bestBuildVal) {
                bestBuild    = "NE";
                bestBuildVal = buildVal;
            }
        }
        else if (validActions[i].buildDirection === "E") {
            let buildVal = evaluateBuild(grid, x+1, y, currentCellHeight);
            if (buildVal > bestBuildVal) {
                bestBuild    = "E";
                bestBuildVal = buildVal;
            }
        }
        else if (validActions[i].buildDirection === "SE") {
            let buildVal = evaluateBuild(grid, x+1, y+1, currentCellHeight);
            if (buildVal > bestBuildVal) {
                bestBuild    = "SE";
                bestBuildVal = buildVal;
            }
        }
        else if (validActions[i].buildDirection === "S") {
            let buildVal = evaluateBuild(grid, x, y+1, currentCellHeight);
            if (buildVal > bestBuildVal) {
                bestBuild    = "S";
                bestBuildVal = buildVal;
            }
        }
        else if (validActions[i].buildDirection === "SW") {
            let buildVal = evaluateBuild(grid, x-1, y-1, currentCellHeight);
            if (buildVal > bestBuildVal) {
                bestBuild    = "SW";
                bestBuildVal = buildVal;
            }
        }
        else if (validActions[i].buildDirection === "W") {
            let buildVal = evaluateBuild(grid, x-1, y, currentCellHeight);
            if (buildVal > bestBuildVal) {
                bestBuild    = "W";
                bestBuildVal = buildVal;
            }
        }
        else if (validActions[i].buildDirection === "NW") {
            let buildVal = evaluateBuild(grid, x-1, y-1, currentCellHeight);
            if (buildVal > bestBuildVal) {
                bestBuild    = "NW";
                bestBuildVal = buildVal;
            }
        }
    }
    return bestBuild;
}

/**
 *
 * EVALUATE BUILD
 *
 */ 
function evaluateBuild(grid, x, y, currentCellH) {
    let currentCellHeight = parseInt(currentCellH);
    // if target is just one level higher than current cell
    
    if (currentCellHeight === 0) {
        return 100;
    } 
    else if (currentCellHeight === 1) {
        return 200;
    }
    else if (currentCellHeight === 2) {
        return 300;
    } 
    else if (currentCellHeight >= 3) {
        return 0;
    } 
    
    // if target is just one level lower than current cell
    if (currentCellHeight === 2 ) {
        return 30;
    }
    else if (currentCellHeight === 1) {
        return 20;
    }
}

/**
 *
 * EVALUATE MOVE
 *
 */ 
function evaluateMove(grid, x, y, currentCellH) {
    let targetCellHeight  = parseInt(grid[y][x]);
    let currentCellHeight = parseInt(currentCellH);
    // if target is same level(height) than current cell
    if (targetCellHeight === currentCellHeight) {
        if (targetCellHeight === 2) {
            return 60;
        }
        else if (targetCellHeight === 1) {
            return 50;
        }
        if (targetCellHeight === 0) {
            return 40;
        }
    }
    // if target is just one level higher than current cell
    if (targetCellHeight === currentCellHeight + 1) {
        if (currentCellHeight === 0 && targetCellHeight === 1) {
            return 100;
        } 
        else if (currentCellHeight === 1 && targetCellHeight === 2) {
            return 200;
        }
        else if (currentCellHeight === 2 && targetCellHeight === 3) {
            return 300;
        } 
    }
    // if target is just one level lower than current cell
    else if (targetCellHeight === currentCellHeight - 1) {
        if (currentCellHeight === 2 && targetCellHeight === 1) {
            return 30;
        }
        else if (currentCellHeight === 1 && targetCellHeight === 0) {
            return 20;
        }
    }
    
}

/**
 *
 * ISMOVESLEFT
 * Check if game is really over
 *
 */  
function isMovesLeft(actions) {
    if (actions.length > 0) {
        return true;
    }
    else return false;
}

/**
 *
 * EVALUATE VICTORY
 * Returns a value based on who is winning 
 *
 */  
function evaluateVictory(grid) {
    for (let y = 0, l = grid.length; y < l; y++) {
        for (let x = 0, m = grid[y].length; x < m; x++) {
            // Checking for myPlayer victory
            if (grid[y][x] === 3 && (myUnits[0].x === x && myUnits[0].y === y)) {
                return +1000;
            }
            // Checking for opponent victory
            if (grid[y][x] === 3 && (oppUnits[0].x === x && oppUnits[0].y === y)) {
                return -1000;
            }
        }
    }
    // Nobody wins yet
    return 0;
}


