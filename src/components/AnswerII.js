import React from 'react';
import TextField from "@material-ui/core/TextField";
import GroupedNumbers from "./GroupedNumbers";


class AnswerII extends React.Component {

    state = {
        inputVal: '',
        answerTotal: [],
    }

    onInputChange = e => {
        const { maxNumLength } = this.props;

        const value = e.target.value;
        if (value.length === maxNumLength) {
            this.setState(currState => {
                const answerTotal = [...currState.answerTotal, value]
                //const answerTotal={...currState.answerTotal, [Object.keys(currState.answerTotal).length]: value };
                return { answerTotal, inputVal: '' }
            })
        } else {

            this.setState({ inputVal: value })
        }
    }

    render() {
        const {inputVal, answerTotal} = this.state;
        return (
            <div id="answerII">
                <GroupedNumbers answer={answerTotal}/>
                <TextField
                    type="text"
                    multiline={true}
                    className="materialTextField"
                    label="Answer"
                    onChange={this.onInputChange}
                    value={inputVal}
                />

            </div>
        );
    }

}

export default AnswerII; 