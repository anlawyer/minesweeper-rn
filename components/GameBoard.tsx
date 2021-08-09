import React, { useEffect, useState, useCallback } from "react";
import Tile from "./Tile";
import { StyleSheet, View } from "react-native";

interface GameBoardProps {
  params: any;
}

const Row = ({ row }: { row: any[] }) => (
  <View style={styles.row}>
    {row.map((col: number, index: number) => {
      return <Tile open={false} content={col} key={`col-${index}`} />;
    })}
  </View>
);

export default function GameBoard({ params }: GameBoardProps) {
  const [board, setBoard] = useState([] as any[][]);
  const [bombsPlaced, setBombsPlaced] = useState(false);
  useEffect(() => {
    if (board.length === params.rows) return;
    for (let i = 0; i < params.rows; i++) {
      let row = Array(params.cols);
      row.fill(0);
      board.push(row);
    }
    setBoard(board);
  }, []);

  const placeBombs = useCallback((numBombs: number) => {
    let bombsRemaining = numBombs;

    while (bombsRemaining > 0) {
      const randomColIndex = Math.floor(Math.random() * params.cols);
      const randomRowIndex = Math.floor(Math.random() * params.rows);
      let selectedTile = board[randomRowIndex][randomColIndex];
      if (selectedTile !== "bomb") {
        const selectedRow = board[randomRowIndex];
        selectedRow.splice(randomColIndex, 1, "bomb");
        board.splice(randomRowIndex, 1, selectedRow);
        bombsRemaining -= 1;
      }
    }
  }, []);

  useEffect(() => {
    if (board.length === params.rows && !bombsPlaced) {
      placeBombs(params.bombs);
      setBombsPlaced(true);
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
