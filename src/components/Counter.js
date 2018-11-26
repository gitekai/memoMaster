import React from "react";
import './Counter.css';


class Counter extends React.Component {
  state = {
    counter: this.props.counter,
    hasFinished: false
  };
  componentDidMount = () => {
    this.countOneDown();
  }

  countOneDown = async () => {
    await new Promise(resolve => {
      setTimeout(() => {
        this.countDown();
      }, 1000);
    });
  };

  countDown = () => {
    const { hasFinished } = this.state;

    if (hasFinished) return;

    this.setState(currState => {
      const oldCounter = currState.counter;
      let newCounter = oldCounter;
      let hasFinished = false;

      if (oldCounter - 1 === 0) {
        hasFinished = true;
      }

      newCounter = oldCounter - 1; 
      return { counter: newCounter, hasFinished}

    }, 
    () => { this.state.hasFinished && this.props.onCountdownEnd() }
    );

    this.countOneDown();
  };

  render() {
    return (
      <div id="counter">
        <div id="counternumber" >Please wait for {this.state.counter} seconds</div>
    </div>
    );
  }
}

export default Counter;
