import { Component, useContext } from "react";
import { getWordPT } from "../../data/words";
import { GenerateComponentKey } from "../../helpers/GenerateComponentKey";
import { GameContext } from "../../providers/GameContext";
import { Row } from "../Table/Row";
import "./../../styles/components/Game/Table.scss";

export function Table() {
  const game = useContext(GameContext);

  function getRows() {
    let r: JSX.Element[] = [];

    for (let i = 0; i < 6; i++) {
      r.push(<Row index={i} key={GenerateComponentKey(10)} />);
    }

    return r;
  }

  return (
    <div className="game_table">
      <div className={`failed ${game.ended && game.failed ? "visible" : ""}`}>
        <p>
          Não foi desta vez... A palavra correta é{" "}
          <span>{getWordPT(game.word)}</span>
        </p>
      </div>
      {getRows().map((e) => e)}
    </div>
  );
}
