import React from "react";
import { database } from "../firebase";
import AuthUserContext from './AuthUserContext';


const withMajorNumber = Component => {
  class WithMajorNumber extends React.Component {
    static contextType = AuthUserContext;
    state = {
      majorSystem: {}
    };

    componentDidMount() {
      database.onceGetMajorSystem(this.context.uid).then(snapshot => {
        this.setState({ majorSystem: snapshot.val() });
      });
    }

    render() {
      return (
        <Component
          {...this.props}
          majorSystem={this.state.majorSystem}
        />
      );
    }
  }
  return WithMajorNumber;
};

export default withMajorNumber;
