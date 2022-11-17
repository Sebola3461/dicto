import React, { createContext, useState, FC, useEffect } from "react";
import { IGameSquareCompact } from "../components/Table/Row";
import { getWord } from "../data/words";

export enum GameSquareType {
  Clear = 0,
  Filled = 1,
  Wrong = 2,
  Partial = 3,
  Correct = 4,
}

export enum GameKeyboardKeyStatus {
  Neutral = 0,
  Has = 1,
  NotIncluded = 2,
  Partial = 3,
}

export interface IGameKeyboardKeyStatus {
  key: string;
  status: GameKeyboardKeyStatus;
}

export interface IGameSquare {
  row: number;
  index: number;
  character: string;
  type: GameSquareType;
  ref: null | React.MutableRefObject<any>;
}

export interface IGameContext {
  failed: boolean;
  word: string;
  ended: boolean;
  keyboard: IGameKeyboardKeyStatus[];
  changeKeyboardKeyStatus: (key: string, v: GameKeyboardKeyStatus) => any;
  setFailed: (v: boolean) => any;
  setEnded: (v: boolean) => any;
  setWord: (v: string) => any;
}

export const GameContext = createContext<IGameContext>({
  failed: false,
  ended: false,
  setFailed: (v: boolean) => void {},
  word: "teste",
  keyboard: [],
  changeKeyboardKeyStatus: (key: string, v: GameKeyboardKeyStatus) => void {},
  setEnded: (v: boolean) => void {},
  setWord: (v: string) => void {},
});

const GameProvider = ({ children }: any) => {
  const [ended, setEnded] = useState(false);
  const [word, setWord] = useState(getWord().latim);
  const [failed, setFailed] = useState(false);
  const [keyboard, setKeyboard] = useState<IGameKeyboardKeyStatus[]>([]);

  function changeKeyboardKeyStatus(key: string, v: GameKeyboardKeyStatus) {
    if (!keyboard.find((k) => k.key == key)) {
      keyboard.push({ key, status: v });

      return setKeyboard(Object.create(keyboard));
    } else {
      const index = keyboard.findIndex((k) => k.key == key);

      console.log(keyboard);

      if (index != -1) {
        keyboard[index].status = v;
      }

      return setKeyboard(Object.create(keyboard));
    }
  }

  return (
    <GameContext.Provider
      value={{
        failed,
        ended,
        word,
        keyboard,
        changeKeyboardKeyStatus,
        setFailed,
        setEnded,
        setWord,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
