(function() {
    "use strict";
    // game loop
    function calcDistance(x1, y1, x2, y2) {
        return Math.round(Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2)));
    }
    
    function findClosestWreck(wrecks) {
        var distances = [];
        for (var i=0, l=wrecks.length;i < l;i++) {
                distances.push(calcDistance(myReaper.x, myReaper.y, wrecks[i].x, wrecks[i].y));
            }
            var closestWreckDist = Math.min(...distances);
            var closestWreckInd = distances.indexOf(closestWreckDist);
            return wrecks[closestWreckInd].x+" "+wrecks[closestWreckInd].y;
    }
    
    function findClosestTanker(tankers) {
        var distances = [];
        for (var i=0, l=tankers.length;i < l;i++) {
                distances.push(calcDistance(myReaper.x, myReaper.y, tankers[i].x, tankers[i].y));
        }
        var closestTankerDist = Math.min(...distances);
        var closestTankerInd = distances.indexOf(closestTankerDist);
        return tankers[closestTankerInd].x+" "+tankers[closestTankerInd].y;
    }
    
    function findFurthestWreck(wrecks) {
        var distances = [];
        for (var i=0, l=wrecks.length;i < l;i++) {
            distances.push(calcDistance(myReaper.x, myReaper.y, wrecks[i].x, wrecks[i].y));
        }
        furthestWreckDist = Math.max(...distances);
        furthestWreckInd = distances.indexOf(furthestWreckDist);
        return wrecks[furthestWreckInd].x+" "+wrecks[furthestWreckInd].y;
    }
    while (true) {
        var myReaper = {};
        var myDestroyer= {};
        var enemyDestroyer1= {};
        var enemyDestroyer2= {};
        var enemyReaper1 = {};
        var enemyReaper2 = {};
        var tankers = [];
        var destroyers = [];
        var wrecks = [];
        var destinations = [];
    
        var myScore = parseInt(readline());
        var enemyScore1 = parseInt(readline());
        var enemyScore2 = parseInt(readline());
        var myRage = parseInt(readline());
        var enemyRage1 = parseInt(readline());
        var enemyRage2 = parseInt(readline());
        var unitCount = parseInt(readline());
        for (var i = 0; i < unitCount; i++) {
            var inputs = readline().split(" ");
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
            var destination = "0 0";
            var furthestWreck = "0 0";
            // My player data
            if (player === 0) {
                switch (unitType) {
                // Get my reaper's data
                case 0:myReaper={"x":x, "y":y, "mass":mass, "vx":vx, "vy":vy, "radius":radius};
                break;
                // Get my destroyer's data
                case 1:myDestroyer={"x":x, "y":y, "mass":mass, "vx":vx, "vy":vy, "radius":radius};
                break;
                }
            }
            // enemy 1 data
            else if (player === 1) {
                switch (unitType) {
                // Get enemy reaper's data
                case 0:enemyReaper1={"x":x, "y":y, "mass":mass, "vx":vx, "vy":vy, "radius":radius};
                break;
                // Get enemy destroyer's data
                case 1:enemyDestroyer1={"x":x, "y":y, "mass":mass, "vx":vx, "vy":vy, "radius":radius};
                break;
                }
            }
            // enemy 2 data
            else if (player === 2) {
                switch (unitType) {
                // Get enemy reaper's data
                case 0:enemyReaper2={"x":x, "y":y, "mass":mass, "vx":vx, "vy":vy, "radius":radius};
                break;
                // Get enemy destroyer's data
                case 1:enemyDestroyer2={"x":x, "y":y, "mass":mass, "vx":vx, "vy":vy, "radius":radius};
                break;
                }
            }
    
            // Wrecks data
            switch (unitType) {
                case 4:wrecks.push({"x":x, "y":y, "waterStock":extra});
                break;
                case 3:tankers.push({"x":x, "y":y, "waterStock":extra});
                break;
            }
        }
        destinations.push(findClosestTanker(tankers));
    
        if (wrecks.length > 0) {
            destination = findClosestWreck(wrecks);
            var fightEnemy1 = enemyReaper1.x+" "+enemyReaper1.y;
            var fightEnemy2 = enemyReaper2.x+" "+enemyReaper2.y;
            var distEnemy1 = calcDistance(myReaper.x, myReaper.y, enemyReaper1.x, enemyReaper1.y);
            var distEnemy2 = calcDistance(myReaper.x, myReaper.y, enemyReaper2.x, enemyReaper2.y);
            var destinationXY= {"x":parseInt(destination.substring(0,2)), "y":parseInt(destination.substring(3,5))};
            var distDestination = calcDistance(myReaper.x, myReaper.y, destinationXY.x, destinationXY.y);
    
            if (distDestination < 50) {
                print("WAIT");
                if (enemyScore1 > myScore) {
                    print(fightEnemy1+" "+300);
                }
                else if (enemyScore2 > myScore) {
                    print(fightEnemy2+" "+300);
                }
                else {
                    print(fightEnemy1+" "+300);
                }
                print("WAIT");
            }
            else if (distDestination > 100) {
                print(destination+" "+300);
                if (enemyScore1 > myScore) {
                    print(fightEnemy1+" "+300);
                }
                else if (enemyScore2 > myScore) {
                    print(fightEnemy2+" "+300);
                }
                else {
                    print(fightEnemy1+" "+300);
                }
                print("WAIT");
            }
        }
        else if (wrecks.length === 0) {
            destination = findClosestTanker(tankers);
            print(destination+" "+300);
            print(destination+" "+300);
            print("WAIT");
        }
    }
})();