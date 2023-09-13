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

  const EXPECTED_VALUES = ["A", "B", "C", "D", "E", "F"];
  //TODO: Gérer les valeurs EXPECTED_VALUES depuis un backoffice ou des variables d'environnement

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
      <canvas
        ref={fireworksContainer as React.RefObject<HTMLCanvasElement>}/>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputsWrapper}>
          {EXPECTED_VALUES.map((value, index) => (
            <InputBox
              key={value}
              name={String(index)}
              position={String(index)}
              isValid={testedResults[index]}
            />
          ))}
        </div>

        <button type="submit">Valider le code</button>
      </form>
    </div>
  );
}

export default App;
