import styles from "./InputBox.module.scss";
import { useState, useEffect } from "react";
import { LOCAL_STORAGE_VALUES_NAME } from "../../App";

type Props = {
  name: string;
  position: string;
  isValid: undefined | true | false;
};

const InputBox = ({ name, position, isValid }: Props) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    const savedValues = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_VALUES_NAME) || "{}"
    )[Number(position)];
    setInputValue(savedValues);
  }, [position]);

  return (
    <div className={styles.inputBox}>
      <span className={isValid ? styles.isValid : ""}>
        {isValid ? "✅" : Number(position) + 1}
      </span>
      <input
        type="text"
        className={
          isValid ? styles.isValid : isValid !== undefined ? styles.isError : ""
        }
        name={name}
        minLength={1}
        maxLength={2}
        size={2}
        value={inputValue}
        onChange={handleInputChange}
      />
      ;
    </div>
  );
};

export default InputBox;
