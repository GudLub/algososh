import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./list-page.module.css";
import { useForm } from "../../hooks/useForm";
import { TString } from "../../types/types";
import { ElementStates } from "../../types/element-states";
import { LinkedList } from "./list-page-algoritm";
import { SyntheticEvent, FormEvent } from "react";
import { timeout } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { ArrowIcon } from "../ui/icons/arrow-icon";

export const ListPage: React.FC = () => {
  const { values, handleChange, setValues } = useForm({ value: "" });
  const [currentIndex, setIndex] = React.useState<{ value: string }>({
    value: "",
  });

  const initialArr: TString[] = [
    { value: "0", state: ElementStates.Default },
    { value: "34", state: ElementStates.Default },
    { value: "8", state: ElementStates.Default },
    { value: "1", state: ElementStates.Default },
  ];

  const [list, setList] = React.useState(new LinkedList<TString>(initialArr));
  const [text, setText] = React.useState<string>("");
  const [loader, setLoader] = React.useState(false);
  const [arr, setArr] = React.useState<TString[]>(list.toArray());
  const [current, setCurrent] = React.useState<string>();
  const [head, setHead] = React.useState<
    string | React.ReactElement<any, string | React.JSXElementConstructor<any>>
  >("");
  const [tail, setTail] = React.useState<
    string | React.ReactElement<any, string | React.JSXElementConstructor<any>>
  >("");

  let indexNum = Number(currentIndex.value);

  const onSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
  };

  const changeInputIndex = (event: SyntheticEvent<HTMLInputElement>) => {
    const { value, name } = event.target as HTMLInputElement;
    setIndex({ ...currentIndex, [name]: value });
  };

  const addHeadOnClick = async () => {
    if (list.toArray().length < 6) {
      setLoader(true);
      setCurrent("Добавить в head");
      await timeout(SHORT_DELAY_IN_MS);
      list.prepend({ value: values.value, state: ElementStates.Modified });
      await timeout(SHORT_DELAY_IN_MS);
      setText("Добавить в head");
      setHead(
        <Circle
          letter={values.value}
          state={ElementStates.Changing}
          isSmall={true}
        />
      );
      setList(list);
      await timeout(SHORT_DELAY_IN_MS);
      setArr([...list.toArray()]);
      setHead("head");
      await timeout(SHORT_DELAY_IN_MS);
      list.toArray()[0].state = ElementStates.Default;
      setList(list);
      setArr([...list.toArray()]);
      setCurrent("");
      setLoader(false);
      setValues({ value: "" });
    }
  };

  const deleteHeadOnClick = async () => {
    setLoader(true);
    setCurrent("Удалить из head");
    setText("Удалить из head");
    setTail(
      <Circle
        letter={list.toArray()[0].value}
        state={ElementStates.Changing}
        isSmall={true}
      />
    );
    list.toArray()[0].value = "";
    await timeout(SHORT_DELAY_IN_MS);
    list.deleteHead();
    setList(list);
    await timeout(SHORT_DELAY_IN_MS);
    setArr([...list.toArray()]);
    setTail("");
    setText("");
    setCurrent("");
    setLoader(false);
  };

  const addTailOnClick = async () => {
    if (list.toArray().length < 6) {
      setLoader(true);
      setCurrent("Добавить в tail");
      await timeout(SHORT_DELAY_IN_MS);
      list.append({ value: values.value, state: ElementStates.Modified });
      await timeout(SHORT_DELAY_IN_MS);
      setText("Добавить в tail");
      setHead(
        <Circle
          letter={values.value}
          state={ElementStates.Changing}
          isSmall={true}
        />
      );
      setList(list);
      await timeout(SHORT_DELAY_IN_MS);
      setArr([...list.toArray()]);
      setHead("");
      await timeout(SHORT_DELAY_IN_MS);
      list.toArray()[arr.length].state = ElementStates.Default;
      setList(list);
      setArr([...list.toArray()]);
      setCurrent("");
      setValues({ value: "" });
      setLoader(false);
    }
  };

  const deleteTailOnClick = async () => {
    setLoader(true);
    setCurrent("Удалить из tail");
    setText("Удалить из tail");
    setTail(
      <Circle
        letter={list.toArray()[arr.length - 1].value}
        state={ElementStates.Changing}
        isSmall={true}
      />
    );
    list.toArray()[arr.length - 1].value = "";
    await timeout(SHORT_DELAY_IN_MS);
    list.deleteTail();
    setList(list);
    setArr([...list.toArray()]);
    setTail("tail");
    setText("");
    setCurrent("");
    setLoader(false);
  };

  const addIndexOnClick = async () => {
    if (list.toArray().length < 6) {
      setLoader(true);
      setCurrent("Добавить по индексу");
      setText("Добавить по индексу");
      for (let i = 0; i <= indexNum; i++) {
        setIndex({ value: String(i) });
        await timeout(SHORT_DELAY_IN_MS);
        setHead(
          <Circle
            letter={values.value}
            state={ElementStates.Changing}
            isSmall={true}
          />
        );
        if (i < indexNum) {
          await timeout(SHORT_DELAY_IN_MS);
          list.toArray()[i].state = ElementStates.Changing;
          setList(list);
          setArr([...list.toArray()]);
          await timeout(SHORT_DELAY_IN_MS);
        }
      }
      list.addByIndex(
        { value: values.value, state: ElementStates.Modified },
        indexNum
      );
      setList(list);
      setArr([...list.toArray()]);
      await timeout(SHORT_DELAY_IN_MS);
      const arr = list.toArray().map((value) => ({
        ...value,
        color: ElementStates.Default,
        state: ElementStates.Default,
      })) as TString[];
      setList(list);
      setArr([...arr]);
      setHead("");
      setCurrent("");
      setText("");
      setLoader(false);
      setValues({ value: "" });
      setIndex({ value: "" });
    }
  };

  const deleteIndexOnClick = async () => {
    setLoader(true);
    setCurrent("Удалить по индексу");
    setText("Удалить по индексу");

    for (let i = 0; i <= indexNum; i++) {
      setIndex({ value: String(i) });
      await timeout(SHORT_DELAY_IN_MS);
      if (i < indexNum) {
        await timeout(SHORT_DELAY_IN_MS);
        list.toArray()[i].state = ElementStates.Changing;
        setList(list);
        setArr([...list.toArray()]);
        await timeout(SHORT_DELAY_IN_MS);
      }
      if (i === indexNum) {
        setTail(
          <Circle
            letter={list.toArray()[indexNum].value}
            state={ElementStates.Changing}
            isSmall={true}
          />
        );
        setList(list);
        setArr([...list.toArray()]);
        list.toArray()[indexNum].value = "";
        setList(list);
        setArr([...list.toArray()]);
        await timeout(SHORT_DELAY_IN_MS);
      }
    }
    list.deleteByIndex(indexNum);
    setList(list);
    await timeout(SHORT_DELAY_IN_MS);
    setArr([...list.toArray()]);
    const defaultArray = list.toArray().map((value) => ({
      ...value,
      color: ElementStates.Default,
      state: ElementStates.Default,
    })) as TString[];
    setList(list);
    setArr([...defaultArray]);
    setTail("");
    setCurrent("");
    setText("");
    setLoader(false);
  };

  const showHead = (
    arr: TString[],
    current: string | undefined,
    index: number,
    text: string,
    head?: string | React.ReactElement | null,
    indexNum?: number
  ) => {
    if (current && text === "Добавить в head" && index === 0) {
      return head;
    } else if (
      current &&
      text === "Добавить по индексу" &&
      index === indexNum
    ) {
      return head;
    } else if (
      current &&
      text === "Добавить в tail" &&
      index === arr.length - 1
    ) {
      return head;
    } else if (index === 0) {
      return "head";
    }
  };

  const showTail = (
    arr: TString[],
    index: number,
    text: string,
    tail?: string | React.ReactElement | null,
    indexNum?: number
  ) => {
    if (index === arr.length - 1 && text === "Добавить в tail") {
      return "tail";
    } else if (index === arr.length - 1 && text === "Добавить в head") {
      return "tail";
    } else if (index === 0 && text === "Удалить из head") {
      return tail;
    } else if (index === arr.length - 1 && text === "Добавить по индексу") {
      return "tail";
    } else if (index === arr.length - 1 && text === "Удалить из head") {
      return "tail";
    } else if (index === arr.length - 1 && text === "Удалить из tail") {
      return tail;
    } else if (index === indexNum && text === "Удалить по индексу") {
      return tail;
    } else if (index === arr.length - 1) {
      return "tail";
    }
  };

  return (
    <SolutionLayout title="Связный список">
      <form className={styles.input_box} onSubmit={onSubmit}>
        <Input
          placeholder="Введите значение"
          extraClass={styles.input}
          maxLength={4}
          max={`4 символа`}
          type="text"
          isLimitText={true}
          onChange={handleChange}
          value={values.value}
          name="value"
          disabled={
            (loader ? true : false) ||
            (list.toArray().length === 6 ? true : false)
          }
        />
        <Button
          text="Добавить в head"
          type="button"
          onClick={() => addHeadOnClick()}
          isLoader={current === "Добавить в head" && loader}
          disabled={values.value === "" || loader}
        />
        <Button
          text="Добавить в tail"
          type="button"
          onClick={() => addTailOnClick()}
          isLoader={current === "Добавить в tail" && loader}
          disabled={values.value === "" || loader}
        />
        <Button
          text="Удалить из head"
          type="button"
          onClick={() => deleteHeadOnClick()}
          isLoader={current === "Удалить из head" && loader}
          disabled={arr.length === 0 || loader}
        />
        <Button
          text="Удалить из tail"
          type="button"
          onClick={() => deleteTailOnClick()}
          isLoader={current === "Удалить из tail" && loader}
          disabled={arr.length === 0 || loader}
        />
      </form>
      <form className={styles.input_box} onSubmit={onSubmit}>
        <Input
          placeholder="Введите индекс"
          extraClass={styles.input}
          onChange={changeInputIndex}
          value={currentIndex.value}
          disabled={loader ? true : false}
          type="number"
          max={10}
          min={0}
          name="value"
        />
        <Button
          text="Добавить по индексу"
          type="button"
          onClick={() => addIndexOnClick()}
          extraClass={styles.button}
          isLoader={current === "Добавить по индексу" && loader}
          disabled={
            values.value === "" ||
            currentIndex.value === "" ||
            list.toArray().length - 1 < Number(currentIndex.value)
              ? true
              : false
          }
        />
        <Button
          text="Удалить по индексу"
          type="button"
          extraClass={styles.button}
          onClick={() => deleteIndexOnClick()}
          disabled={
            currentIndex.value === "" ||
            list.toArray().length - 1 < Number(currentIndex.value)
              ? true
              : false
          }
          isLoader={current === "Удалить по индексу" && loader}
        />
      </form>
      <ul className={styles.circle_box}>
        {arr &&
          arr?.map((item, index) => {
            return (
              <li key={index} className={styles.listItem}>
                <Circle
                  letter={item.value}
                  head={showHead(arr, current, index, text, head, indexNum)}
                  tail={showTail(arr, index, text, tail, indexNum)}
                  state={item.state}
                  index={index}
                />
                {index < arr.length - 1 ? <ArrowIcon /> : null}
              </li>
            );
          })}
      </ul>
    </SolutionLayout>
  );
};
