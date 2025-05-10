import React, { useState } from 'react';
import Settings from './Settings';

const TicTacToe = ({ user }) => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const [firstPlayer, setFirstPlayer] = useState('X');
    const [showSettings, setShowSettings] = useState(false);

    const handleClick = (index) => {
        if (board[index] || calculateWinner(board)) return;
        const newBoard = board.slice();
        newBoard[index] = isXNext ? 'X' : 'O';
        setBoard(newBoard);
        setIsXNext(!isXNext);
    };

    const calculateWinner = (board) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return null;
    };
    
    const draw = () => {
        return board.every((cell) => cell !== null) && !calculateWinner(board);
    };

    const handleFirstPlayerChange = (event) => {
        setFirstPlayer(event.target.value);
        setIsXNext(event.target.value === 'X');
        setBoard(Array(9).fill(null));
    };

    const handleReset = () => {
        setBoard(Array(9).fill(null));
        setIsXNext(firstPlayer === 'X');
    };

    const winner = calculateWinner(board);
    const isDraw = draw();
    const status = winner ? `Winner: ${winner}` : (isDraw ? 'It\'s a draw!' : `Next player: ${isXNext ? 'X' : 'O'}`);

    return (
        <div className="container">
            <h2>Tic Tac Toe</h2>
            <div className="settings-icon" onClick={() => setShowSettings(!showSettings)}>
                ⚙️
            </div>
            <div className={`settings-container ${showSettings ? 'show' : ''}`}>
                <Settings firstPlayer={firstPlayer} handleFirstPlayerChange={handleFirstPlayerChange} />
            </div>
            <div className="message">{status}</div>
            <div className="board">
                {board.map((value, index) => (
                    <button key={index} onClick={() => handleClick(index)} className="cell">
                        {value}
                    </button>
                ))}
            </div>
            <button onClick={handleReset} className="reset-button">Reset Game</button>
        </div>
    );
};

export default TicTacToe;
