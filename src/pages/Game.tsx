import { Table } from "../components/Game/Table";
import { Keyboard } from "../components/Table/Keyboard";
import { Navbar } from "../components/UI/Navbar";

export function Game() {
  return (
    <div className="game_layout">
      <Navbar />
      <Table />
      <Keyboard />
    </div>
  );
}
