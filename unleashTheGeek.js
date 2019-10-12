/**
 * Deliver more ore to hq (left side of the map) than your opponent. Use radars to find ore but beware of traps!
 * 
 * 
 * STRATEGIE : on répartit les rôles par robot : - N°1 : Récupère puis place des radars à des endroits stratégiques prédéfinis
 *                                               - N°2 : Récupère puis place des p
 * 
 * 
 * 
 **/


function calcDistance(x, x2, y, y2, grid) {
    return Math.round(Math.sqrt(Math.pow(x2-x,2)+Math.pow(y2-y,2)));
}

let grid          = [];
let digSpots      = ["03 03", "03 07", "03 11", "07 03", "07 07", "07 11", "11 03",
                     "11 07", "11 11", "15 03", "15 07", "15 11", "19 03", "19 07",
                     "19 11", "23 03", "23 07", "23 11", "27 11", "27 03", "27 07"];
let trapSpots     = ["24 00", "24 01", "24 02", "24 03", "24 04", "24 05", "24 06", 
                     "24 07", "24 08", "24 09", "24 10", "24 11", "24 12", "24 13",
                     "25 00", "25 01", "25 02", "25 03", "25 04", "25 05", "25 06", 
                     "25 07", "25 08", "25 09", "25 10", "25 11", "25 12", "25 13"];
let digIndex      = 0;
let trapIndex     = 0;
var inputs        = readline().split(' ');
const width       = parseInt(inputs[0]);
const height      = parseInt(inputs[1]); // size of the map
//printErr("TESTSUBSTR:"+typeof digSpots[0].substring(4,6)+"|"+typeof parseInt(digSpots[0].substring(7,9)));

// game loop
while (true) {
    let myRobots  = [];
    let oppRobots = [];
    let radars    = [];
    let traps     = [];
    var inputs = readline().split(' ');
    const myScore = parseInt(inputs[0]); // Amount of ore delivered
    const opponentScore = parseInt(inputs[1]);
    for (let i = 0; i < height; i++) {
        grid[i] = [];
        var inputs = readline().split(' ');
        for (let j = 0; j < width; j++) {
            const ore = inputs[2*j];// amount of ore or "?" if unknown
            const hole = parseInt(inputs[2*j+1]);// 1 if cell has a hole
            grid[i][j] = ore;
        }
        printErr(grid[i]+"\n");
    }
    var inputs = readline().split(' ');
    const entityCount = parseInt(inputs[0]); // number of entities visible to you
    const radarCooldown = parseInt(inputs[1]); // turns left until a new radar can be requested
    const trapCooldown = parseInt(inputs[2]); // turns left until a new trap can be requested
    for (let i = 0; i < entityCount; i++) {
        var inputs = readline().split(' ');
        const id = parseInt(inputs[0]); // unique id of the entity
        const type = parseInt(inputs[1]); // 0 for your robot, 1 for other robot, 2 for radar, 3 for trap
        const x = parseInt(inputs[2]);
        const y = parseInt(inputs[3]); // position of the entity
        const item = parseInt(inputs[4]); // if this entity is a robot, the item it is carrying (-1 for NONE, 2 for RADAR, 3 for TRAP, 4 for ORE)
        switch (type) {
            case 0 : myRobots.push({"x":x, "y":y, "id":id, "item":item});break;
            case 1 : oppRobots.push({"x":x, "y":y, "id":id, "item":item});break;
            case 2 : radars.push({"x":x, "y":y, "id":id});break;
            case 3 : traps.push({"x":x, "y":y, "id":id});break;
        }
    }
    for (let i = 0; i < 5; i++) {
        // ROBOT 1 : RADAR OFFICER
        if (i === 0) {
            if (radarCooldown === 0 && myRobots[i].item == -1) {
                if (myRobots[i].x === 0) {
                    instructions = "REQUEST RADAR";
                }
                else if (myRobots[i].x > 0) {
                    instructions = "MOVE 0 "+myRobots[i].y;
                }
            }
            else if (radarCooldown > 0 && myRobots[i].item == -1 && myRobots[i].x === 0) {
                instructions = "WAIT";
            }
            // radar spots are hardcoded as grid size doesn't change it's more efficient to optimize radar matrix
            else if (myRobots[i].item == 2) {
                let digSpotX = parseInt(digSpots[digIndex].substring(0,2));
                let digSpotY = parseInt(digSpots[digIndex].substring(3,5));
                instructions = "MOVE "+digSpotX+" "+digSpotY;
                if (myRobots[i].x == digSpotX && myRobots[i].y == digSpotY) {
                    instructions = "DIG "+digSpotX+" "+digSpotY;
                    digIndex++; if (digIndex == 21) { digIndex = 0 }
                }
            }
            console.log(instructions);
        }
        
        // ROBOT 3,4 & 5 : HARVESTERS
        else if (i > 0) {
            // Retrieving closest harvest site for each robot...
            let closestOreDistance = 1000000;
            let oreSpotX           = 0;
            let oreSpotY           = 0;
            for (y = 0; y < height; y++) {
                for (x = 0; x < width; x++) {
                    if (grid[y][x] > 0 && grid[y][x] < 4) {
                        let oreDistance = calcDistance(myRobots[i].x, x, myRobots[i].y, y, grid);
                        if (oreDistance < closestOreDistance) {
                            printErr("OREDISTANCE->"+oreDistance);
                            closestOreDIstance = oreDistance;
                            oreSpotX           = x;
                            oreSpotY           = y;
                            printErr("CLOSEST X|Y->"+oreSpotX+"|"+oreSpotY);
                        }
                    }
                }
            }
            if (myRobots[i].x === 0 && trapCooldown === 0 && myRobots[i].item == -1) {
                instructions = "REQUEST TRAP";
            }
            // Wait if there is no ore scanned yet
            if (oreSpotX === 0 && oreSpotY ===0) {
                instructions = "WAIT";
            }
            else if (oreSpotX !== 0 && oreSpotY !==0) {
                // then sending robot to harvest...
                if (myRobots[i].item == -1 && (myRobots[i].x != oreSpotX || myRobots[i].y != oreSpotY)) {
                    instructions = "MOVE "+oreSpotX+" "+oreSpotY;
                }
                else if (myRobots[i].x == oreSpotX && myRobots[i].y == oreSpotY) {
                    if (myRobots[i].item == -1 || myRobots[i].item == 3) {
                        instructions = "DIG "+oreSpotX+" "+oreSpotY;
                    }
                    
                }
                // ... once harvested, getting back to base to deliver the ore
                else if (myRobots[i].item == 4) {
                    instructions = "MOVE 0"+" "+myRobots[i].y;
                }
            }
            console.log(instructions);
        }
    }
}