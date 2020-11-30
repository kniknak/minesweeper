import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CellState, GameState, MinesweeperState } from "./types";
import { Queue } from "./Queue";
import { getCellsAround } from "./getCellsAround";

const initialState: MinesweeperState = {
  width: 30,
  height: 16,
  minesCount: 99,
  gameState: GameState.Default,
  cells: [],
  mines: [],
  minesAround: [],
};

export const minesweeper = createSlice({
  name: "counter",
  initialState,
  reducers: {
    /**
     * sets field size & mines count
     */
    setSetting: (state, action: PayloadAction<{ field: "width" | "height" | "minesCount"; value: number }>) => {
      if (action.payload.field === "minesCount") {
        state[action.payload.field] = Math.max(action.payload.value, 1) || 1;
      } else {
        state[action.payload.field] = Math.max(action.payload.value, 2) || 2;
      }

      state.minesCount = Math.min(state.minesCount, state.width * state.height - 1);
    },
    /**
     * resets the game
     */
    resetGame: (state) => {
      state.gameState = GameState.Default;
      state.cells = [];
      state.mines = [];
      state.minesAround = [];
    },
    /**
     * starts the game from the given cell and places mines
     *
     * 1st cell is always safe to open
     */
    startGame: (state, action: PayloadAction<number>) => {
      console.time("start");

      const emptyArray = Array.from(Array(state.width * state.height));

      const mines = [...emptyArray].fill(false);

      const minesIndexes: number[] = [];

      while (minesIndexes.length < state.minesCount) {
        let mineIndex = action.payload;

        while (mineIndex === action.payload || minesIndexes.includes(mineIndex)) {
          mineIndex = Math.floor(Math.random() * state.width * state.height);
        }

        minesIndexes.push(mineIndex);
      }

      minesIndexes.forEach((id) => (mines[id] = true));

      state.mines = mines;
      state.cells = [...emptyArray].fill(CellState.Default);
      state.minesAround = [...emptyArray]
        .fill(0)
        .map((_, index) => getCellsAround(index, state.width, state.height).filter((id) => mines[id]).length);
      state.gameState = GameState.Started;

      console.timeEnd("start");
    },
    /**
     * adds or removes flag from the field
     */
    toggleFlag: (state, action: PayloadAction<number>) => {
      if (state.cells[action.payload] !== CellState.Revealed) {
        if (state.cells[action.payload] === CellState.Default) {
          if (state.cells.filter((cellState) => cellState === CellState.Flagged).length < state.minesCount) {
            state.cells[action.payload] = CellState.Flagged;
          }
        } else {
          state.cells[action.payload] = CellState.Default;
        }
      }
    },
    /**
     * checks the cell state
     *
     * recursively opens the nearest cells
     */
    revealCell: (state, action: PayloadAction<number>) => {
      console.time("revealCell");

      if (state.mines[action.payload]) {
        state.cells[action.payload] = CellState.Revealed;
        state.gameState = GameState.Failed;
      } else {
        const queue = new Queue();
        queue.push(action.payload);

        while (queue.size) {
          const id: number = queue.pop();

          state.cells[id] = CellState.Revealed;

          if (!state.minesAround[id]) {
            getCellsAround(id, state.width, state.height)
              .filter((id) => state.cells[id] === CellState.Default)
              .filter((id) => !queue.has(id))
              .forEach((id) => queue.push(id));
          }
        }
      }

      const hasSucceeded = state.cells.every((cellState, index) =>
        state.mines[index] ? cellState !== CellState.Revealed : cellState === CellState.Revealed,
      );

      if (hasSucceeded) {
        state.gameState = GameState.Succeeded;
      }

      console.timeEnd("revealCell");
    },
  },
});

export const store = configureStore({
  reducer: minesweeper.reducer,
});

export type AppDispatch = typeof store.dispatch;
