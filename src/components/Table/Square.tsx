import React, { useContext, useEffect, useRef, useState } from "react";
import { GenerateComponentKey } from "../../helpers/GenerateComponentKey";
import { getStatusClass } from "../../helpers/getStatusClass";
import { isKeyValid } from "../../helpers/isKeyValid";
import { validateText } from "../../helpers/validateText";
import { GameContext, GameSquareType } from "../../providers/GameContext";
import { RowsContext } from "../../providers/RowsContext";
import { IGameSquareCompact } from "./Row";

export function Square({
  row,
  index,
  id,
  validate,
}: {
  row: number;
  index: number;
  id: string;
  validate: (...any: any) => any;
}) {
  const [character, setCharacter] = useState("");
  const ref = useRef<any>(null);
  const table = useContext(RowsContext);

  // useEffect(() => {
  //   setState(data[index].state);
  // }, [data]);

  function handleSquareText(ev: any) {
    if (![GameSquareType.Clear].includes(table.getCurrentSquare().state))
      return;

    if (index != table.selectedSquare || row != table.selectedRow) return;

    const text: string = ev.key;

    if (text == "Backspace") return clearSquare();
    if (text == "Enter") {
      ref.current.blur();
      return table.validateRow(row);
    }

    function clearSquare() {
      table.changeSquareCharacter("");
      table.focusPreviousSquare();
    }

    if (!isKeyValid(text)) return;
    table.changeSquareCharacter(text);

    table.focusNextSquare();
  }

  const isSelected = () => {
    if (table.selectedSquare == index && table.selectedRow == row)
      return "selected";

    return "";
  };

  if (!table.rows[row]) return <></>;

  return (
    <div
      className={`text_square ${getStatusClass(
        table.getSquare(row, index).state
      )} ${isSelected()}`}
      tabIndex={index}
      onKeyDown={(ev) => {
        handleSquareText(ev);
      }}
      ref={ref}
      onClick={() => {
        table.selectRow(row);
        table.selectSquare(index);
      }}
      onFocus={() => {
        table.selectRow(row);
        table.selectSquare(index);
      }}
      id={id}
    >
      {table.rows[row].squares[index].text}
    </div>
  );
}
