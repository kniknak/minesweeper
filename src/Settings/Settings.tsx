import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, minesweeper } from "../store/store";
import { MinesweeperState } from "../store/types";
import "./Settings.scss";

export const Settings: React.FC = React.memo(function Settings() {
  const dispatch = useDispatch<AppDispatch>();

  const width = useSelector<MinesweeperState, number>((state) => state.width);
  const height = useSelector<MinesweeperState, number>((state) => state.height);
  const minesCount = useSelector<MinesweeperState, number>((state) => state.minesCount);

  const setSetting = (field: "width" | "height" | "minesCount"): React.ChangeEventHandler<HTMLInputElement> => (
    event,
  ) => {
    dispatch((dispatch) => {
      dispatch(minesweeper.actions.setSetting({ field, value: parseInt(event.target.value) }));
      dispatch(minesweeper.actions.resetGame());
    });
  };

  return (
    <div className="settings">
      <label htmlFor="width" className="label">
        Field width:
        <input
          id="width"
          className="input"
          name="name"
          type="number"
          min="2"
          step="1"
          value={width}
          onChange={setSetting("width")}
        />
      </label>
      <label htmlFor="height" className="label">
        Field height:
        <input
          id="height"
          className="input"
          name="name"
          type="number"
          min="2"
          step="1"
          value={height}
          onChange={setSetting("height")}
        />
      </label>
      <label htmlFor="minesCount" className="label">
        Field minesCount:
        <input
          id="minesCount"
          className="input"
          name="name"
          type="number"
          min="1"
          step="1"
          max={width * height - 1}
          value={minesCount}
          onChange={setSetting("minesCount")}
        />
      </label>
    </div>
  );
});
