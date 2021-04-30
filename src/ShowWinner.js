import React, {Component} from 'react';
import './Win.css';
import gif from './gif.gif';
import fire from './fire.mp3'

class ShowWinner extends Component {
  render() {
    return (
      <div id="win">
        <audio autoPlay id="audio1"  src={fire} type="audio/mpeg"></audio>
        <img src={gif} alt="win" />
        <h1>Winner is {this.props.winner} with {this.props.count} turns!!!</h1>
        <h1>Time taken to win - {this.props.time} seconds!!!</h1>
      </div>
      
    );
  }
}

export default ShowWinner;
