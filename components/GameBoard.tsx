import React, { useEffect, useState } from 'react';
import Tile from './Tile';
import { StyleSheet, View } from 'react-native';

interface GameBoardProps {
    params: any;
}

export default function GameBoard({ params }: GameBoardProps) {
    const [board, setBoard] = useState([] as any[]);
    useEffect(() => {
        for(let i = 0; i < params.rows; i++) {
            let row = Array(params.cols);
            row.fill(0);
            board.push(row);
        }
        setBoard(board);
    }, [params]);

    return (
      <View>
        {board.map(row => row.map((col: number) => <Tile open={false} content={col} />))}
      </View>
    );
  }
  
  const styles = StyleSheet.create({});
  
