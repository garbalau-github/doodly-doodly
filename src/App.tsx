import { useEffect, useState } from 'react'

type Grid = string[][];

type Player = 'R' | 'Y';

const App = () => {

  const EMPTY_GRID = Array(7)
    .fill('')
    .map(() => Array(6).fill('E'));

  // TODO: move to localStorage
  const [grid, setGrid] = useState<Grid>(EMPTY_GRID);
  const [currentPlayer, setCurrentPlayer] = useState<Player>('R');
  const [score, setScore] = useState<{ R: number, Y: number }>({ R: 0, Y: 0 });

  useEffect(() => {
    const isFull = grid.every(row => row.every(cell => cell !== 'E'))
    if (isFull) {
      setTimeout(() => {
        resetGame()
      }, 5000)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grid]);

  const placeDisc = (row: number) => {
    setGrid((prevGrid: Grid) => {
      const newGrid = [...prevGrid];

      const suitableCell = newGrid[row].reduceRight((accumulator, cell, index) => {
        if (cell === 'E' && accumulator === -1) return index;
        return accumulator;
      }, -1);

      if (suitableCell === -1) return newGrid;

      newGrid[row][suitableCell] = currentPlayer;

      setCurrentPlayer(currentPlayer === 'R' ? 'Y' : 'R');
      return newGrid;
    });
  }

  const resetGame = () => {
    setGrid(EMPTY_GRID);
    setCurrentPlayer('R');
  }

  return (
    <>
      <h2>Doodly Boodly</h2>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', border: '1px solid royalblue', padding: '1rem', backgroundColor: 'royalblue' }}>
            {grid.map((row, rowIndex) => {
              return (
                <div key={`row${rowIndex}`}>
                  <div style={{ fontSize: '10px', padding: '0.5rem 0.75rem', color: 'white' }}>{rowIndex}</div>
                  {row.map((cell, cellIndex) => {
                    return <div
                      onClick={() => placeDisc(rowIndex)}
                      key={`cell${cellIndex}`}
                      style={{ cursor: 'pointer', width: "25px", height: '25px', padding: '0.25rem 0.25rem', border: '4px solid royalblue', backgroundColor: cell === 'R' ? 'orangered' : cell === 'Y' ? 'yellow' : "white", borderRadius: '50%' }} />
                  })}
                </div>
              );
            })}
          </div>
          <div style={{ backgroundColor: '#111', padding: '1rem' }}>
            <span style={{ color: currentPlayer === 'R' ? 'orangered' : currentPlayer === 'Y' ? 'yellow' : 'black' }}>{currentPlayer}</span>
          </div>
        </div>
        <div style={{ backgroundColor: '#111', padding: '1rem' }}>
          <p style={{color: 'white'}}>Score</p>
          <p style={{color: 'white'}}><span style={{color: 'orangered'}}>R</span> {score.R}</p>
          <p style={{color: 'white'}}><span style={{color: 'yellow'}}>Y </span>{score.Y}</p>
          <button onClick={resetGame}>Reset Game</button>
        </div>
      </div>
    </>
  )
}

export default App