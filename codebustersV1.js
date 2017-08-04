// CALCULATE DISTANCE BETWEEN 2 ENTITIES
function calcDistance(x1,x2,y1,y2) {
    var distance=Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2));
    return Math.round(distance);
}


var bustersPerPlayer = parseInt(readline()); // the amount of busters you control
var ghostCount = parseInt(readline()); // the amount of ghosts on the map
var myTeamId = parseInt(readline()); // if this is 0, your base is on the top left of the map, if it is one, on the bottom right
if (myTeamId===0) { var myBase={x:500,y:500}; var enemyBase={x:16000,y:8500}; } 
             else { var myBase={x:15500,y:8500}; var enemyBase={x:0,y:500}; }
var myBusters=[];
var enemyBusters=[];
var ghosts=[];
var actions=[];
var distances=[];
var tour=0;

// game loop
while (true) {    var entities = parseInt(readline()); // the number of busters and ghosts visible to you
    
    for (var i = 0; i < entities; i++) {
        var inputs = readline().split(' ');
        var entityId = parseInt(inputs[0]); // buster id or ghost id
        var x = parseInt(inputs[1]);
        var y = parseInt(inputs[2]); // position of this buster / ghost
        var entityType = parseInt(inputs[3]); // the team id if it is a buster, -1 if it is a ghost.
        var state = parseInt(inputs[4]); // For busters: 0=idle, 1=carrying a ghost.
        var value = parseInt(inputs[5]); // For busters: Ghost id being carried. For ghosts: number of busters attempting to trap this ghost.
        // MES BUSTERS
        if (entityType===myTeamId) {
            myBusters.push({id:entityId,posX:x,posY:y,status:state});
        }
        // LES FANTOMES
        if (entityType==-1) {
            ghosts.push({id:entityId,posX:x,posY:y});
            
        }
        // LES BUSTERS ENNEMIS
        if ((entityType!=myTeamId)&&(entityType!==-1)) {
            enemyBusters.push({id:entityId,posX:x,posY:y,status:state});
        }
    }
    
    //////////////////////////////////// DEBUGGING LINES //////////////////////////////////
    printErr("FANTOMES RESTANTS :"+ghostCount+"\n J'AI "+bustersPerPlayer+" BUSTERS. LEURS COORDONNEES SONT:");
    for (var i=0;i<bustersPerPlayer;i++) {
        printErr("BUSTER "+i+"(ID:"+myBusters[i].id+"):"+myBusters[i].posX+" "+myBusters[i].posY+" ETAT:"+myBusters[i].status);
        
    }
    ///////////////////////////////////////////////////////////////////////////////////////
   
    //////////////////////////// ACTION DECISION FOR EACH BUSTER /////////////////////////
    for (var i = 0;i<bustersPerPlayer;i++) {
        // SI LE BUSTER N'A PAS DE PRISONNIER
        if (myBusters[i].status===0) {
            // s'il voit au moins un fantome autour de lui...
            if (ghosts.length>0) {
                var distance=calcDistance(myBusters[i].posX,ghosts[0].posX,myBusters[i].posY,ghosts[0].posY);
                // Si le fantome est dans le range alors BUST...
                if ((distance>900)&&(distance<1760)) {
                    actions.push("BUST "+ghosts[0].id);
                    ghosts.shift();
                }
                // sinon s'il est trop près ou trop loin, MOVE près de lui
                else if ((distance<900)||(distance>1760)) {
                    actions.push("MOVE "+ghosts[0].posX+" "+ghosts[0].posY);
                }
            }
            // sinon si pas de fantome visible alors explorer
            else if (ghosts.length===0) {
                // si ma base est à gauche...
                if (myTeamId===0) {
                   // tant qu'on a pas atteint le bord droit...
                    if (myBusters[i].posX!=enemyBase.x) {
                        // aller vers la droite toute
                        actions.push("MOVE "+(myBusters[i].posX+800)+" "+(myBusters[i].posY+(i*200)));
                    }
                    // une fois le bord droit atteint...
                    else if (myBusters[i].posX==enemyBase.x) {
                        // aller base ennemie
                        actions.push("MOVE "+enemyBase.x+" "+enemyBase.y);
                    } 
                }
                // sinon si ma base est à droite...
                else if (myTeamId===1) {
                   // tant qu'on a pas atteint le bord gauche...
                    if (myBusters[i].posX!=enemyBase.x) {
                        // aller vers la gauche toute
                        actions.push("MOVE "+(myBusters[i].posX-800)+" "+(myBusters[i].posY+(i*100)));
                    }
                    // une fois le bord gauche atteint...
                    else if (myBusters[i].posX==enemyBase.x) {
                        // aller base ennemie
                        actions.push("MOVE "+enemyBase.x+" "+enemyBase.y);
                    } 
                }
            }
        }
        // SI LE BUSTER TRANSPORTE UN FANTOME
        else if (myBusters[i].status===1) {
            // S'il est aux coordonnées de ma base, alors RELEASE...
            if ((myBusters[i].posX==myBase.x)&&(myBusters[i].posY==myBase.y)) {
                actions.push("RELEASE");
            }
            // Sinon, MOVE vers ma base
            else if ((myBusters[i].posX!=myBase.x)||(myBusters[i].posY!=myBase.y)) {
                actions.push("MOVE "+myBase.x+" "+myBase.y);
            } 
        }
    }
    //////////////////////////////////////////////////////////////////////////////////
    
    ////////////////////////// PRINTING TOUR INSTRUCTIONS ////////////////////////////
    for (var x=0,l=actions.length;x<l;x++) {
        print(actions.shift());
    }
    /////////////////////////////////////////////////////////////////////////////////
    
    // EMPTYING ARRAYS BEFORE WHILE LOOP REFRESHING
    myBusters.length=0;
    enemyBusters.length=0;
    ghosts.length=0;
    tour+=2;
    
} // FIN BOUCLE JEU