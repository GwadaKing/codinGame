main();function main() {
    let tour = 1;
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
        let startNode      = {};
        let targetNode     = {};
        let bfsPath        = [];
        let targetNodeId   = 0;
        let counter        = 0;        
        const turnType     = parseInt(readline());
        for (let y = 0; y < 7; y++) {
            var inputs = readline().split(' ');
            for (let x = 0; x < 7; x++) {                
                const tile      = inputs[x];
                let neighbors   = [];                
                grid.push({ "id":counter,"tile":tile, "x":x, "y":y, "neighbors": neighbors });
                counter++;
            }
        }
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
        //////////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
        // Construction du graphe
        root         = getMyPlayerPositionId(grid, myPlayer.x, myPlayer.y);
        graph        = buildGraph(grid, root);
        targetNodeId = getTargetNodeId(grid, myPlayerItems[0].x, myPlayerItems[0].y);
        startNode    = { "id":root, "x":myPlayer.x, "y":myPlayer.y };
        targetNode   = { "id":targetNodeId, "x":myPlayerItems[0].x, "y":myPlayerItems[0].y };
        // Parcours en profondeur
        bfsPath = startBfs(startNode, targetNode, graph); 
        if (bfsPath.length == 0) { bfsPath = "DOWN" }
        tour %2 !== 0 ? console.log('PUSH 1 LEFT'):console.log("MOVE "+bfsPath);
        tour++;
    }
}

/**
 * Retourne l'Id de la case où se situe mon héros
 * @param {Object} grid La map
 * @param {Int}    x    Coordonnées X héros
 * @param {Int}    y    Coordonnées Y héros
 * @return {Int} 
 */
function getMyPlayerPositionId(grid, x, y) {
    for (node of grid){
        if(node.x == x && node.y == y) {
            return node.id;
        }
    }
}

/**
 * Retourne l'Id de la case de la quête courante
 * @param {Object} grid La map
 * @param {Int}    x    Coordonnées X item de la quête
 * @param {Int}    y    Coordonnées Y item de la quête
 * @return {Int} 
 */
function getTargetNodeId(grid, x, y) {
    for (node of grid) {
        if (node.x == x && node.y == y) { return node.id}
    }
}

/**
 * Retourne le graphe d'origine d'une phase de jeu
 * @param {Object} grid        La map du jeu
 * @param {Int}    currentNode L'id du node courant
 * @return {Object}
 */
function buildGraph(grid, currentNode) {
    let graph = [];
    for (let i = 0, l = grid.length; i < l; i++) {   
        let node      = grid[i].id;
        let x         = grid[i].x;
        let y         = grid[i].y;
        let neighbors = [];
        let upCell    = grid[i].tile[0];
        let rightCell = grid[i].tile[1];
        let downCell  = grid[i].tile[2];
        let leftCell  = grid[i].tile[3];
        if (upCell    == 1) { if (y - 1 > -1) { if (grid[i-7]["tile"][2] == 1) { neighbors.push(i-7) } } }
        if (rightCell == 1) { if (x + 1 < 7)  { if (grid[i+1]["tile"][3] == 1) { neighbors.push(i+1) } } }
        if (downCell  == 1) { if (y + 1 < 7)  { if (grid[i+7]["tile"][0] == 1) { neighbors.push(i+7) } } }
        if (leftCell  == 1) { if (x - 1 > -1) { if (grid[i-1]["tile"][1] == 1) { neighbors.push(i-1) } } }
        node != currentNode ? graph.push( { "id":node, "x":x, "y":y, "neighbors": neighbors, "distance":+Infinity, visited:false } ) : graph.push( { "id":node, "x":x, "y":y, "neighbors": neighbors, "distance":0, visited:true } );
    }
    return graph;
}

/**
 * @param {Function} getNeighborsIds Récupère la liste des voisins d'un node
 * @param {Object}   graph        Le graphe d'un tour de jeu
 * @param {Int}      root         L'id du node dont on cherche les voisins
 * @return {Array}
 */
function getNeighborsIds(graph, root) {
    for (node of graph) {
        if (node.id == root) { return node.neighbors }
    }
}

/**
 * @param {Function} bfs       Parcourt le graphe en largeur
 * @param {Object}   startPos  Infos node départ
 * @param {Object}   targetPos Infos node cible
 * @param {Object}   graph     Le graphe représentant le plateau sur un tour
 * @return {String}            Le chemin définitif sous formes de directions séparées par des espaces
 */
function startBfs(startPos, targetPos, graph) {
    const queue     = [];
    const visited   = [];    
    const root      = startPos.id;
    const target    = targetPos.id;
    let pathLength  = 0;
    let backTrack   = [];
    let neighbors   = getNeighborsIds(graph, root);
    let targetNeig  = getNeighborsIds(graph, target);       
    queue.push(root);                                       
    while(queue.length) {            
        const current = queue.shift();
        neighbors     = getNeighborsIds(graph, current);    
        if (current === target) {                                                       
            visited.push(current);                                                  
            backTrack[node] = current;
            let finalPath = retrievePathFromBfs(backTrack, target, root);            
            return finalPath;
        }                                                
        for(let node of neighbors) {                                                            
            if (visited.indexOf(node) === -1) {                                                          
                visited.push(node);
                backTrack[node] =  current;
                queue.push(node);
            }
        }
        pathLength++;
    }                                                      
    return "";    
}

/**
 * @param {Function} retrievePathFromBfs Après le parcours en profondeur, récupère le chemin trouvé en "backtracking"
 * @param {Array}    backTrack           Contient les parents de chaque node du parcours trouvé
 * @param {Int}      target              Le node cible duquel on va remonter
 * @param {Int}      origin              Le node où se trouve notre héros au début du tour
 * @return {String}                      Le chemin sous formes de strings séparés par des espaces
 */
function retrievePathFromBfs(backTrack, target, origin) {
    let path            = [];
    let outputDirection = []; 
    path.push(target);
    while (target != origin) { path.push(backTrack[target]); target = backTrack[target] } 
    path.reverse();
    for (let i = 1, l = path.length; i < l; i++) {
        let currNodeId = path[i];
        let prevNodeId = path[i-1];        
        switch (currNodeId) {
            case prevNodeId - 7:outputDirection.push("UP") ; break;
            case prevNodeId + 7:outputDirection.push("DOWN")   ; break;
            case prevNodeId + 1:outputDirection.push("RIGHT"); break;
            case prevNodeId - 1:outputDirection.push("LEFT") ; break;                
        }
    }    
    return outputDirection.join(" ");   
}
