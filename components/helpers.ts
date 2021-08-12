export const getTile = (array: any[][], rowIndex: number, colIndex: number) => {
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

export const setTile = (
  tile: any,
  {
    open,
    content,
    neighbors,
  }: { open?: boolean; content?: any; neighbors?: any }
) => {
  return { ...tile, open, content, neighbors };
};

const generateTilesNeighbors = (board: any[][], r: number, c: number) => {
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
  const updatedTile = setTile(tile, {
    content: tile.content,
    neighbors,
  });
  return updatedTile;
};

export const setAllNeighbors = (board: any[][]) => {
  board.forEach((row, rIndex) => {
    row.forEach((col, cIndex) => {
      generateTilesNeighbors(board, rIndex, cIndex);
    });
  });
};
