import React, {Component} from 'react';
import './Win.css';
import gif from './gif.gif';
import fire from './fire.mp3'

class Draw extends Component {
  render() {
    return (
      <div id="win">
        <audio autoPlay id="audio1"  src={fire} type="audio/mpeg"></audio>
        <img src={gif} alt="win" />
        <h1>The game ended in a draw !!!</h1>
      </div>
      
    );
  }
}

export default Draw;
