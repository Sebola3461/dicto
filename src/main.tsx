import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.scss";
import { Game } from "./pages/Game";
import GameProvider from "./providers/GameContext";
import RowsProvider from "./providers/RowsContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <GameProvider>
      <RowsProvider>
        <Game />
      </RowsProvider>
    </GameProvider>
  </React.StrictMode>
);
