import styles from "./InputBox.module.scss";

type Props = {
  name: string;
  position: string;
  isValid: undefined | true | false;
};

const InputBox = ({ name, position, isValid }: Props) => {
  return (
    <div className={styles.inputBox}>
      <span>{Number(position) + 1}</span>
      <input
        className={isValid ? styles.isValid : ''}
        required
        name={name}
        minLength={1}
        maxLength={2}
        size={2}
      />
      ;
    </div>
  );
};

export default InputBox;
