'use strict'

const GHOST = '👻'
var gGhosts = []

var gIntervalGhosts

function createGhosts(board,num) {
    // DONE: 3 ghosts and an interval
    gGhosts = []
    for (var i = 0; i < num; i++) {
        createGhost(board)
    }

    if (gIntervalGhosts) clearInterval(gIntervalGhosts)
    gIntervalGhosts = setInterval(moveGhosts, 3000)
}

function createGhost(board) {
    // DONE
    const ghost = {
        location: {
            i: 2,
            j: 6
        },
        currCellContent: FOOD,
        bGColor: getRandomColor()
    }

    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST
}

function moveGhosts() {
    // DONE: loop through ghosts
    for (var i = 0; i < gGhosts.length; i++) {
        const ghost = gGhosts[i]
        moveGhost(ghost)
    }
}

function moveGhost(ghost) {
    const moveDiff = getMoveDiff()
    const nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    if (nextCell === WALL) return
    if (nextCell === GHOST) return
    if (gPacman.isSuper && nextCell === PACMAN) {
        removeGhost(ghost);
        return;
    }
    if (!gPacman.isSuper&&nextCell === PACMAN) {
        gameOver()
        return
    }
    else 


    // DONE: moving from current location:
    // DONE: update the model 
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // DONE: update the DOM
    renderCell(ghost.location, ghost.currCellContent)


    // DONE: Move the ghost to new location:
    // DONE: update the model 
    ghost.location = nextLocation
    ghost.currCellContent = nextCell
    gBoard[nextLocation.i][nextLocation.j] = GHOST
    // DONE: update the DOM
    renderCell(ghost.location, getGhostHTML(ghost))
}

function getMoveDiff() {
    const randNum = getRandomIntInclusive(1, 4)

    switch (randNum) {
        case 1: return { i: 0, j: 1 }
        case 2: return { i: 1, j: 0 }
        case 3: return { i: 0, j: -1 }
        case 4: return { i: -1, j: 0 }
    }
}
function getGhostHTML(ghost) {

    return `<span style="background-color:${ghost.bGColor}">${GHOST}</span>`
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 3; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function changeGhostsColor() {
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i]
        ghost.bGColor = 'blue'
        renderCell(ghost.location, getGhostHTML(ghost));
    }
}

function resetGhostsColor() {
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        ghost.bGColor = getRandomColor();
        renderCell(ghost.location, getGhostHTML(ghost));
    }
}

function removeGhost(ghost) {
    const ghostIndex = gGhosts.indexOf(ghost);
    if (ghostIndex !== -1) {
        gGhosts.splice(ghostIndex, 1);
        gBoard[ghost.location.i][ghost.location.j] = FOOD;
        renderCell(ghost.location, FOOD);
    }

}
