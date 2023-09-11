import { useState } from "react";
import styles from "./App.module.scss";
import InputBox from "./components/InputBox/InputBox";

function App() {
  const [testedResults, setTestedResults] = useState<boolean[]>([]);
  const isExpectedResult = testedResults.length > 0 && testedResults.every((data) => data === true);

  console.log('isExpectedResult',isExpectedResult);
  console.log('testedResults',testedResults);

  const EXPECTED_VALUES = ["7", "to", "C", "D", "E", "F"];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement | EventTarget>) => {
    e.preventDefault();

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
      {isExpectedResult && <p style={{ color: "green" }}>Bravo !</p>}
    </div>
  );
}

export default App;
