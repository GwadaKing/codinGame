function main() {
    var inputs = readline().split(' ');
    var width = parseInt(inputs[0]);
    var height = parseInt(inputs[1]);
    var myId = parseInt(inputs[2]);
    
    var tour=0;
    var myPosX=0;
    var myPosY=0;
    var myPos="";
    var grid=[];
    var doublon=false;
    var bestSpotX=[];
    var bestSpotY=[];
    var afterSpotX=[];
    var afterSpotY=[];
    var le=0;
    var le2=0;
    
    // game loop
    while (true) {
        grid.length=0;
        for (var z = 0; z < height; z++) {
            var row = readline();
            // ON STOCKE LA MAP
            grid[z]=row;
        }
        var entities = parseInt(readline());
        for (var i = 0; i < entities; i++) {
            inputs = readline().split(' ');
            var entityType = parseInt(inputs[0]);
            var owner = parseInt(inputs[1]);
            var x = parseInt(inputs[2]);
            var y = parseInt(inputs[3]);
            var param1 = parseInt(inputs[4]);
            var param2 = parseInt(inputs[5]);
    
            // INSTRUCTIONS POUR MON JOUEUR
            if ((entityType===0)&&(owner==myId)) {
                myPosX=x;
                myPosY=y;
                // ON REPERE LES BONS SPOTS
                for (var line=0;line<height;line++) {
                    for (var col=0;col<width;col++) {
                        var box=grid[line].indexOf(/[0]/g);
                        var nextBox=grid[line].indexOf(/[0]/g,col);
                        var tile=grid[line].charAt(col);            
                        var right2=grid[line].charAt(col+2);
                        if ((grid[line+2]!==undefined)&&(grid[line+1]!==undefined)) {
                            var down2=grid[line+2].charAt(col); 
                            var down1Right1=grid[line+1].charAt(col+1);
                            var down1Right2=grid[line+1].charAt(col+2);
                            var down2Right1=grid[line+2].charAt(col+1);
                            var down2Right2=grid[line+2].charAt(col+2);
                        }
                        if ((grid[line-2]!==undefined)&&(grid[line-1]!==undefined)) {
                            var up2=grid[line-2].charAt(col);
                            var up1Right1=grid[line-1].charAt(col+1);
                            var up1Right2=grid[line-1].charAt(col+2);
                            var up2Right1=grid[line-2].charAt(col+1);
                            var up2Right2=grid[line-2].charAt(col+2);
                        }        
                        if (tile=="0") {
                            // LA CROIX AVEC DECALAGE 2 PARTOUT OU RESSERREE EN HAUTEUR
                            if (((down2Right2=="0")||(down1Right2=="0"))&&((up2Right2=="0")||(up1Right2=="0"))) {
                                if (grid[line].charAt(col+2)==".") {
                                    bestSpotX.push(col+2);
                                    bestSpotY.push(line);
                                }
                            }
                            // LA CROIX AVEC DECALAGE 1 PARTOUT
                            if ((right2=="0")&&((up2Right1=="0")||(down2Right1=="0"))) {
                                if (grid[line].charAt(col+1)==".") {
                                    bestSpotX.push(col+1);
                                    bestSpotY.push(line);
                                }
                            }
                            // VERTICAL : ENTRE 2 CAISSES
                            if ((downTile=="0")&&((bestSpotX.length===0)&&(tour>100))) {
                                if (grid[line+1].charAt(col)==".") {
                                    bestSpotX.push(col);
                                    bestSpotY.push(line+1);
                                }
                            }
                            // HORIZONTAL : ENTRE 2 CAISSES
                            if ((right2=="0")&&((bestSpotX.length===0)&&(tour>100))) {
                                if (grid[line].charAt(col+1)==".") {
                                    bestSpotX.push(col+1);
                                    bestSpotY.push(line);
                                }
                            }
                            if ((bestSpotX.length===0)&&(tour>100)) {
                                if ((grid[line].charAt(col-1)==".")&&(col>0)) {
                                    bestSpotX.push(col-1);
                                    bestSpotY.push(line);
                                }
                                else if ((grid[line].charAt(col+1)==".")&&(col===0)) {
                                    bestSpotX.push(col+1);
                                    bestSpotY.push(line);
                                }
                            }
                        }
                    }
                }
            }        
        }
    }
    }
    main();