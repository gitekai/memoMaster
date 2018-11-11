import React from "react";
import NumberItem from "./GroupedNumberItem";
import "./GroupedNumbers.css";

class GroupedNumber extends React.Component {
  setActiveIndex = index => {
    this.props.setActiveIndex(index);
  };

  produceNumberArray() {
    const { answer = [], activeIndex = 0 } = this.props;
    console.log("anser =======");
    console.log(answer)
    return answer.map((group, idx) => {
      const isActive = idx === activeIndex ? true : false;
      return (
        <div className="item" key={idx}>
          <NumberItem
            isActive={isActive}
            number={group}
            position={idx + 1}
            onSelect={() => {
              this.setActiveIndex(idx);
            }}
          />
        </div>
      );
    });
  }

  render() {
    const numbers = this.produceNumberArray();

    return <div id="groupedNumbers">{numbers}</div>;
  }
}

export default GroupedNumber;
