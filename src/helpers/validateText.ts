import { GameSquareType } from "../providers/GameContext";

export function validateText(word: string, input: string[]) {
  const results: GameSquareType[] = [
    GameSquareType.Clear,
    GameSquareType.Clear,
    GameSquareType.Clear,
    GameSquareType.Clear,
    GameSquareType.Clear,
  ];

  input.forEach((w, i) => {
    w = w.trim();

    if (word[i] == w) results[i] = GameSquareType.Correct;
  });

  input.forEach((w, i) => {
    w = w.trim();

    if (results[i] == GameSquareType.Correct) return;

    if (word[i] != w && word.includes(w)) results[i] = GameSquareType.Partial;
  });

  input.forEach((w, i) => {
    if (results[i] == GameSquareType.Clear) results[i] = GameSquareType.Filled;
  });

  return results;
}

function getLetterIndex(string: string, character: string, cantbe: number[]) {
  let r = -1;

  string.split("").forEach((s, i) => {
    if (s == character && !cantbe.includes(i) && r == -1) r = i;
  });

  return r;
}

function getLetterIndexes(string: string, character: string, cantbe: number[]) {
  let r: number[] = [];

  string.split("").forEach((s, i) => {
    if (s == character && !cantbe.includes(i)) r.push(i);
  });

  return r;
}

function getValidatedIndexes(results: GameSquareType[]) {
  let r: number[] = [];

  results.forEach((s, i) => {
    if (results[i] == GameSquareType.Correct) r.push(i);
  });

  return r;
}
