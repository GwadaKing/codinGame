// MES VARIABLES
    var X,Y=0;
    var instructions="";
    var myPos={x:null,y:null};              // ma position
    var barrels={x:[],y:[]};                // positions tonneaux
    var bestBarrelX=[];                      // position meilleur tonneau
    var bestBarrelY=[];                      // position meilleur tonneau
    var baril=0;
    var map=[];                             // la grille de la map
    for (var a=0;a<23;a++) {
        for (var b=0;b<20;b++) {
            map[a]=["0"];
            for (var b=0;b<20;b++) {
                map[a][b]=0;
            }
        }
    }
    var myShip={id:null,speed:null,rhumLvl:null,direction:null};
    var oppShip={id:null,speed:null,rhumLvl:null,direction:null};
    var rhumInside=0;                       // quantité de rhum dans un baril
    var tour=1;                             // tour de jeu
    var distRhum=Math.sqrt(Math.pow((myPos.x-bestBarrelX[0]),2)+(Math.pow((myPos.y-bestBarrelY[0]),2)));
// game loop
while (true) {
    
    
    // VARIABLES CODINGAME
    var myShipCount = parseInt(readline()); // the number of remaining ships
    var entityCount = parseInt(readline()); // the number of entities (e.g. ships, mines or cannonballs)
    for (var i = 0; i < entityCount; i++) {
        var inputs = readline().split(' ');
        var entityId = parseInt(inputs[0]);
        var entityType = inputs[1];
        var x = parseInt(inputs[2]);
        var y = parseInt(inputs[3]);
        var arg1 = parseInt(inputs[4]);
        var arg2 = parseInt(inputs[5]);
        var arg3 = parseInt(inputs[6]);
        var arg4 = parseInt(inputs[7]);
        
        
        // DEBUT DE MON CODE
        /*if (tour>=40) { 
        print(bestBarrelX+" "+bestBarrelY);
        print(tour);
        }*/
        
        // MON BATEAU
        if ((entityType==="SHIP")&&(arg4===1)) {
            myShip.id=entityId;
            myShip.direction=arg1;
            myShip.speed=arg2;
            myShip.rhumLvl=arg3;
            myPos.x=x;
            myPos.y=y;
            map[x][y]="S";
        }
        
        // BATEAU ENNEMI
        if ((entityType==="SHIP")&&(arg4===0)) {
            oppShip.id=entityId;
            oppShip.direction=arg1;
            oppShip.speed=arg2;
            oppShip.rhumLvl=arg3;
            map[x][y]="E";
        }
        
        // BARILS
        if (entityType==="BARREL") {
            rhumInside=arg1;
            bestBarrelX.push(x);
            bestBarrelY.push(y);
            map[x][y]="B";
        }
    }
    // TRAITEMENT
        X=bestBarrelX[baril];
        Y=bestBarrelY[baril];
        instructions="MOVE "+X+" "+Y;
        if ((myPos.x==bestBarrelX[baril])&&(myPos.y==bestBarrelY[baril])) {
            bestBarrelX.shift(bestBarrelX[baril]);
            bestBarrelY.shift(bestBarrelY[baril]);
        }
        /*if (myShip.speed===0) {
            baril++;
        }*/
    for (var i = 0; i < myShipCount; i++) {
        
        
        // To debug: printErr('Debug messages...');
        
        print(instructions); // Any valid action, such as "WAIT" or "MOVE x y"
        
    }
    tour+=2;
    
}