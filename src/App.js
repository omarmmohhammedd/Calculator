import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import "./App.css";
const App = () => {
  const [mood, setMood] = useState(true);
  const [calc, setCalc] = useState({
    num: 0,
    sign: "",
    res: 0,
    screen: 0,
  });
  const button = [
    ["C", "+-", "%", "/"],
    [7, 8, 9, "X"],
    [4, 5, 6, "-"],
    [1, 2, 3, "+"],
    [0, ".", "="],
  ];
  const NumberClick = (e) => {
    const btn = e.target.innerHTML;
    if (calc.num.toString().length < 11) {
      setCalc({
        ...calc,
        num:
          calc.num === 0 && btn === "0"
            ? "0"
            : calc.num % 1 === 0
            ? Number(calc.num + btn)
            : calc.num + btn,
        res: !calc.sign ? 0 : calc.res,
      });
    }
  };
  const Reset = () => {
    setCalc({ num: 0, sign: "", res: 0 });
  };
  const Invert = () => {
    setCalc({
      ...calc,
      num: calc.num ? calc.num * -1 : 0,
      res: calc.res ? calc.res * -1 : 0,
      sign: "",
    });
  };
  const Sign = (e) => {
    const operation = e.target.innerHTML;
    if (calc.num !== 0 || calc.res !== 0) {
      setCalc({
        ...calc,
        sign: operation,
        res: !calc.res && calc.num ? calc.num : calc.res,
        num: 0,
      });
    }
  };
  const eqaul = () => {
    if (calc.sign && calc.num) {
      const operation = (fNum, sNum, sign) =>
        sign === "+"
          ? fNum + sNum
          : sign === "-"
          ? fNum - sNum
          : sign === "X"
          ? fNum * sNum
          : fNum / sNum;

      setCalc({
        ...calc,
        res:
          calc.num === "0" && calc.sign === "/"
            ? "Can't divide with 0"
            : operation(Number(calc.res), Number(calc.num), calc.sign),
        sign: "",
        num: 0,
      });
    }
  };
  const Dot = (e) => {
    const dot = e.target.innerHTML;
    setCalc({
      ...calc,
      num: calc.num.toString().includes(".") ? calc.num : calc.num + dot,
    });
  };
  const percent = () => {
    let num = calc.num ? parseFloat(calc.num) : 0;
    let res = calc.res ? parseFloat(calc.res) : 0;

    setCalc({
      ...calc,
      num: (num /= Math.pow(100, 1)),
      res: (res /= Math.pow(100, 1)),
      sign: "",
    });
  };

  return (
    <div className='Container' id={mood ? "light" : "dark"}>
      <div className='Wrapper'>
        <div className='Header-con'>
          <span className='logo'>Calculator </span>
          <button onClick={() => setMood(!mood)}>
            <FontAwesomeIcon icon={mood ? faMoon : faSun} />
          </button>
        </div>
        <div className='Screen'>
          <div id='result'>{calc.num ? calc.num : calc.res}</div>
        </div>
        <div className='Btn-con'>
          {button.flat().map((btn, i) => {
            return (
              <>
                {btn === "=" ? (
                  <button className='equal' onClick={() => eqaul()}>
                    {btn}
                  </button>
                ) : btn === "C" ? (
                  <button key={i} onClick={() => Reset()}>
                    {btn}
                  </button>
                ) : btn === "+-" ? (
                  <button key={i} onClick={() => Invert()}>
                    {btn}
                  </button>
                ) : btn === "+" || btn === "-" || btn === "X" || btn === "/" ? (
                  <button key={i} onClick={(e) => Sign(e)}>
                    {btn}
                  </button>
                ) : btn === "." ? (
                  <button key={i} onClick={(e) => Dot(e)}>
                    {btn}
                  </button>
                ) : btn === "%" ? (
                  <button key={i} onClick={() => percent()}>
                    {btn}
                  </button>
                ) : (
                  <button key={i} onClick={(e) => NumberClick(e)}>
                    {btn}
                  </button>
                )}
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default App;
