import React, {
  createContext,
  useState,
  FC,
  useEffect,
  useContext,
} from "react";
import { IGameSquareCompact } from "../components/Table/Row";
import { getWordPT, validWord } from "../data/words";
import { GenerateComponentKey } from "../helpers/GenerateComponentKey";
import { isKeyValid } from "../helpers/isKeyValid";
import { validateText } from "../helpers/validateText";
import {
  GameContext,
  GameKeyboardKeyStatus,
  GameSquareType,
} from "./GameContext";

export namespace Game {
  export interface Row {
    unlocked: boolean;
    squares: IGameSquareCompact[];
  }
}

export interface IRowsContext {
  selectedRow: number;
  selectedSquare: number;
  rows: Game.Row[];
  selectRow: (v: number) => any;
  selectSquare: (v: number) => any;
  focusNextSquare: () => any;
  validateRow: (v: number) => any;
  focusPreviousSquare: () => any;
  unlockRow: (v: number) => any;
  getCurrentSquare: () => IGameSquareCompact;
  getSquare: (row: number, square: number) => IGameSquareCompact;
  changeSquareCharacter: (character: string) => any;
  changeSquareState: (
    state: GameSquareType,
    row: number,
    square: number
  ) => any;
}

export const RowsContext = createContext<IRowsContext>({
  selectedRow: -1,
  selectedSquare: -1,
  rows: [],
  selectRow: (v: number) => void {},
  selectSquare: (v: number) => void {},
  unlockRow: (v: number) => void {},
  validateRow: (v: number) => void {},
  focusNextSquare: () => void {},
  focusPreviousSquare: () => void {},
  getCurrentSquare: () => {
    const p: any = undefined;

    return p;
  },
  getSquare: (row: number, square: number) => {
    const p: any = undefined;

    return p;
  },
  changeSquareCharacter: (character: string) => void {},
  changeSquareState: (state: GameSquareType, row: number, square: number) =>
    void {},
});

const RowsProvider = ({ children }: any) => {
  const [selectedRow, selectRow] = useState(-1);
  const [selectedSquare, selectSquare] = useState(-1);
  const [rows, setRows] = useState(generateRows());
  const game = useContext(GameContext);

  function generateRows() {
    const r: Game.Row[] = [];

    for (let i = 0; i < 6; i++) {
      r.push({
        unlocked: false,
        squares: generateSquares(),
      });
    }

    function generateSquares() {
      const s = [];

      for (let i = 0; i < 5; i++) {
        s.push({
          ref: null,
          text: null,
          id: GenerateComponentKey(10),
          state: GameSquareType.Clear,
        });
      }

      return s;
    }

    return r;
  }

  function unlockRow(row: number) {
    if (row > 5) return;
    rows[row].unlocked = true;

    setRows(Object.create(rows));
  }

  function changeSquareCharacter(
    character: string,
    row?: number,
    square?: number
  ) {
    rows[row || selectedRow].squares[square || selectedSquare].text = character;

    setRows(Object.create(rows));
  }

  function getCurrentSquare() {
    return rows[selectedRow].squares[selectedSquare];
  }

  function getSquare(row: number, square: number) {
    return rows[row].squares[square];
  }

  function changeSquareState(
    state: GameSquareType,
    row: number,
    square: number
  ) {
    rows[row].squares[square].state = state;

    setRows(Object.create(rows));
  }

  function focusNextSquare() {
    const rowSquares = rows[selectedRow].squares;

    if (selectedSquare == 4) return;

    selectSquare(selectedSquare + 1);
    const nextSquare = rowSquares[selectedSquare + 1];

    const element = document.getElementById(nextSquare.id);

    if (element) element.focus();
  }

  function focusPreviousSquare() {
    const rowSquares = rows[selectedRow].squares;

    if (selectedSquare == 0) return;

    selectSquare(selectedSquare - 1);
    const previousSquare = rowSquares[selectedSquare - 1];

    const element = document.getElementById(previousSquare.id);

    if (element) element.focus();
  }

  function focusCurrentSquare() {
    const rowSquares = rows[selectedRow].squares;

    const square = rowSquares[selectedSquare];

    const element = document.getElementById(square.id);

    if (element) element.focus();
  }

  function validateRow(rowIndex: number) {
    if (
      rows[rowIndex].squares.filter((s) => s.state == GameSquareType.Clear)
        .length != 5
    )
      return invalidateRow();

    let inputedText: string[] = [];
    let canValidate = true;

    // ? Parse text
    rows[rowIndex].squares.forEach((i) => {
      if (!i.text) return (canValidate = false);
      inputedText.push(i.text);
    });

    if (!validWord(inputedText.join(""))) return invalidateRow();

    if (!canValidate) return invalidateRow();

    validateText(game.word, inputedText).forEach((v, i) => {
      changeSquareState(v, rowIndex, i);

      function transformStatus(status: GameSquareType) {
        if (status == GameSquareType.Correct) return GameKeyboardKeyStatus.Has;

        if (status == GameSquareType.Partial)
          return GameKeyboardKeyStatus.Partial;

        if (status == GameSquareType.Filled)
          return GameKeyboardKeyStatus.NotIncluded;

        return GameKeyboardKeyStatus.NotIncluded;
      }

      game.changeKeyboardKeyStatus(inputedText[i], transformStatus(v));
    });

    rows[rowIndex].squares.forEach((s, i) => {
      changeSquareCharacter(getWordPT(inputedText.join(""))[i], rowIndex, i);
    });

    function invalidateRow() {
      const rows = document.querySelectorAll(".table_row");
      const row = rows[selectedRow];

      row.className = "table_row invalid";

      setTimeout(() => {
        row.className = "table_row";
        focusCurrentSquare();
      }, 1040);
    }

    if (
      rows[rowIndex].squares.filter((s) => s.state == GameSquareType.Correct)
        .length == 5
    ) {
      return game.setEnded(true);
    } else {
      unlockRow(rows.filter((r) => r.unlocked).length + 1);
    }

    if (
      rows[rowIndex].squares.filter((s) => s.state == GameSquareType.Correct)
        .length != 5 &&
      rowIndex == 5
    ) {
      game.setEnded(true);
      game.setFailed(true);
    }
  }

  return (
    <RowsContext.Provider
      value={{
        selectedRow,
        selectedSquare,
        rows,
        validateRow,
        getSquare,
        focusNextSquare,
        focusPreviousSquare,
        getCurrentSquare,
        changeSquareState,
        changeSquareCharacter,
        selectRow,
        selectSquare,
        unlockRow,
      }}
    >
      {children}
    </RowsContext.Provider>
  );
};

export default RowsProvider;
