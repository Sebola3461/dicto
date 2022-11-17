import { KeyboardKey } from "./KeyboardKey";
import "./../../styles/components/Table/Keyboard.scss";

interface IKeyboardKey {
  key: string;
  isBackspace?: boolean;
  isEnter?: boolean;
}

export function Keyboard() {
  const row1: IKeyboardKey[] = [
    { key: "q" },
    { key: "w" },
    { key: "e" },
    { key: "r" },
    { key: "t" },
    { key: "y" },
    { key: "u" },
    { key: "i" },
    { key: "o" },
    { key: "p" },
  ];

  const row2: IKeyboardKey[] = [
    { key: "a" },
    { key: "s" },
    { key: "d" },
    { key: "f" },
    { key: "g" },
    { key: "h" },
    { key: "j" },
    { key: "k" },
    { key: "l" },
    { key: "<<", isBackspace: true },
  ];

  const row3: IKeyboardKey[] = [
    { key: "z" },
    { key: "x" },
    { key: "c" },
    { key: "v" },
    { key: "b" },
    { key: "n" },
    { key: "m" },
    { key: "Enter", isEnter: true },
  ];

  return (
    <div className="keyboard">
      <div className="row">
        {row1.map((k) => (
          <KeyboardKey character={k.key} isBackspace={false} isEnter={false} />
        ))}
      </div>
      <div className="row">
        {row2.map((k) => (
          <KeyboardKey
            character={k.key}
            isBackspace={k.isBackspace || false}
            isEnter={false}
          />
        ))}
      </div>
      <div className="row">
        {row3.map((k) => (
          <KeyboardKey
            character={k.key}
            isBackspace={false}
            isEnter={k.isEnter || false}
          />
        ))}
      </div>
    </div>
  );
}
