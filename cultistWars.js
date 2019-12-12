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
    let lockingEnemyPriest  = "no";
    let myBoss              = {};
    let enemyBoss           = {};
    let myUnits             = [];
    let oppUnits            = [];
    let neutralUnits        = [];
    let peons               = [];
    let enemyPriests        = [];
    let peon2Convert        = 777;
    let enemy2Shoot         = 777;
    let instructions        = "WAIT";
    let convertInstructions = "no";
    let defenseInstructions = "no";
    const numOfUnits        = parseInt(readline()); // The total number of units on the board
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
        if (owner === 2) {
            neutralUnits.push({"id":unitId, "hp":hp, "x":x, "y":y});
        }
        else if (owner === myId) {
            if (unitType === 0) {
                myUnits.push({"id":unitId, "hp":hp, "x":x, "y":y});
            }
            else if (unitType === 1)  {
                myBoss = {"hp":hp, "x":x, "y":y};
            }
        }
        else if (owner !== 2 && owner !== myId) {
            if (unitType === 0) {
                oppUnits.push({"id":unitId, "hp":hp, "x":x, "y":y});
            }
            else if (unitType === 1) {
                enemyBoss = {"hp":hp, "x":x, "y":y};
            }
        }
    }
    // Stocking finally foreign entities(neutral cultist I call peons and enemy cultists I call enemy priests) with distances between each one and my Boss
    // Peons
    let distMin       = 777;
    let closestPeonId = 777;
    for (let j = 0, l = neutralUnits.length; j < l; j++) {
        let dist2Peon = calcDistance(myBoss.x, myBoss.y, neutralUnits[j].x, neutralUnits[j].y);
        if (dist2Peon < distMin) {
            distMin       = dist2Peon;
            closestPeonId = neutralUnits[j].id;
        }
        peons[j] = {"id":neutralUnits[j].id, "hp":neutralUnits[j].hp, "x":neutralUnits[j].x, "y":neutralUnits[j].y, "distance":dist2Peon};
    }
    // Enemy priests
    for (let j = 0, l = oppUnits.length; j < l; j++) {
        let dist2Priest = calcDistance(myBoss.x, myBoss.y, oppUnits[j].x, oppUnits[j].y);
        enemyPriests[j] = {"id":oppUnits[j].id, "hp":oppUnits[j].hp, "x":oppUnits[j].x, "y":oppUnits[j].y, "distance":dist2Priest};
    }
    
    let distBetweenBosses   = calcDistance(myBoss.x, myBoss.y, enemyBoss.x, enemyBoss.y);
    let closestPeonDistance = Math.min.apply(Math, peons.map(function(o) { return o.distance}));
    let closestEnemyDistance = 777;
    
    // Checking if Bossman is threatened by an enemy priest (range <= 7)
    if (oppUnits.length > 0) {
        defenseInstructions = defendTheBoss(myUnits, enemyPriests);
        lockingEnemyPriest = shootEnemy(myUnits, oppUnits);
    }
    // Open fire if a priest is under range
    if (lockingEnemyPriest != "no priests around my units" && lockingEnemyPriest != "no") {
        instructions = lockingEnemyPriest;
    }
    
    // Defend the boss if a priest is threatening him
    if (defenseInstructions != "no priests around boss" && defenseInstructions != "no") {
        instructions = defendTheBoss(myUnits, enemyPriests);
    }
    // Every 2 turns, boss tries to convert a peon
    if (tour %2 === 0 && peons.length > 0) {
        // Convert a peon 
        instructions = convertPeons(myBoss, peons, myId);
    }
    
    console.log(instructions);
    tour++;
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

/**
 * shootEnemy
 * */
 function shootEnemy(myUnits, oppUnits) {
     let targetId              = 777;
     let sourceId              = 777;
     for (let i = 0, l = myUnits.length; i < l; i++) {
        let myPriestId            = myUnits[i].id;
        let closestPriestDistance = 8;
        for (let j = 0, l = oppUnits.length; j < l; j++) {
            let enemyPriestId       = oppUnits[j].id;
            let enemyPriestDistance = calcDistance(myUnits[i].x, myUnits[i].y, oppUnits[j].x, oppUnits[j].y);
            // Is enemy in the shoot range ?
            if (enemyPriestDistance < 8) {
               if (enemyPriestDistance < closestPriestDistance) {
                    closestPriestDistance = enemyPriestDistance;
                    targetId              = enemyPriestId;
                    sourceId              = myPriestId;
                } 
            }
        }
    }
    if (sourceId == 777) { return "no priests around my units" } else return sourceId+" SHOOT "+targetId;
 }
 
 /**
  * convertPeons
  * 1 check if there is a peon in adjacent tiles
  * 2 if none walks towards the closest peon
  * */
function convertPeons(myBoss, peons, myId, closestPeonId) {
    for (let j = 0, l = peons.length; j < l; j++) {
        if (peons[j].x == (myBoss.x)+1 && peons[j].y == myBoss.y || 
            peons[j].x == (myBoss.x)-1 && peons[j].y == myBoss.y ||
            peons[j].x == myBoss.x && peons[j].y == (myBoss.y)+1 ||
            peons[j].x == myBoss.x && peons[j].y == (myBoss.y)-1 ) {
            let peon2Convert = peons[j].id;
            instructions = myId+" CONVERT "+peon2Convert;
            return instructions;
        }
    }
    instructions = myId+" CONVERT "+closestPeonId;
    return instructions;
}

/**
 * Defend The Boss
 * */
function defendTheBoss(myUnits, enemyPriests) {
    let defenderId           = 777;
    let closestEnemyDistance = Math.min.apply(Math, enemyPriests.map(function(o) { return o.distance}));
    for (let j = 0, l = enemyPriests.length; j < l; j++) {
        if (enemyPriests[j].distance == closestEnemyDistance) {
            if (closestEnemyDistance <= 7) {
                // Bossman is threatened, priority is finding closest priest to defend
                enemy2Shoot     = enemyPriests[j].id;
                let minDistance = 777;
                for (let k = 0, o = myUnits.length; k < o; k++) {
                    let distance2Enemy = calcDistance(myUnits[k].x, myUnits[k].y, enemyPriests[j].x, enemyPriests[j].y);
                    if (distance2Enemy < minDistance) {
                        minDistance = distance2Enemy;
                        defenderId  = myUnits[k].id;
                    }
                }
            } 
        }
    }
    if (defenderId == 777) {
        return "no priests around boss";
    }
    else instructions = defenderId+" SHOOT "+enemy2Shoot;
    return instructions;
}
         
