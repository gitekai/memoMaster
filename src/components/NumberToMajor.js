import React from 'react';


class NumberToMajor extends React.Component {

    state={
        showsMajor : false
    }

    toggleShowMajor = () =>{
        this.setState(prevState => {
            const showsMajor = !prevState.showsMajor; 
            return {showsMajor};
        }); 
    }

    render() {
        const {showsMajor} = this.state; 
        const {number, numberToMajorObj = {} } = this.props; 
        console.log(typeof numberToMajorObj)
        const majorNumber = (typeof numberToMajorObj === 'object' && numberToMajorObj[number]) ? numberToMajorObj[number] : "N/A" ; 
        return (

            <div id="numberToMajor" onClick={this.toggleShowMajor}>
            {
                showsMajor ? majorNumber : number
            }
            </div>
        );
    }
}

export default NumberToMajor;