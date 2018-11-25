import React from "react";
import * as routes from "../constants/routes";
import { Link } from "react-router-dom";
import "./Home.css";

class Home extends React.Component {
  render() {
    return (
      <div id="home">
        <div className="imgContainer">
          <Link to={routes.NUMBERGAME}>
            <img
              className="imgItem"
              src="RandomNumbers.png"
              alt="Number Memory"
            />
            {"Number Game"}
          </Link>
        </div>
      </div>
    );
  }
}

export default Home;
