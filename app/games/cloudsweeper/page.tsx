"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BombIcon, CoinsIcon } from "lucide-react";
import Image from "next/image";
import { useSound } from "use-sound";

type Cell = {
  isMine: boolean;
  isRevealed: boolean;
};

type Transaction = {
  betAmount: number;
  multiplier: number;
  payout: number;
  timestamp: Date;
};

type GridSize = 3 | 5 | 7 | 9;

export default function GameComponent() {
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [score, setScore] = useState(0);
  const [betAmount, setBetAmount] = useState(10);
  const [numberOfMines, setNumberOfMines] = useState(5);
  const [gameStarted, setGameStarted] = useState(false);
  const [winAmount, setWinAmount] = useState(0);
  const [cashedOut, setCashedOut] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [gridSize, setGridSize] = useState<GridSize>(5);

  const [playMineFound] = useSound("/sounds/mines-found.mp3");
  const [playBlast] = useSound("/sounds/blast.mp3");

  const startGame = async () => {
    if (
      betAmount <= 0 ||
      numberOfMines <= 0 ||
      numberOfMines >= gridSize * gridSize
    ) {
      alert("Please enter valid bet amount and number of mines.");
      return;
    }
    const response = await fetch("/api/mines", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "START_GAME",
        data: { gridSize, numberOfMines, betAmount },
      }),
    });
    const data = await response.json();
    if (data.error) {
      alert(data.error);
      return;
    }
    setGrid(data.grid);

    setGameStarted(true);
    setGameOver(false);
    setWin(false);
    setCashedOut(false);
    setWinAmount(0);
    setScore(0);
  };

  const handleCellClick = async (row: number, col: number) => {
    if (gameOver || win || !gameStarted || cashedOut) return;

    const response = await fetch("/api/mines", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "CLICK_CELL",
        data: {
          gameState: { grid, score, gameOver, win, winAmount, cashedOut },
          row,
          col,
          currentBet: betAmount,
          mineCount: numberOfMines,
        },
      }),
    });
    const newGameState = await response.json();
    setGrid(newGameState.grid);
    setScore(newGameState.score);
    setGameOver(newGameState.gameOver);
    setWin(newGameState.win);
    setWinAmount(newGameState.winAmount || 0);

    if (newGameState.gameOver) {
      playBlast();
      addTransaction(-betAmount);
    } else {
      playMineFound();
    }

    if (newGameState.win) {
      addTransaction(newGameState.winAmount);
    }
  };

  const cashOut = async () => {
    if (!gameStarted || gameOver || win || cashedOut) return;
    const response = await fetch("/api/mines", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "CASH_OUT",
        data: {
          currentGameState: {
            grid,
            score,
            gameOver,
            win,
            winAmount,
            cashedOut,
          },
          currentBetAmount: betAmount,
          numberOfMines,
        },
      }),
    });
    const data = await response.json();
    setWinAmount(data.winAmount);
    setCashedOut(true);
    setGameStarted(false);

    addTransaction(data.winAmount);
  };

  const addTransaction = (payout: number) => {
    const newTransaction: Transaction = {
      betAmount: betAmount,
      multiplier: calculateWinMultiplier(),
      payout: payout,
      timestamp: new Date(),
    };
    setTransactions((prevTransactions) => [
      newTransaction,
      ...prevTransactions.slice(0, 9),
    ]);
  };

  const calculateWinMultiplier = () => {
    const totalCells = gridSize * gridSize;
    const safeFields = totalCells - numberOfMines;
    return parseFloat((totalCells / safeFields).toFixed(2));
  };

  const renderCell = (cell: Cell) => {
    if (!cell.isRevealed) return null;
    return cell.isMine ? (
      <Image src="/bomb.png" width={48} height={48} alt="Mine" />
    ) : (
      <Image src="/gem.png" width={48} height={48} alt="Diamond" />
    );
  };

  const changeGridSize = (size: GridSize) => {
    setGridSize(size);
    setNumberOfMines(Math.min(numberOfMines, Math.floor((size * size) / 3)));
    restartGame();
  };

  const restartGame = () => {
    setGameStarted(false);
    setGameOver(false);
    setWin(false);
    setCashedOut(false);
    setWinAmount(0);
    setScore(0);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#19191D] p-4 gap-4">
      <div className="flex-grow lg:w-3/4 max-w-full">
        {/* <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-100 text-center">
          NEXA MINE
        </h1> */}
        <div className="flex flex-col h-full">
          <div className="bg-gray-900 p-4 rounded-lg mb-4">
            <div
              className="grid gap-1 aspect-square w-full max-w-[58vh] mx-auto"
              style={{
                gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
              }}
            >
              {grid.map((row, rowIndex) =>
                row.map((cell, colIndex) => (
                  <button
                    key={`${rowIndex}-${colIndex}`}
                    className={`aspect-square flex items-center justify-center border rounded transition-colors ${
                      cell.isRevealed
                        ? cell.isMine
                          ? "bg-red-900 border-red-700"
                          : "bg-green-900 border-green-700"
                        : "bg-gray-600 border-gray-500 hover:bg-gray-500"
                    } ${
                      !gameStarted || gameOver || win || cashedOut
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                    disabled={gameOver || win || !gameStarted || cashedOut}
                  >
                    {renderCell(cell)}
                  </button>
                ))
              )}
            </div>
          </div>
          <div className="flex justify-center space-x-2 mb-4">
            {[3, 5, 7, 9].map((size) => (
              <Button
                key={size}
                onClick={() => changeGridSize(size as GridSize)}
                disabled={gameStarted}
                className={`${
                  gridSize === size ? "bg-blue-600" : "bg-gray-600"
                } hover:bg-blue-700 text-gray-100`}
              >
                {size}x{size}
              </Button>
            ))}
          </div>
          {/* <div className="text-2xl font-medium text-gray-100 text-center mb-4">
            Score: {score}
          </div> */}

          {(gameOver || win) && (
            <div className="text-center p-4 border rounded-lg border-gray-600 mb-4">
              <p className="text-xl font-semibold mb-2 text-gray-100">
                {win
                  ? "Congratulations! You won!"
                  : "Game Over! You hit a mine!"}
              </p>
              <p className="text-lg mb-4 text-gray-300">
                {winAmount > 0
                  ? `You won $${winAmount.toFixed(2)}!`
                  : `You lost $${betAmount.toFixed(2)}`}
              </p>
              <Button
                onClick={restartGame}
                className="bg-blue-600 hover:bg-blue-700 text-gray-100 text-lg py-2 px-4"
              >
                Play Again
              </Button>
            </div>
          )}
          <div className="bg-gray-900 p-4 rounded-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              <div>
                <Label
                  htmlFor="betAmount"
                  className="text-sm font-medium text-gray-300 flex items-center gap-2"
                >
                  <CoinsIcon className="w-4 h-4 text-yellow-400" />
                  Bet Amount
                </Label>
                <Input
                  id="betAmount"
                  type="number"
                  value={betAmount}
                  onChange={(e) => setBetAmount(Number(e.target.value))}
                  disabled={gameStarted}
                  className="mt-1 bg-gray-700 text-gray-100 border-gray-600"
                />
              </div>
              <div>
                <Label
                  htmlFor="numberOfMines"
                  className="text-sm font-medium text-gray-300 flex items-center gap-2"
                >
                  <BombIcon className="w-4 h-4 text-red-400" />
                  Number of Mines
                </Label>
                <Input
                  id="numberOfMines"
                  type="number"
                  value={numberOfMines}
                  onChange={(e) =>
                    setNumberOfMines(
                      Math.min(
                        Number(e.target.value),
                        Math.floor((gridSize * gridSize) / 3)
                      )
                    )
                  }
                  disabled={gameStarted}
                  className="mt-1 bg-gray-700 text-gray-100 border-gray-600"
                />
              </div>
              <div className="flex items-end">
                <Button
                  onClick={startGame}
                  disabled={gameStarted}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-gray-100"
                >
                  Start Game
                </Button>
              </div>
            </div>
            <Button
              onClick={cashOut}
              disabled={!gameStarted || gameOver || win || cashedOut}
              className="w-full bg-green-600 hover:bg-green-700 text-gray-100 mb-4"
            >
              Cash Out
            </Button>
            {gameStarted && (
              <div className="p-2 bg-gray-700 rounded-lg border border-gray-600">
                <p className="font-medium text-gray-100">
                  Win Multiplier: {calculateWinMultiplier()}x
                </p>
              </div>
            )}
            {cashedOut && (
              <div className="p-2 bg-green-900 rounded-lg border border-green-700 mt-2">
                <p className="font-medium text-gray-100">
                  You cashed out ${winAmount.toFixed(2)}!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="lg:w-1/4 mt-4 lg:mt-0">
        <div className="bg-gray-900 p-4 rounded-lg overflow-y-auto max-h-[calc(100vh-2rem)]">
          <h2 className="text-xl font-semibold text-center mb-8 text-gray-100">
            Recent Transactions
          </h2>
          <div className=" text-center">
            <table className="w-full text-sm text-gray-300">
              <thead>
                <tr className="text-center">
                  <th className="pb-2">Bet</th>
                  <th className="pb-2">Multiplier</th>
                  <th className="pb-2">Payout</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => (
                  <tr key={index} className="border-t border-gray-600">
                    <td className="py-2">
                      ${transaction.betAmount.toFixed(2)}
                    </td>
                    <td className="py-2">
                      {transaction.multiplier.toFixed(2)}x
                    </td>
                    <td
                      className={`py-2 ${
                        transaction.payout >= 0
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      ${transaction.payout.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
