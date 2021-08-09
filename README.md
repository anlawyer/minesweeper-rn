# Minesweeper with React Native

### TODOs

- [ ] Make sure game generates on app load (first with static sample data, then possibly with user's input)
- [ ] Calculate/determine non-bomb tiles' content
  - [ ] For each tile, generate coordinates of neighbors
    - [ ] A given tile's "neighbor" is any [row, column] pair that the tile touches top, bottom, left, right and diagonally
  - [ ] For each neighbor, check if bomb type --> total number of neighboring bomb tiles == tile's content/number
  - [ ] If no bomb neighbors, tile's content/number = 0
- [ ] Handle game play
  - [ ] On click of tile, determine action based on tile's type
    - [ ] Set tile to open, if not already
    - [ ] If tile type is 'bomb', game over (loss)
    - [ ] If tile type is a number !== 0, display number
    - [ ] If tile type is number === 0, open neighboring tiles up to and not including the closest bombs
  - [ ] If all tiles !== 'bomb's are open, game over (win)
  - [ ] If game over (win or loss), show button to start over and generate fresh game board
- [ ] UI updates
  - [ ] Improve tile style
