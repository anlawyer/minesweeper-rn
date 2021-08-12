import React, { useEffect, useState, useCallback } from "react";
import Row from "./Row";
import { View } from "react-native";
import { setAllNeighbors, getTile, setTile } from "./helpers";

interface GameBoardProps {
  params: any;
}

const defaultTile = {
  open: false,
  content: 0,
  neighbors: [],
};

export default function GameBoard({ params }: GameBoardProps) {
  const [board, setBoard] = useState([] as any[][]);
  const [bombsPlaced, setBombsPlaced] = useState(false);

  // Generate empty game board: fill rows, columns with empty tiles
  useEffect(() => {
    if (board.length === params.rows) return;
    for (let i = 0; i < params.rows; i++) {
      let row = Array(params.cols);
      row.fill(defaultTile);
      board.push(row);
    }
    setBoard(board);
  }, []);

  const placeBombs = useCallback((numBombs: number) => {
    let bombsRemaining = numBombs;
    while (bombsRemaining > 0) {
      const randomColIndex = Math.floor(Math.random() * params.cols);
      const randomRowIndex = Math.floor(Math.random() * params.rows);
      let selectedTile = getTile(board, randomRowIndex, randomColIndex);
      if (selectedTile.content !== "bomb") {
        const updatedTile = setTile(selectedTile, {
          open: false,
          content: "bomb",
          neighbors: selectedTile.neighbors,
        });
        board[randomRowIndex][randomColIndex] = updatedTile;

        bombsRemaining -= 1;
      }
    }
  }, []);

  // Call function to put bombs in random tiles, if game board is ready
  useEffect(() => {
    if (board.length === params.rows && !bombsPlaced) {
      placeBombs(params.bombs);
      setBombsPlaced(true);
      setAllNeighbors(board);
    }
  }, [board.length]);

  return (
    <View>
      {board.map((row, index) => (
        <Row
          row={row}
          key={`row-${index}`}
          rowIndex={index}
          board={board}
          setBoard={setBoard}
        />
      ))}
    </View>
  );
}
