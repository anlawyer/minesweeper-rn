import React from 'react';
import { StyleSheet, View } from 'react-native';
import GameBoard from './components/GameBoard';

const sampleGameBoardParams = { cols: 5, rows: 4, bombs: 3 };

export default function App() {
  return (
    <View style={styles.container}>
      <GameBoard params={sampleGameBoardParams} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
