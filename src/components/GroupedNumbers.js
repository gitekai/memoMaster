import React from "react";
import NumberItem from "./GroupedNumberItem";
import "./GroupedNumbers.css";

class GroupedNumber extends React.Component {
  setActiveIndex = index => {
    this.props.setActiveIndex(index);
  };

  produceNumberArray() {
    const { answer = [], activeIndex = 0 } = this.props;
    return answer.map((group, idx) => {
      const isActive = idx === activeIndex ? true : false;
      return (
        <div className="item" key={idx}>
          <NumberItem
            isActive={isActive}
            position={idx + 1}
            onSelect={() => {
              this.setActiveIndex(idx);
            }}
          >{group}</NumberItem>
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
