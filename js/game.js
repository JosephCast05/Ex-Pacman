'use strict'

const WALL = '#'
const FOOD = '.'
const EMPTY = ' '
const SUPERFOOD = '🍕'
const CHERRY = '🍒'
// Model
const gGame = {
    score: 0,
    isOn: false,
}
var gBoard
var elModal = document.querySelector('.modal.lost')
var elModal2 = document.querySelector('.modal.won')
var gCherryInterval
var gFoodCount


function onInit() {
    gGame.isOn = true
    gFoodCount=-5
    updateScore(0)
    gBoard = buildBoard()
    createGhosts(gBoard,3)
    createPacman(gBoard)
    renderBoard(gBoard)
    elModal.style.display = 'none'
    elModal2.style.display = 'none'
    clearInterval(gCherryInterval)
    gCherryInterval= setInterval(addCherry,5000)
}

function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])

        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD
            gFoodCount++

            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
                gFoodCount--

            }
        }

    }
    board[1][1] = SUPERFOOD;
    board[1][size - 2] = SUPERFOOD;
    board[size - 2][1] = SUPERFOOD;
    board[size - 2][size - 2] = SUPERFOOD;
    return board
}

function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {

            const cell = board[i][j]
            const className = `cell cell-${i}-${j}`

            strHTML += `<td class="${className}">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    const elContainer = document.querySelector('.board')
    elContainer.innerHTML = strHTML
}

function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value

}

function updateScore(diff) {
    // DONE: update model and dom
    if (!diff) {
        gGame.score = 0
    } else {
        gGame.score += diff
    }
    document.querySelector('span.score').innerText = gGame.score
}

function gameOver() {
    console.log('Game Over')
    clearInterval(gIntervalGhosts)
    clearInterval(gCherryInterval)
    renderCell(gPacman.location, '🪦')
    gGame.isOn = false
    elModal.style.display = 'block'
}

function checkIfWon() {
    if (gFoodCount!== gGame.score) return
    gameWon()
}

function gameWon() {
    console.log('You Won')
    clearInterval(gIntervalGhosts)
    clearInterval(gCherryInterval)
    renderCell(gPacman.location, '🦸')
    gGame.isOn = false
    elModal2.style.display = 'block'

}

function handleSuperFood() {
    gPacman.isSuper = true
    changeGhostsColor()
    setTimeout(endSuperPowerMode, 5000)

}

function endSuperPowerMode() {
    resetGhostsColor()
    createGhosts(gBoard,1)
    gPacman.isSuper = false;


}


function addCherry() {
    const emptyCell = getRandEmptyCell()
    if (!emptyCell) return
    gBoard[emptyCell.i][emptyCell.j] = CHERRY
    renderCell(emptyCell, CHERRY)
    gFoodCount += 10
    console.log('gFoodCount:', gFoodCount, gBoard[emptyCell.i][emptyCell.j])
}
function getRandEmptyCell() {
    const emptyCells = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j] === EMPTY) {
                emptyCells.push({ i, j })
            }
        }
    }
    var randInt = getRandomInt(0, emptyCells.length);
    console.log(`emptyCells:${randInt}, ${emptyCells[randInt]}, ${JSON.stringify(emptyCells[randInt])},${emptyCells.length}`)
    return emptyCells[randInt]
}


