/* Performs Dijkstra's Algorithm; returns all nodes in the order
 in which they were visited. Also makes node point back to their
 previous node, effective allowing us to compute the shortest path
 by backtracing from the shortest path */

export function dijkstra(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    if (!startNode || !finishNode || startNode === finishNode) {
        return false;
    }
    startNode.distance = 0;
    const unvisitedNodes = getAllNodes(grid);
    while (!!unvisitedNodes.length) {
        sortNodesByDistance(unvisitedNodes);
        const closestNode = unvisitedNodes.shift();
        console.log(closestNode);

        /* If we encounter a wall, we skip it.
           if (closestNode.isWall) continue;
           If the closest node is at a distance of infinity.
           We must be trapped and should therefore stop.
           if (closestNode.distance === Infinity) return visitedNodesInOrder; */

        closestNode.isVisited = true;
        visitedNodesInOrder.push(closestNode);
        if (closestNode === finishNode) return visitedNodesInOrder;
        updateUnvisitedNeighbours(closestNode, grid);
    }
}


function sortNodesByDistance(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbours(node, grid) {
    const neighbours = getUnvisitedNeighbours(node, grid);
    for (const neighbour of neighbours) {
        neighbour.distance = node.distance + 1;
    }
}

function getUnvisitedNeighbours(node, grid) {
    const neighbours = [];
    const {col, row} = node;
    if (row>0) neighbours.push(grid[row - 1][col]);
    if (row<grid.length - 1) neighbours.push(grid[row + 1][col]);
    if (col>0) neighbours.push(grid[row][col - 1]);
    if (col< grid[0].length - 1) neighbours.push(grid[row][col + 1]);
    return neighbours;
}

function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
        for (const node of row) {
            // console.log(nodes)
            nodes.push(node);
        }
    }
    return nodes;
}