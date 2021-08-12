import React, { useEffect, useState, useCallback } from "react";
import Tile from "./Tile";
import { StyleSheet, View } from "react-native";

interface GameBoardProps {
  params: any;
}

const Row = ({ row }: { row: any[] }) => (
  <View style={styles.row}>
    {row.map((col: any, index: number) => {
      return <Tile open content={col.content} key={`col-${index}`} />;
    })}
  </View>
);

const defaultTile = {
  content: 0,
  neighbors: [],
};

const getTile = (array: any[][], rowIndex: number, colIndex: number) => {
  // NOTE: inspired by https://kozmicluis.com/adjacent-cells-of-a-matrix/
  let value, hasValue;
  try {
    hasValue = array[rowIndex][colIndex] !== undefined;
    value = hasValue ? array[rowIndex][colIndex] : null;
  } catch (e) {
    value = null;
  }

  return value;
};

const setTileContent = (
  tile: any,
  { content, neighbors }: { content?: any; neighbors?: any }
) => {
  return { ...tile, content, neighbors };
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
        const updatedTile = setTileContent(selectedTile, {
          content: "bomb",
          neighbors: selectedTile.neighbors,
        });
        board[randomRowIndex][randomColIndex] = updatedTile;

        bombsRemaining -= 1;
      }
    }
  }, []);

  const generateTilesNeighbors = (r: number, c: number) => {
    const neighbors = {
      up: getTile(board, r - 1, c),
      upRight: getTile(board, r - 1, c + 1),
      right: getTile(board, r, c + 1),
      downRight: getTile(board, r + 1, c + 1),
      down: getTile(board, r + 1, c),
      downLeft: getTile(board, r + 1, c - 1),
      left: getTile(board, r, c - 1),
      upLeft: getTile(board, r - 1, c - 1),
    };
    const tile = getTile(board, r, c);
    const updatedTile = setTileContent(tile, {
      content: tile.content,
      neighbors,
    });
    return updatedTile;
  };

  const setAllNeighbors = () => {
    board.forEach((row, rIndex) => {
      row.forEach((col, cIndex) => {
        generateTilesNeighbors(rIndex, cIndex);
      });
    });
  };

  // Call function to put bombs in random tiles, if game board is ready
  useEffect(() => {
    if (board.length === params.rows && !bombsPlaced) {
      placeBombs(params.bombs);
      setBombsPlaced(true);
      setAllNeighbors();
    }
  }, [board.length]);

  return (
    <View>
      {board.map((row, index) => (
        <Row row={row} key={`row-${index}`} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    display: "flex",
    flexDirection: "row",
  },
});
