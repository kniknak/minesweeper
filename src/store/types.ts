/**
 * cell status
 */
export enum CellState {
  /**
   * not yet checked
   */
  Default = 1,
  /**
   * checked
   */
  Revealed,
  Flagged,
}

/**
 * game status
 */
export enum GameState {
  /**
   * initial/not yet started
   */
  Default = 1,
  Started,
  Failed,
  Succeeded,
}

/**
 * store state
 */
export type MinesweeperState = {
  /**
   * field width
   */
  width: number;
  /**
   * field height
   */
  height: number;
  /**
   * mines count on the field
   */
  minesCount: number;
  /**
   * current game state
   */
  gameState: GameState;
  /**
   * state state in the current game
   */
  cells: CellState[];
  /**
   * placed mines in the current game
   */
  mines: boolean[];
  /**
   * number of mines around for each cell
   */
  minesAround: number[];
};
