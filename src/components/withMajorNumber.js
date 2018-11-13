import React from 'react'; 
import { database } from '../firebase';

const withMajorNumber = (Component) => {
    class WithMajorNumber extends React.Component {
        state = {
            inputs: {},
        }

        componentDidMount() {
            database.onceGetMajorSystem().then(snapshot => {
              const a = snapshot.val()
              const firstID = Object.keys(a)[0]
              const majorSystem = a[firstID];
              this.setState({ inputs: majorSystem })
            });
    }

    render(){
        return(
            <Component {...this.props} />
        );
    }
}
return WithMajorNumber;

}

export default withMajorNumber; 