const cells = document.querySelectorAll('.cell');
const restartBtn = document.getElementById('restart-btn');

let currentPlayer = 'x';
let board = Array(9).fill(null);

const checkWinner = () => {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]              // diagonals
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }

    return board.every(cell => cell) ? 'draw' : null;
};

const handleClick = (e) => {
    const index = e.target.dataset.index;

    if (!board[index] && !checkWinner()) {
        board[index] = currentPlayer;
        e.target.classList.add(currentPlayer);
        e.target.textContent = currentPlayer.toUpperCase();

        const winner = checkWinner();
        if (winner) {
            setTimeout(() => {
                if (winner === 'draw') {
                    alert("It's a draw!");
                } else {
                    alert(`${winner.toUpperCase()} wins!`);
                }
            }, 100);
        }

        currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
    }
};

const restartGame = () => {
    board.fill(null);
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });
    currentPlayer = 'x';
};

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartBtn.addEventListener('click', restartGame);
