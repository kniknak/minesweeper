import React from "react";
import "./App.scss";
import { Field } from "./Field/Field";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, minesweeper } from "./store/store";
import { Settings } from "./Settings/Settings";
import { GameState, MinesweeperState } from "./store/types";

const gameStateToSmile = {
  [GameState.Default]: "🙂",
  [GameState.Started]: "🙂",
  [GameState.Failed]: "😵",
  [GameState.Succeeded]: "😎",
};

export const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const gameState = useSelector<MinesweeperState, GameState>((state) => state.gameState);

  return (
    <div className="app">
      <Settings />
      <div className="face" data-test="face" onClick={() => dispatch(minesweeper.actions.resetGame())}>
        {gameStateToSmile[gameState]}
      </div>
      <Field />
    </div>
  );
};
