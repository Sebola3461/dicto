import { GameSquareType } from "../providers/GameContext";

/**
  Clear = 0,
  Filled = 1,
  Wrong = 2,
  Partial = 3,
  Correct = 4,
 */

export function getStatusClass(status: GameSquareType) {
    const list = ["clear", "filled", "wrong", "partial", "correct"];

    return list[status]
}