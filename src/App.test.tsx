import React, { Dispatch } from "react";
import { shallow } from "enzyme";
import { useSelector } from "react-redux";
import { minesweeper } from "./store/store";
import { App } from "./App";
import { GameState } from "./store/types";

jest.mock("react-redux", () => ({
  useDispatch: () => (...args: any[]) => args,
  useSelector: jest.fn(),
}));

jest.mock("react", () => ({
  ...jest.requireActual<typeof import("react")>("react"),
  memo: (Component: React.FC<Record<string, any>>) => Component,
}));

jest.mock("./store/store", () => ({
  minesweeper: {
    actions: {
      resetGame: jest.fn(),
    },
  },
}));

const useSelectorMock = useSelector as jest.Mock<GameState>;

describe("App", () => {
  beforeEach(() => {
    useSelectorMock.mockReset();
  });

  it("renders", () => {
    useSelectorMock.mockReturnValue(GameState.Default);

    const subject = shallow(<App />);

    expect(subject).toMatchSnapshot();
  });

  it("resets game", () => {
    useSelectorMock.mockReturnValue(GameState.Default);

    const subject = shallow(<App />);

    subject.find('[data-test="face"]').prop("onClick")!({} as any);

    expect(minesweeper.actions.resetGame).toHaveBeenCalled();
  });
});
