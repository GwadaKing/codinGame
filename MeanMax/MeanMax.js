function calcDistance(x1, y1, x2, y2) {
    return Math.round(Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2)));
}

function findClosestWreck(wrecks) {
    for (var i=0, l=wrecks.length;i < l;i++) {
            distances.push(calcDistance(myReaper.x, myReaper.y, wrecks[i].x, wrecks[i].y));
        }
        closestWreckDist = Math.min(...distances);
        closestWreckInd = distances.indexOf(closestWreckDist);
        return wrecks[closestWreckInd].x+" "+wrecks[closestWreckInd].y;
}

function findFurthestWreck(wrecks) {
    for (var i=0, l=wrecks.length;i < l;i++) {
            distances.push(calcDistance(myReaper.x, myReaper.y, wrecks[i].x, wrecks[i].y));
        }
        furthestWreckDist = Math.max(...distances);
        furthestWreckInd = distances.indexOf(furthestWreckDist);
        return wrecks[furthestWreckInd].x+" "+wrecks[furthestWreckInd].y;
}

// game loop
while (true) {
    var myReaper = [];
    var enemyReaper1 = [];
    var enemyReaper2 = [];
    var wrecks = [];
    var distances = [];
    var destination = findClosestWreck(wrecks);
    var furthestWreck = findFurthestWreck(wrecks);
    
    var myScore = parseInt(readline());
    var enemyScore1 = parseInt(readline());
    var enemyScore2 = parseInt(readline());
    var myRage = parseInt(readline());
    var enemyRage1 = parseInt(readline());
    var enemyRage2 = parseInt(readline());
    var unitCount = parseInt(readline());
    for (var i = 0; i < unitCount; i++) {
        var inputs = readline().split(' ');
        var unitId = parseInt(inputs[0]);
        var unitType = parseInt(inputs[1]);
        var player = parseInt(inputs[2]);
        var mass = parseFloat(inputs[3]);
        var radius = parseInt(inputs[4]);
        var x = parseInt(inputs[5]);
        var y = parseInt(inputs[6]);
        var vx = parseInt(inputs[7]);
        var vy = parseInt(inputs[8]);
        var extra = parseInt(inputs[9]);
        var extra2 = parseInt(inputs[10]);
        // Get my reaper's data
        myReaper={"x":x, "y":y, "mass":mass, "vx":vx, "vy":vy, "radius":radius};
        // Get enemy reapers data
        enemyReaper1={"x":x, "y":y, "mass":mass, "vx":vx, "vy":vy, "radius":radius};
        enemyReaper2={"x":x, "y":y, "mass":mass, "vx":vx, "vy":vy, "radius":radius};
        // Get wrecks data
        if (unitType === 4) {
            wrecks.push({"x":x, "y":y, "waterStock":extra});
        }
    }
    // DEBUGGING BOX
    /*printErr("DEBUGGING BOX\nunitId : "+unitId+"\nunitType : "+unitType+"\nx&y : "+x+" "+y+"\nextra : "+extra+"\nmasse : "+mass);
    if (wrecks.length>0) {
    printErr("DISTANCE DE L'EPAVE CIBLE : "+calcDistance(myReaper[0].x, myReaper[0].y, wrecks[0].x, wrecks[0].y));
    }*/ 
    
    print(destination+" "+300);
    print('WAIT');
    print('WAIT');
    myReaper.length = 0;
    enemyReaper1.length = 0;
    enemyReaper2.length = 0;
    wrecks.length =0;
    distances.length = 0;
}