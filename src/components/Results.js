import React from "react";
import NumberItem from "./GroupedNumberItem";
import { database } from "../firebase";
import "./Results.css";

class Result extends React.Component {
  state = {
    memorizationTimeInSec: null,
    recallTimeInSec: null,
    correctNums: 0
  };

  componentDidMount() {
    const {
      timeTaken: { memorizationEnd, memorizationStart, recallEnd, recallStart },
      maxDigitLength,
      answer,
      numberAsked
    } = this.props;

    const solutions = createArraywMaxLength(numberAsked, maxDigitLength);

    const correctNums = solutions.reduce((correctNums, solution, idx) => {
      return (
        correctNums +
        solution.split("").reduce((correctChars, solutionChar, charPos) => {
          const answerChar = answer[idx].charAt(charPos);
          if (answerChar === solutionChar) {
            return correctChars + 1;
          }
          return correctChars;
        }, 0)
      );
    }, 0);

    database.doCreateNumberGameResults({
      correctNums,
      digitsTotal: numberAsked.length,
      recallTimeInSec: Number.parseInt((recallEnd - recallStart) / 1000),
      memorizationTimeInSec: Number.parseInt(
        (memorizationEnd - memorizationStart) / 1000
      ),
      userID: "KBvoo76quhawWtzHfSm98h6dTI12"
    });
  }

  render() {
    const {
      answer = [],
      numberAsked = "",
      maxDigitLength = 1,
      timeTaken: { memorizationStart, memorizationEnd, recallStart, recallEnd }
    } = this.props;

    const solutions = createArraywMaxLength(numberAsked, maxDigitLength);

    const guessedNumber = solutions.map((solution, sIdx) => {
      const numberGroup = solution.split("").map((val, wIdx) => {
        const ansChar = "" + answer[sIdx].charAt(wIdx);
        if (val === ansChar) {
          return <span className="win">{ansChar}</span>;
        }
        return <span className="loose">{ansChar}</span>;
      });

      let clName = "wrong";
      let solutionExposed = solution;
      if (solution === answer[sIdx]) {
        clName = "right";
        solutionExposed = null;
      }

      return (
        <div key={sIdx} className="numberGroup">
          <NumberItem
            className={clName}
            position={sIdx + 1}
            solutionNumber={solutionExposed}
          >
            {numberGroup}
          </NumberItem>
        </div>
      );
    });

    return <div id="result">{guessedNumber}</div>;
  }
}

const createArraywMaxLength = (solution, maxLength) => {
  const res = [];
  const solutionArr = `${solution}`.split("");
  for (let i = 0; i < solutionArr.length; i = i + maxLength) {
    const num = solutionArr.slice(i, i + maxLength).join("");
    res.push(num);
  }
  return res;
};

const msToMinutesNSeconds = timeTaken_ms => {
  const timeTaken_s = timeTaken_ms / 1000;
  const minutes = Number.parseInt(timeTaken_s / 60);
  const seconds = Number.parseInt(timeTaken_s % 60);

  return { minutes, seconds };
};

const resultMessage = (minutes, seconds, aim = "ficken") => {
  let result = "You took ";
  if (minutes) {
    result += `${minutes} minutes and`;
  }
  result += `${seconds} seconds to complete ${aim}`;
  return result;
};

export default Result;
