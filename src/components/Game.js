import React from 'react'
import NumberSlide from './NumberSlide';

function generateRandomNumber(desiredLength){
    let number=""; 
    for(let i=0;i<desiredLength;i++){
        number+=Math.floor(Math.random()*10)
    }
    return number; 
}

class Game extends React.Component {

    state = {
        number: "",
        gameStart: null,
    }

    startGame = () => {
        this.setState({
            gameStart: Date.now(),
            number: generateRandomNumber(19)
        })
    }

    render() {
        const {gameStart,number} = this.state
        return (
            <div id="game">
                { (gameStart === null)
                ? <button onClick={this.startGame}>START</button>
                : <NumberSlide digits={number} maxNumberLength={2}>Finished ?¿</NumberSlide>
                }
            </div>
        )
    }
}

export default Game; 