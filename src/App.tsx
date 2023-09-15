import { useState, useRef } from "react";
import styles from "./App.module.scss";
import InputBox from "./components/InputBox/InputBox";
import { Fireworks } from "fireworks-js";

function App() {
  const [testedResults, setTestedResults] = useState<boolean[]>([]);
  const fireworksContainer = useRef<HTMLCanvasElement | null>(null);
  const isExpectedResult =
    testedResults.length > 0 && testedResults.every((data) => data === true);

  if (fireworksContainer.current) {
    const fireworks = new Fireworks(fireworksContainer.current!);
    if (isExpectedResult && fireworksContainer.current) fireworks.start();
  }

  const EXPECTED_VALUES = import.meta.env.VITE_EXPECTED_VALUES.split(",");
  const VICTORY_MESSAGE = import.meta.env.VITE_VICTORY_MESSAGE;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement | EventTarget>) => {
    e.preventDefault();
    setTestedResults((curr) => curr);

    if (e.target instanceof HTMLFormElement) {
      const listOfResults: boolean[] = [];
      const form = e.target;
      const formData = new FormData(form);
      const formJson = Object.fromEntries(formData.entries());
      const formValues = Object.values(formJson);

      for (let i = 0; i < formValues.length; i++) {
        listOfResults.push(formValues[i] === EXPECTED_VALUES[i]);
      }
      setTestedResults(listOfResults);
    }
  };

  return (
    <div className={styles.formWrapper}>
      <canvas ref={fireworksContainer as React.RefObject<HTMLCanvasElement>} />
      <form onSubmit={handleSubmit}>
        <div className={styles.inputsWrapper}>
          {EXPECTED_VALUES.map((value: string, index: number) => (
            <InputBox
              key={value}
              name={String(index)}
              position={String(index)}
              isValid={testedResults[index]}
            />
          ))}
        </div>
        <div className={styles.validationBloc}>
          {isExpectedResult ? (
            <div className={styles.victoryMessage}>{VICTORY_MESSAGE}</div>
          ) : (
            <button type="submit">Valider le code</button>
          )}
        </div>
      </form>
    </div>
  );
}

export default App;
