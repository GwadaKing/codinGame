main();function main() {
    let tour = 0;
    // game loop
    while (true) {
        var myPlayer       = {};
        var opponent       = {};
        var myPlayerItems  = [];
        var opponentItems  = [];
        var myPlayerQuests = [];
        var opponentQuests = [];
        var grid           = [];
        let graph          = [];
        let counter        = 0;
        const turnType     = parseInt(readline());
        for (let i = 0; i < 7; i++) {
            var inputs = readline().split(' ');
            for (let j = 0; j < 7; j++) {
                const tile = inputs[j];
                grid.push(tile);
                graph.push({"nodeId":counter,"tile":tile, "x":j, "y":i});
                counter++;
            }
        }
        printErr(graph);

        for (let i = 0; i < 2; i++) {
            var inputs = readline().split(' ');
            const numPlayerCards = parseInt(inputs[0]); // the total number of quests for a player (hidden and revealed)
            const playerX = parseInt(inputs[1]);
            const playerY = parseInt(inputs[2]);
            const playerTile = inputs[3];
            switch (i) {
                case 0: myPlayer = {"x":playerX, "y":playerY, "tile":playerTile};break;
                case 1: opponent = {"x":playerX, "y":playerY, "tile":playerTile};break;
            }
        
        }
        const numItems = parseInt(readline()); // the total number of items available on board and on player tiles
        for (let i = 0; i < numItems; i++) {
            var inputs = readline().split(' ');
            const itemName = inputs[0];
            const itemX = parseInt(inputs[1]);
            const itemY = parseInt(inputs[2]);
            const itemPlayerId = parseInt(inputs[3]);
            switch (itemPlayerId) {
                case 0: myPlayerItems.push({"name":itemName,"x":itemX, "y":itemY});break;
                case 1: opponentItems.push({"name":itemName,"x":itemX, "y":itemY});break;
            }
        }
        const numQuests = parseInt(readline()); // the total number of revealed quests for both players
        for (let i = 0; i < numQuests; i++) {
            var inputs = readline().split(' ');
            const questItemName = inputs[0];
            const questPlayerId = parseInt(inputs[1]);
            switch (questPlayerId) {
                case 0: myPlayerQuests.push(questItemName);break;
                case 1: opponentQuests.push(questItemName);break;
            }
        }
        printErr("myPlayer       ===> Position:"+myPlayer.x+" "+myPlayer.y+" Tile:"+myPlayer.tile);
        for (let i = 0, l = myPlayerItems.length; i < l; i++) {
            printErr("myPlayerItems  ===> "+myPlayerItems[i].name+" Position:"+myPlayerItems[i].x+" "+myPlayerItems[i].y);
        }
        for (let i = 0, l = myPlayerQuests.length; i < l; i++) {
            printErr("myPlayerQuests ===> "+myPlayerQuests[i]);
        }
        
        tour %2 === 0 ? console.log('PUSH 1 LEFT'):console.log("MOVE DOWN");
        tour++;
    }

    // D'abord appliquer le floodfill pour colorier les cases accessibles à chaque config de push(codepen si possible) 
    // puis simuler plusiurs configs
}
