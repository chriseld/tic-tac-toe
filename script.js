const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], 
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let board;
let turn = 'X';
let win;

const squares = Array.from(document.querySelectorAll('#board div'));

document.getElementById('board').addEventListener('click', handleTurn);

const messages = document.querySelector('h2');

function getWinner() {
    let winner = null;
    winningCombos.forEach(function(combo, index) {
        if (board[combo[0]] && board[combo[0]] === board[combo[1]] && board[combo[0]] === board[combo[2]]) winner = board[combo[0]];});
        if (winner) {
            return winner 
          } else if (board.includes('')) {
            return null
          } else {
            return 'T' // Tie condition
        };
};

function handleTurn() {
    let squareIndex = squares.findIndex(function(square) {
        return square === event.target;
    });
    board[squareIndex] = turn;
    if(turn === 'X') {
        turn = 'O'
    } else {
        turn = 'X'
    };
    win = getWinner();
    render();
};

function init() {
    board = ['', '', '','', '', '','', '', ''];
    render();
};

function render() {
    board.forEach(function(mark, index) {
    squares[index].textContent = mark;
    });
    if ( win === 'T' ) {
        messages.textContent = `The game is tied.`;
        toggleModal(messages.textContent);
      } else if (win) { 
        messages.textContent = `${win} wins the game!`
        toggleModal(messages.textContent);
      } else {
        messages.textContent = `It's ${turn}'s turn.`
    };
};

function restart() {
    init();
    $(".modal").removeClass("visible");
    return false;
}

function toggleModal(win) {
    $(".modalBox").html(`<h2>` + win + `</h2><br><div id="restart" onclick="restart()">Restart Game</div>`);
    $(".modal").toggleClass("visible");
};

init();