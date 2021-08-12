import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface TileProps {
  open: boolean;
  content: number | "bomb";
  onPress: () => void;
}

export default function Tile({ open, content, onPress }: TileProps) {
  return (
    <TouchableOpacity
      style={open ? { ...styles.tile, ...styles.tileOpen } : styles.tile}
      onPress={onPress}
    >
      <Text style={styles.content}>{open ? content : <React.Fragment />}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tile: {
    borderColor: "#888",
    borderWidth: 1,
    height: 65,
    width: 65,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e2e2e2",
  },
  tileOpen: {
    backgroundColor: "#c4c4c4",
  },
  content: {
    fontSize: 24,
  },
});
