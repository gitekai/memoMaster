import React from 'react'; 


const Places = [
    'Ofen',
    'Gewürze', 
    'Messer',
    'Spüle',
    'Teller Abwasch',
    'Microwelle',
    'Kuhlschrank',
    'Kaffeemaschine', 
    'Hocker', 
    'Essens Tisch'
];



class PositionToPlace extends React.Component {

    state={
        showPlace:false,
    }

    toggleShowPlace = () => {
        this.setState(prevState => ({showPlace: !prevState.showPlace}));
    }

    render(){
        const {position, objectsInOnePlace, total } = this.props; 
        const {showPlace} = this.state; 
        const placeIndex = Math.ceil(position / objectsInOnePlace) -1; 
        const Position = <div><span id="activePosition">{position}</span> of {total}</div>
        const positionOrPlace = (showPlace) ? Places[placeIndex] : Position;

        return(
            <div id="positionToPlace" onClick={this.toggleShowPlace}>
                {positionOrPlace}
            </div>
        );
    }
}

export default PositionToPlace;