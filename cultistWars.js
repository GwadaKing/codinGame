/**
 * Convert neutral units and attack enemy ones
 **/
let grid     = [];
const myId   = parseInt(readline()); // 0 - you are the first player, 1 - you are the second player
var inputs   = readline().split(' ');
const width  = parseInt(inputs[0]); // Width of the board
const height = parseInt(inputs[1]); // Height of the board
for (let i = 0; i < height; i++) {
    const y = readline().split(); // A y of the board: "." is empty, "x" is obstacle
    grid[i] = y;
}

// game loop
while (true) {
    let myBoss       = {};
    let enemyBoss    = {};
    let myUnits      = [];
    let oppUnits     = [];
    let neutralUnits = [];
    let peons        = [];
    let enemyPriests = [];
    const numOfUnits = parseInt(readline()); // The total number of units on the board
    for (let i = 0; i < numOfUnits; i++) {
        var inputs = readline().split(' ');
        const unitId   = parseInt(inputs[0]); // The unit's ID
        const unitType = parseInt(inputs[1]); // The unit's type: 0 = Cultist, 1 = Cult Leader
        const hp       = parseInt(inputs[2]); // Health points of the unit
        const x        = parseInt(inputs[3]); // X coordinate of the unit
        const y        = parseInt(inputs[4]); // Y coordinate of the unit
        const owner = parseInt(inputs[5]); // id of owner player
        // RETRIEVING DATAS
        // Retrieving raw datas
        if (owner == 2) {
            neutralUnits.push({"id":unitId, "hp":hp, "x":x, "y":y});
        }
        else if (owner == myId) {
            if (unitType === 0) {
                myUnits.push({"id":unitId, "hp":hp, "x":x, "y":y});
            }
            else {
                myBoss = {"hp":hp, "x":x, "y":y};
            }
        }
        else {
            if (unitType === 0) {
                oppUnits.push({"id":unitId, "hp":hp, "x":x, "y":y});
            }
            else {
                enemyBoss = {"hp":hp, "x":x, "y":y};
            }
        }
    }
    // Stocking finally foreign entities(neutral cultist I call peons and enemy cultists I call enemy priests) with distances between each one and my Boss
    // Peons
    for (let i = 0, l = peons.length; i < l; i++) {
        peons[i] = {"id":neutralUnits[i].id, "hp":neutralUnits[i].hp, "x":neutralUnits[i].x, "y":neutralUnits[i].y, "distance":calcDistance(myBoss.x, myBoss.y, neutralUnits[i].x, neutralUnits[x].y)};
    }
    // Enemy priests
    for (let i = 0, l = oppUnits.length; i < l; i++) {
        enemyPriests[i] = {"id":oppUnits[i].id, "hp":oppUnits[i].hp, "x":oppUnits[i].x, "y":oppUnits[i].y, "distance":calcDistance(myBoss.x, myBoss.y, oppUnits[i].x, oppUnits[x].y)};
    }
    // Enemy Boss
    let distBetweenBosses = calcDistance(myBoss.x, myBoss.y, enemyBoss.x, enemyBoss.y);
    
    peons.apply(function(o) { return Math.max(o.distance)});
    
    // WAIT | unitId MOVE x y | unitId SHOOT target| unitId CONVERT target
    console.log(instructions);
}
/**
 * Afficher la grille du jeu
 * */
function displayMap(grid) {
    for (let y = 0, l = grid.length; y < l; y++) {
        for (let x = 0, m = grid[y].length; x < m; x++) {
                
        }
    }
}

/**
 * Renvoie la distance de Manhattan entre 2 entités
 * */
function calcDistance(x, y, x2, y2) {
    return Math.round( (x2 - x) + (y2 - y) );
}
         
