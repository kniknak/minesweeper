import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import classNames from "classnames";
import { CellState, GameState, MinesweeperState } from "../store/types";
import "./Cell.scss";

type CellProps = {
  id: number;
  onClick: (id: number) => void;
  onRightClick: (id: number) => void;
};

export const Cell: React.FC<CellProps> = React.memo(function ({ id, onClick, onRightClick }) {
  const hasMine = useSelector<MinesweeperState, boolean>((state) => state.mines[id]);
  const cellState = useSelector<MinesweeperState, CellState>((state) => state.cells[id]);
  const minesAroundCell = useSelector<MinesweeperState, number>((state) => state.minesAround[id]);

  /**
   * complex selectors are used to get rid of direct dependency on gameState to avoid unnecessary re-render for revealed cells
   */
  const cellRevealed = useSelector<MinesweeperState, boolean>(
    (state) => state.cells[id] === CellState.Revealed || (state.gameState === GameState.Failed && state.mines[id]),
  );
  const infoHidden = useSelector<MinesweeperState, boolean>(
    (state) => state.cells[id] === CellState.Default && state.gameState !== GameState.Failed,
  );

  const isFlagged = cellState === CellState.Flagged;
  const isRevealed = cellState === CellState.Revealed;

  const handleClick = useCallback<React.MouseEventHandler<HTMLDivElement>>(() => onClick(id), [id, onClick]);

  const handleRightClick = useCallback<React.MouseEventHandler<HTMLDivElement>>(
    (event) => {
      event.preventDefault();

      onRightClick(id);
    },
    [id, onRightClick],
  );

  return (
    <div
      id={String(id)}
      className={classNames(
        "cell",
        cellRevealed && "cellRevealed",
        isRevealed && hasMine && "cellThrown",
        isFlagged && "cellFlagged",
      )}
      onClick={handleClick}
      onContextMenu={handleRightClick}
    >
      <div
        className={classNames(
          "info",
          hasMine && "infoMine",
          infoHidden && "infoHidden",
          minesAroundCell && `infoMines${minesAroundCell}`,
        )}
      >
        {!hasMine && (minesAroundCell || "")}
      </div>
    </div>
  );
});
