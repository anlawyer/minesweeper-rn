import React from "react";
import { Alert, StyleSheet, View } from "react-native";
import Tile from "./Tile";

interface RowProps {
  board: any;
  setBoard: any;
  row: any[];
  rowIndex: number;
}

const Row: React.FC<RowProps> = ({ row, rowIndex, board, setBoard }) => {
  const gameOverAlert = () => {
    Alert.alert("Game Over!", "A mine exploded :(", [
      { text: "Start over", onPress: () => setBoard([[]]) },
    ]);
  };

  const handleTilePress = (col: any, colIndex: number) => {
    if (col.open) return;
    if (col.content === "bomb") gameOverAlert();
    const updatedRow = [
      ...row.slice(0, colIndex),
      { ...col, open: true },
      ...row.slice(colIndex + 1),
    ];
    const updatedBoard = [
      ...board.slice(0, rowIndex),
      updatedRow,
      ...board.slice(rowIndex + 1),
    ];
    setBoard(updatedBoard);
  };

  return (
    <View style={styles.row}>
      {row.map((col: any, index: number) => {
        return (
          <Tile
            onPress={() => handleTilePress(col, index)}
            open={col.open}
            content={col.content}
            key={`col-${index}`}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    display: "flex",
    flexDirection: "row",
  },
});

export default Row;
