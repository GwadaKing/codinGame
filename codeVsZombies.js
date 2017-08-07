/**
 * Save humans, destroy zombies!
 **/
function calculateDistance(x1,x2,y1,y2) {
    return Math.round(Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2)));
}

// game loop
while (true) {
    var inputs = readline().split(' ');
    var x = parseInt(inputs[0]);
    var y = parseInt(inputs[1]);
    var myPos={X:x,Y:y};
    var humanCount = parseInt(readline());
    var closestZombie="";
    var humans=[];
    var zombies=[];
    var distances=[];
    for (var i = 0; i < humanCount; i++) {
        var inputs = readline().split(' ');
        var humanId = parseInt(inputs[0]);
        var humanX = parseInt(inputs[1]);
        var humanY = parseInt(inputs[2]);
        humans.push({id:humanId,X:humanX,Y:humanY,distance:calculateDistance(myPos.X,humanX,myPos.Y,humanY)});
    }
    var zombieCount = parseInt(readline());
    for (var i = 0; i < zombieCount; i++) {
        var inputs = readline().split(' ');
        var zombieId = parseInt(inputs[0]);
        var zombieX = parseInt(inputs[1]);
        var zombieY = parseInt(inputs[2]);
        var zombieXNext = parseInt(inputs[3]);
        var zombieYNext = parseInt(inputs[4]);
        zombies.push({id:zombieId,X:zombieX,Y:zombieY,XX:zombieXNext,YY:zombieYNext,distance:calculateDistance(zombieX,myPos.X,zombieY,myPos.Y)});
        printErr("LE ZOMBIE N°"+zombies[i].id+" EST EN POSITION "+zombies[i].X+" "+zombies[i].Y+" ET A UNE DISTANCE DE "+zombies[i].distance);
        //distances.push(calculateDistance(zombieX,myPos.X,zombieY,myPos.Y));
    }
    // on repere le zombie le plus proche
    for (var i=0,l=zombies.length;i<l;i++) {
        if (l==1) {
            closestZombie=zombies[0].XX+" "+zombies[0].YY;
        }
        if (i>0) {
            if (zombies[i].distance<zombies[i-1].distance) {
                closestZombie=zombies[i].XX+" "+zombies[i].YY;
            }
        }
    }
    // SI UN SEUL RESCAPE ALORS LE PROTEGER EN PRIORITE
    if (humanCount===1) {
        print(humans[0].X+" "+humans[0].Y);
    }
    // SINON FOCALISER SUR LES ZOMBIES EN COMMENCANT PAR LE PLUS PROCHE
    else if (humanCount>1) {
        print(humans[0].X+" "+humans[0].Y);
        humans.shift();
    }
    
    zombies.length=0;
    myPos.length=0;
    humans.length=0;
}