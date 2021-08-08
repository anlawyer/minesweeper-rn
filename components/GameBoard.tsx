import React, { useEffect, useState } from "react";
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
  useEffect(() => {
    if (board.length === params.rows) return;
    for (let i = 0; i < params.rows; i++) {
      let row = Array(params.cols);
      row.fill(0);
      board.push(row);
    }
    setBoard(board);
  }, []);

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
