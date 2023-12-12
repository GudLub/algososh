import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./queue-page.module.css";
import { useForm } from "../../hooks/useForm";
import { Queue } from "./queue-page-algoritm";
import { TString } from "../../types/types";
import { SyntheticEvent, FormEvent } from "react";
import { ElementStates } from "../../types/element-states";
import { timeout } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";

export const QueuePage: React.FC = () => {
  const { values, handleChange, setValues } = useForm({ value: "" });
  const [addLoader, setAddLoader] = React.useState(false);
  const [removeLoader, setRemoveLoader] = React.useState(false);
  const [clearLoader, setClearLoader] = React.useState(false);
  const [queue, setQueue] = React.useState(new Queue<TString>(7));

  let array = queue.getElements() as TString[];

  const initialArray = Array.from({ length: 7 }).map(() => ({
    value: "",
    state: ElementStates.Default,
  })) as TString[];
  const [arr, setArr] = React.useState<TString[]>(initialArray);

  const onSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    queue.enqueue({ value: values.value, state: ElementStates.Changing });
    setQueue(queue);
    setArr([...array]);
    await timeout(SHORT_DELAY_IN_MS);
    queue.getTail()!.state = ElementStates.Default;
    setValues({ value: "" });
    setArr([...array]);
  };

  const onClick = async (text: string, evt: SyntheticEvent) => {
    evt.preventDefault();
    if (values.value !== "" && text === "Добавить") {
      setAddLoader(true);
      queue.enqueue({ value: values.value, state: ElementStates.Changing });
      setQueue(queue);
      setArr([...array]);
      await timeout(SHORT_DELAY_IN_MS);
      queue.getTail()!.state = ElementStates.Default;
      setValues({ value: "" });
      setArr([...array]);
      setAddLoader(false);
    } else if (text === "Удалить") {
      setRemoveLoader(true);
      queue.peak()!.state = ElementStates.Changing;
      setQueue(queue);
      setArr([...array]);
      await timeout(SHORT_DELAY_IN_MS);
      queue.dequeue();
      setQueue(queue);
      await timeout(SHORT_DELAY_IN_MS);
      setArr([...array]);
      setRemoveLoader(false);
    } else if (text === "Очистить") {
      setClearLoader(true);
      queue.clear();
      setQueue(queue);
      array = initialArray;
      setArr([...array]);
      setClearLoader(false);
    }
  };

  return (
    <SolutionLayout title="Очередь">
      <form className={styles.input_box} onSubmit={onSubmit}>
        <Input
          maxLength={4}
          value={values.value}
          name="value"
          type="string"
          onChange={handleChange}
          isLimitText={true}
          max={`4 символа`}
        />
        <div className={styles.buttons_box}>
          <Button
            text="Добавить"
            type="button"
            isLoader={addLoader}
            onClick={(e: SyntheticEvent) => onClick("Добавить", e)}
            disabled={
              values.value === "" ||
              (!queue.isEmpty() && arr.slice(-1)[0] === queue.getTail())
                ? true
                : false
            }
          />
          <Button
            text="Удалить"
            type="button"
            isLoader={removeLoader}
            onClick={(e: SyntheticEvent) => onClick("Удалить", e)}
            disabled={!queue.isEmpty() ? false : true}
          />
          <Button
            text="Очистить"
            type="button"
            isLoader={clearLoader}
            extraClass={styles.clear}
            onClick={(e: SyntheticEvent) => onClick("Очистить", e)}
            disabled={!queue.isEmpty() ? false : true}
          />
        </div>
      </form>
      <ul className={styles.circle_box}>
        {arr?.map((item, index) => (
          <li key={index}>
            <Circle
              letter={item?.value}
              state={item?.state}
              index={index}
              head={!queue.isEmpty() && queue.peak() === item ? "head" : ""}
              tail={!queue.isEmpty() && queue.getTail() === item ? "tail" : ""}
            />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
