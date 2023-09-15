import { Fireworks as FireworksJs } from "fireworks-js";
import { useRef } from "react";
import styles from "./Fireworks.module.scss";

type Props = {
  start: boolean;
};

const Fireworks = ({ start }: Props) => {
  const fireworksContainer = useRef<HTMLCanvasElement | null>(null);

  if (fireworksContainer.current) {
    const fireworks = new FireworksJs(fireworksContainer.current!);
    if (start && fireworksContainer.current) fireworks.start();
  }

  return (
    <canvas className={styles.canvas} ref={fireworksContainer as React.RefObject<HTMLCanvasElement>} />
  );
};

export default Fireworks;
