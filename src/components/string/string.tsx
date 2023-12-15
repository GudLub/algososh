import React from "react";
import styles from "./string.module.css";
import { timeout } from "../../utils/utils";
import { FormEvent } from "react";
import { useForm } from "../../hooks/useForm";
import { Circle } from "../ui/circle/circle";
import { TString } from "../../types/types";
import { DELAY_IN_MS } from "../../constants/delays";
import { sortArray } from "./string-algoritm";
import { ElementStates } from "../../types/element-states";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";

export const StringComponent: React.FC = () => {
  const { values, handleChange } = useForm({ value: "" });
  const [loader, setLoader] = React.useState(false);
  const [state, setState] = React.useState<TString[]>([]);

  const onSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setLoader(true);
    const arr = Array.from(values.value).map((value) => ({
      value,
      state: ElementStates.Default,
    })) as TString[];
    setState([...arr]);
    await timeout(DELAY_IN_MS);
    sortArray(arr, setState, setLoader);
  };

  return (
    <SolutionLayout title="Строка">
      <form className={styles.input_box} onSubmit={onSubmit}>
        <Input
          maxLength={11}
          max={`11 символов`}
          value={values.value}
          name="value"
          onChange={handleChange}
          isLimitText={true}
        />
        <Button
          text="Развернуть"
          type="submit"
          isLoader={loader}
          disabled={values.value ? false : true}
        />
      </form>
      <ul className={styles.circle_box}>
        {state?.map((item, index) => (
          <li key={index}>
            <Circle letter={item.value} state={item.state} />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
