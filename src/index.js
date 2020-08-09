import React, {useState} from 'react';
import ReactDOM from 'react-dom';

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}


function Square({color, activeboard, val, game_no, square_no, onClick}) {
  console.log("Entrance Square function:");
  console.log(game_no, square_no, val)
  return (
    <button color = {color} activeboard = {activeboard.toString()} onClick = {() => onClick(game_no, square_no)}>{val}</button>
  )
}


function Game({winner, board, activeboard, game_no, onClick}) {
  console.log("Entrance Game function:");
  return (
   <>
   <div className = "board">
    {board.map((square_val, square_no) => {
      return <Square color={winner} activeboard={activeboard} val={square_val} game_no={game_no} square_no={square_no} onClick={onClick}/>
    })}
    </div>
   </>
  );
}

function MetaGame() {
  console.log("Entrance Metagame function:");
  const [boardOfBoards, setBoardOfBoards] = useState(Array(9).fill(Array(9).fill(null)));
  const [activeboard, setActiveBoard] = useState(null);
  const [xIsNext, setXIsNext] = useState(true); 
  const [resultsOfBoards, setResultsOfBoards] = useState(Array(9).fill(null));
  const [status, setStatus] = useState("X's move");

  function onClick(game_no, square_no) {
    console.log("registered click onClick in metagame at", game_no, square_no);
    console.log("value at that place is:", boardOfBoards[game_no][square_no]);
    if (boardOfBoards[game_no].every((val) => (val !== null))) {
      setActiveBoard(null);
      return;
    }

    if (boardOfBoards[game_no][square_no]) {
      console.log('square is in=active');
      return; 
    }

    if ((activeboard !== null) && (activeboard !== game_no)) {
      console.log('board is in=active');
      return;
    }

    const copyBoardOfBoards = [...boardOfBoards];
    const copySingleGame = [...copyBoardOfBoards[game_no]];

    const copyResultsOfBoards = [...resultsOfBoards];

    console.log("value at that place is:", boardOfBoards[game_no][square_no]);
    console.log("value at that place is:", copyBoardOfBoards[game_no][square_no]);
    copySingleGame[square_no] = xIsNext ? 'X' : 'O';  
    console.log("value at that place is:", boardOfBoards[game_no][square_no]);
    console.log("value at that place is:", copyBoardOfBoards[game_no][square_no]);
    copyBoardOfBoards[game_no] = copySingleGame;

    const winner = calculateWinner(copyBoardOfBoards[game_no]);

    if (winner) {
      copyResultsOfBoards[game_no] = winner; 
    }

    const TotalWinner = calculateWinner(copyResultsOfBoards);
    
    if (TotalWinner) {
      setStatus("Winner is " + (xIsNext ? "X" : "O"));
    }
    else {
      setStatus((!xIsNext ? "X" : "O") + "'s move");
    }


    setBoardOfBoards(copyBoardOfBoards);
    setResultsOfBoards(copyResultsOfBoards);
    setActiveBoard(square_no);
    setXIsNext(!xIsNext);
  }


  return (
    <>
      <h1>{status}</h1>
      <div className = "boards">
      {boardOfBoards.map((board, game_no) => {
        return <Game winner={resultsOfBoards[game_no]} activeboard={game_no === activeboard} board={board} game_no={game_no} onClick={onClick}/>
      })}
      </div>
    </>
  )
}


function App() {
  return (
    <MetaGame/>
  );
}

ReactDOM.render(
    <App/>, document.getElementById('root')
); 