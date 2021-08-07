import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface TileProps {
    open: boolean;
    content: number | 'bomb';
}

export default function Tile({ open, content }: TileProps) {
    const handlePress = () => {
        if (open) return;
    }
    return (
        <TouchableOpacity style={styles.tile} onPress={handlePress}>
            <Text>{open ? content : <React.Fragment />}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    tile: {
      borderColor: '#888',
      borderWidth: 1,
      height: 45,
      width: 45,
    },
  });
  