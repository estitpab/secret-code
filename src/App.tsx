import { useState } from "react";
import styles from './App.module.scss';

function App() {
  const [isExpectedResult, setIsExpectedResult] = useState(false);
  const EXPECTED_VALUES = {
    value1: "A",
    value2: "B",
    value3: "C",
    value4: "D",
    value5: "E",
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement | EventTarget>) => {
    e.preventDefault();

    if (e.target instanceof HTMLFormElement) {
      const form = e.target;
      const formData = new FormData(form);
      const formJson = Object.fromEntries(formData.entries());
      console.log(formJson);

      setIsExpectedResult(
        formJson.value1 === EXPECTED_VALUES.value1 &&
          formJson.value2 === EXPECTED_VALUES.value2 &&
          formJson.value3 === EXPECTED_VALUES.value3 &&
          formJson.value4 === EXPECTED_VALUES.value4 &&
          formJson.value5 === EXPECTED_VALUES.value5
      );
    }
  };

  return (
    <div className={styles.formWrapper}>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputsWrapper}>
          <input required name="value1" minLength={1} maxLength={2} size={2} />
          <input required name="value2" minLength={1} maxLength={2} size={2} />
          <input required name="value3" minLength={1} maxLength={2} size={2} />
          <input required name="value4" minLength={1} maxLength={2} size={2} />
          <input required name="value5" minLength={1} maxLength={2} size={2} />
        </div>

        <button type="submit">Valider le code</button>
      </form>
      {isExpectedResult && <p style={{ color: "green" }}>Bravo !</p>}
    </div>
  );
}

export default App;
