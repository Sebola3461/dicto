import { Ref, useContext, useEffect, useRef, useState } from "react";
import { GenerateComponentKey } from "../../helpers/GenerateComponentKey";
import { validateText } from "../../helpers/validateText";
import { GameContext, GameSquareType } from "../../providers/GameContext";
import { RowsContext } from "../../providers/RowsContext";
import "./../../styles/components/Table/Row.scss";
import { Square } from "./Square";

export interface IGameSquareCompact {
  text: string | null;
  ref: React.RefObject<HTMLElement> | null;
  id: string;
  state: GameSquareType;
}

export function Row({ index }: { index: number }) {
  const game = useContext(GameContext);
  const table = useContext(RowsContext);

  const getSquares = () => {
    const row = table.rows[index];

    if (!row) return <></>;

    if (!row.squares) return <></>;

    return row.squares.map((s, i) => (
      <Square
        index={i}
        row={index}
        id={s.id}
        key={s.id}
        validate={console.log}
      />
    ));
  };

  return (
    <div
      className={
        table.rows.filter((r) => r.unlocked).length >= index
          ? "table_row"
          : "table_row locked"
      }
    >
      {getSquares()}
    </div>
  );
}
