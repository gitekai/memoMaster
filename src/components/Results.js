import React from "react";
import NumberItem from "./GroupedNumberItem";
import "./Results.css";

const Result = ({ answer="", numberAsked="", maxDigitLength=1 }) => {
  const solutions = createSolutionsArray(numberAsked, maxDigitLength);
  console.log(solutions)
  const answerArr = createSolutionsArray(answer, maxDigitLength);
  console.log(answerArr)
  return (
    <div id="result">
      {answerArr.map((answer, idx) => {
        let solutionNumber = "";
        let cl = "right";
        if ("" + answer !== solutions[idx]) {
          solutionNumber = solutions[idx];
          cl = "wrong";
        }
        return (
          <div className="numberGroup">
            <NumberItem
              key={idx}
              className={cl}
              number={answer}
              position={idx + 1}
              solutionNumber={solutionNumber}
            />
          </div>
        );
      })}
    </div>
  );
};

const createSolutionsArray = (solution, maxLength) => {
  const res = [];
  const solutionArr = `${solution}`.split("");
  for (let i = 0; i < solutionArr.length; i = i + maxLength) {
    const num = solutionArr.slice(i, i + maxLength).join("");
    res.push(num);
  }
  return res;
};

export default Result;
