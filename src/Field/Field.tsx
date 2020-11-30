import React, { useCallback } from "react";
import { AppDispatch, minesweeper } from "../store/store";
import { Cell } from "./Cell";
import { useDispatch, useSelector } from "react-redux";
import { CellState, GameState, MinesweeperState } from "../store/types";
import "./Field.scss";

export const Field: React.FC = React.memo(function Field() {
  const width = useSelector<MinesweeperState, number>((state) => state.width);
  const height = useSelector<MinesweeperState, number>((state) => state.height);
  const dispatch = useDispatch<AppDispatch>();

  const revealCell = useCallback(
    (id: number) => {
      dispatch((dispatch, getState) => {
        if (getState().gameState === GameState.Default) {
          dispatch(minesweeper.actions.startGame(id));
        }

        if (getState().gameState === GameState.Started) {
          const cellState = getState().cells[id];
          const isHidden = cellState === CellState.Default;

          if (isHidden) {
            dispatch(minesweeper.actions.revealCell(id));
          }
        }
      });
    },
    [dispatch],
  );

  const placeFlag = useCallback(
    (id: number) => {
      dispatch((dispatch, getState) => {
        if (getState().gameState === GameState.Started) {
          dispatch(minesweeper.actions.toggleFlag(id));
        }
      });
    },
    [dispatch],
  );

  console.log("render field");

  return (
    <div className="field" style={{ gridTemplateColumns: `repeat(${width}, 30px)`, width: width * 30 }}>
      {Array.from(Array(width * height)).map((_, id) => (
        <Cell key={id} id={id} onClick={revealCell} onRightClick={placeFlag} />
      ))}
    </div>
  );
});
