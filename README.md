# Minesweeper with React Native

### TODOs

- [ ] Calculate/determine non-bomb tiles' content
  - [x] For each tile, generate ~~coordinates~~ array of neighbors
    - [x] A given tile's "neighbor" is any [row, column] pair that the tile touches top, bottom, left, right and diagonally (hard coded for now)
  - [ ] For each neighbor, check if bomb type --> total number of neighboring bomb tiles == tile's content/number
  - [x] If no bomb neighbors, tile's content/number = 0
- [ ] Handle game play
  - [x] On click of tile, determine action based on tile's ~~type~~ content
    - [x] Set tile to open, if not already
    - [x] If tile type is 'bomb', game over (loss)
    - [ ] If tile type is a number !== 0, display number
    - [ ] If tile type is number === 0, open neighboring tiles up to and not including the closest bombs
  - [ ] If all tiles !== 'bomb's are open, game over (win)
  - [x] If game over (win or loss), show button to start over
  - [ ] generate fresh game board
