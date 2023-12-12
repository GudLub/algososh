import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./fibonacci-page.module.css";
import { useForm } from "../../hooks/useForm";
import { FormEvent } from "react";
import { getNumbers, sortFibonacci } from "./fibonacci-page-algoritm";

export const FibonacciPage: React.FC = () => {
  const { values, handleChange } = useForm({ value: "" });
  const [loader, setLoader] = React.useState(false);
  const [state, setState] = React.useState<string[]>([]);
  const index = Number(values.value);

  const onSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setLoader(true);
    const arr = getNumbers(index).map(String);
    sortFibonacci(arr, setState, setLoader);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.input_box} onSubmit={onSubmit}>
        <Input
          max={19}
          min={1}
          value={values.value}
          name="value"
          onChange={handleChange}
          type="number"
          isLimitText={true}
        />
        <Button
          text="Рассчитать"
          type="submit"
          isLoader={loader}
          disabled={
            values.value &&
            Number(values.value) < 20 &&
            Number(values.value) !== 0
              ? false
              : true
          }
        />
      </form>
      <ul className={styles.circle_box}>
        {state?.map((item, index) => (
          <li key={index}>
            <Circle letter={item} index={index} />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
