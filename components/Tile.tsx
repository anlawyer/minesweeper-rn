import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface TileProps {
  open: boolean;
  content: number | "bomb";
}

export default function Tile({ open, content }: TileProps) {
  const handlePress = () => {
    if (open) return;
  };
  return (
    <TouchableOpacity
      style={open ? { ...styles.tile, ...styles.tileOpen } : styles.tile}
      onPress={handlePress}
    >
      <Text style={styles.content}>{open ? content : <React.Fragment />}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tile: {
    borderColor: "#888",
    borderWidth: 1,
    height: 45,
    width: 45,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e2e2e2",
  },
  tileOpen: {
    backgroundColor: "#c4c4c4",
  },
  content: {
    fontSize: 22,
  },
});
