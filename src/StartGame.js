import React, {Component} from 'react';
import './App.css';
import ShowWinner from './ShowWinner';
import ReactDOM from 'react-dom';
import aud from './aud.mp3';
import Draw from "./Draw.js"

class StartGame extends Component {
  constructor(props) {
    super(props)
    this.state = {currentUser:1,userName:this.props.player[0],winC1:0,winC2:0,
      isCellDisabled: [[0,0,0,0,0,0,0],
                      [0,0,0,0,0,0,0],
                      [0,0,0,0,0,0,0],
                      [0,0,0,0,0,0,0],
                      [0,0,0,0,0,0,0],
                      [0,0,0,0,0,0,0]], lastRow:[35,36,37,38,39,40,41], time:new Date(),startTime:0, endTime:0}
  }

  componentDidMount() {
    const Time = new Date()
    this.setState({startTime: Time.getTime()})
    const cells = document.getElementsByTagName("td")
    const p1c = document.getElementById("butIn1")
    p1c.style.backgroundColor=this.props.color[0]
    const p2c = document.getElementById("butIn2")
    p2c.style.backgroundColor=this.props.color[1]

    for (let index = 0; index < cells.length; index++) {
      cells[index].addEventListener("click", () => { 
        var id = Math.floor(index/7)
        var dec = index%7
        

        for (let x = 5; x >-1 ; x--) {
          // console.log(x + " " + dec)
          if (x===5){
            var col = this.state.lastRow[dec]
          }
          else{
            col = col - 7
          }
          if (this.state.isCellDisabled[x][dec] ===0) {
            if (this.state.currentUser===1) {
              cells[col].style.backgroundColor=this.props.color[0];
              document.getElementById("butInd").style.backgroundColor=this.props.color[1];
              this.setState({currentUser:2})
              this.setState({userName:this.props.player[1]})
              var listCell1 = this.state.isCellDisabled
              listCell1[x][dec] = 1
              this.setState({isCellDisabled:listCell1})
              this.setState({winC1: this.state.winC1+1})
              this.checkWinner(x,dec)
              break
            }
            else if (this.state.currentUser===2){
              cells[col].style.backgroundColor=this.props.color[1];
              document.getElementById("butInd").style.backgroundColor=this.props.color[0];
              this.setState({currentUser:1})
              this.setState({userName:this.props.player[0]})
              var listCell = this.state.isCellDisabled
              listCell[x][dec] = 2
              this.setState({isCellDisabled:listCell})
              this.setState({winC2: this.state.winC2+1})
              this.checkWinner(x,dec)
              break
            }
          }
          
        }
       } );
    }
    setInterval(()=>this.currentTime(),1000)
  }
  currentTime(){
    this.setState({
      time:new Date()
    })
  }

  checkWinner = (id,dec) => {
    //Horizontal
    this.horizontal(id,dec)

    //vertical
    this.vertical(id,dec)

    //diagonal1
    this.diagonal1(id,dec)

    //diagonal2
    this.diagonal2(id,dec)

    //draw
    this.draw()
  } 

  draw = () => {
    var count = this.state.winC1 + this.state.winC2
    
    if (count === 42) {
      const Time = new Date()
      this.setState({endTime: Time.getTime()})
      var time1 =this.state.endTime - this.state.startTime 
      ReactDOM.render(<Draw time={time1/1000} draw="draw"/>,document.getElementById("root"))
    }
  }

  horizontal = (id,dec) =>{
    var count = 0;
    var count2 = 0;

    var hor = dec;
    for (let index = 1; index < 5; index++) {
      hor++
      if (hor < 7) {
        if (this.state.isCellDisabled[id][hor] === 1 && this.state.isCellDisabled[id][dec] === 1) {
          // console.log("blue"+id+hor)
          count++;
        }
        else {
          break
        }
      }
    }

    hor = dec;
    for (let index = 1; index < 5; index++) {
      hor--
      if (hor > -1) {
        if (this.state.isCellDisabled[id][hor] === 1 && this.state.isCellDisabled[id][dec] === 1) {
          // console.log("blue"+id+hor)
          count++;
        }
        else {
          break
        }
      }
    }

    hor = dec;
    for (let index = 1; index < 4; index++) {
      hor++
      if (hor < 7) {
        if (this.state.isCellDisabled[id][hor] === 2 && this.state.isCellDisabled[id][dec] === 2) {
          // console.log("yellow"+id+hor)
          count2++;
        }
        else {
          break
        }
      }
    }

    hor = dec;
    for (let index = 1; index < 4; index++) {
      hor--
      if (hor > -1) {
        if (this.state.isCellDisabled[id][hor] === 2 && this.state.isCellDisabled[id][dec] === 2) {
          // console.log("yellow"+id+hor)
          count2++;
        }
        else {
          break
        }
      }
    }
 
    // console.log(count+" "+count2)
    if (count >= 3){
      const Time = new Date()
      this.setState({endTime: Time.getTime()})
      var time1 =this.state.endTime - this.state.startTime 
      ReactDOM.render(<ShowWinner time={time1/1000}  winner={this.props.player[0]} count={this.state.winC1}/>,document.getElementById("root"))
    }
    if (count2 >= 3){
      const Time = new Date()
      this.setState({endTime: Time.getTime()})
      var time1 =this.state.endTime - this.state.startTime 
      ReactDOM.render(<ShowWinner time={time1/1000}  winner={this.props.player[1]} count={this.state.winC2}/>,document.getElementById("root"))
    }
  }

  vertical = (id,dec) =>{
    var count = 0;
    var count2 = 0;

    var hor = id;
    for (let index = 1; index < 5; index++) {
      hor++
      if (hor < 6) {
        if (this.state.isCellDisabled[hor][dec] === 1 && this.state.isCellDisabled[id][dec] === 1) {
          // console.log("blue"+dec+hor)
          count++;
        }
        else {
          break
        }
      }
    }

    hor = id;
    for (let index = 1; index < 5; index++) {
      hor--
      if (hor > -1) {
        if (this.state.isCellDisabled[hor][dec] === 1 && this.state.isCellDisabled[id][dec] === 1) {
          // console.log("blue"+dec+hor)
          count++;
        }
        else {
          break
        }
      }
    }

    hor = id;
    for (let index = 1; index < 4; index++) {
      hor++
      if (hor < 6) {
        if (this.state.isCellDisabled[hor][dec] === 2 && this.state.isCellDisabled[id][dec] === 2) {
          // console.log("yellow"+dec+hor)
          count2++;
        }
        else {
          break
        }
      }
    }

    hor = id;
    for (let index = 1; index < 4; index++) {
      hor--
      if (hor > -1) {
        if (this.state.isCellDisabled[hor][dec] === 2 && this.state.isCellDisabled[id][dec] === 2) {
          // console.log("yellow"+dec+hor)
          count2++;
        }
        else {
          break
        }
      }
    }
 
    if (count >= 3){
      const Time = new Date()
      this.setState({endTime: Time.getTime()})
      var time1 =this.state.endTime - this.state.startTime  
      ReactDOM.render(<ShowWinner time={time1/1000} winner={this.props.player[0]} count={this.state.winC1}/>,document.getElementById("root"))
      // alert("meow")
    }
    if (count2 >= 3){
      const Time = new Date()
      this.setState({endTime: Time.getTime()})
      var time1 =this.state.endTime - this.state.startTime   
      ReactDOM.render(<ShowWinner time={time1/1000} winner={this.props.player[1]} count={this.state.winC2}/>,document.getElementById("root"))
      // alert("meow")
    }
  }

  diagonal1=(id,dec)=> {
    var count = 0;
    var count2 = 0;

    var hor = id;
    var y = dec;
    for (let index = 1; index < 5; index++) {
      hor++
      y--
      if (hor < 6 && y > -1) {
        if (this.state.isCellDisabled[hor][y] === 1 && this.state.isCellDisabled[id][dec] === 1) {
          // console.log("blue"+y+hor)
          count++;
        }
        else {
          break
        }
      }
    }

    hor = id;
    y = dec;
    for (let index = 1; index < 5; index++) {
      hor--
      y++
      if (hor > -1 && y < 7) {
        if (this.state.isCellDisabled[hor][y] === 1 && this.state.isCellDisabled[id][dec] === 1) {
          // console.log("blue"+y+hor)
          count++;
        }
        else {
          break
        }
      }
    }

    hor = id;
    y = dec;
    for (let index = 1; index < 4; index++) {
      hor++
      y--
      if (hor < 6 && y > -1) {
        if (this.state.isCellDisabled[hor][y] === 2 && this.state.isCellDisabled[id][dec] === 2) {
          // console.log("yellow"+y+hor)
          count2++;
        }
        else {
          break
        }
      }
    }

    hor = id;
    y = dec;
    for (let index = 1; index < 4; index++) {
      hor--
      y++
      if (hor > -1 && y<7) {
        if (this.state.isCellDisabled[hor][y] === 2 && this.state.isCellDisabled[id][dec] === 2) {
          // console.log("yellow"+y+hor)
          count2++;
        }
        else {
          break
        }
      }
    }
    
    // console.log(count2 + " "+ count)
    if (count >= 3){
      const Time = new Date()
      this.setState({endTime: Time.getTime()})
      var time1 =this.state.endTime - this.state.startTime   
      ReactDOM.render(<ShowWinner time={time1/1000} winner={this.props.player[0]} count={this.state.winC1}/>,document.getElementById("root"))
      // alert("meow")
    }
    if (count2 >= 3){
      const Time = new Date()
      this.setState({endTime: Time.getTime()})
      var time1 =this.state.endTime - this.state.startTime 
      ReactDOM.render(<ShowWinner time={time1/1000} winner={this.props.player[1]} count={this.state.winC2}/>,document.getElementById("root"))
      // alert("meow")
    }
  }

  diagonal2=(id,dec)=> {
    var count = 0;
    var count2 = 0;

    var hor = id;
    var y = dec;
    for (let index = 1; index < 5; index++) {
      hor++
      y++
      if (hor < 6 && y < 7) {
        if (this.state.isCellDisabled[hor][y] === 1 && this.state.isCellDisabled[id][dec] === 1) {
          // console.log("blue"+y+hor)
          count++;
        }
        else {
          break
        }
      }
    }

    hor = id;
    y = dec;
    for (let index = 1; index < 5; index++) {
      hor--
      y--
      if (hor >-1 && y >-1) {
        if (this.state.isCellDisabled[hor][y] === 1 && this.state.isCellDisabled[id][dec] === 1) {
          // console.log("blue"+y+hor)
          count++;
        }
        else {
          break
        }
      }
    }

    hor = id;
    y = dec;
    for (let index = 1; index < 4; index++) {
      hor++
      y++
      if (hor < 6 && y > -1) {
        if (this.state.isCellDisabled[hor][y] === 2 && this.state.isCellDisabled[id][dec] === 2) {
          // console.log("yellow"+y+hor)
          count2++;
        }
        else {
          break
        }
      }
    }

    hor = id;
    y = dec;
    for (let index = 1; index < 4; index++) {
      hor--
      y--
      if (hor > -1 && y<7) {
        if (this.state.isCellDisabled[hor][y] === 2 && this.state.isCellDisabled[id][dec] === 2) {
          // console.log("yellow"+y+hor)
          count2++;
        }
        else {
          break
        }
      }
    }
    
    // console.log(count2 + " "+ count)
    if (count >= 3){
      const Time = new Date()
      this.setState({endTime: Time.getTime()})
      var time1 =this.state.endTime - this.state.startTime   
      ReactDOM.render(<ShowWinner time={time1/1000} winner={this.props.player[0]} count={this.state.winC1}/>,document.getElementById("root"))
      // alert("meow")
    }
    if (count2 >= 3){
      const Time = new Date()
      this.setState({endTime: Time.getTime()})
      var time1 =this.state.endTime - this.state.startTime 
      ReactDOM.render(<ShowWinner time={time1/1000} winner={this.props.player[1]} count={this.state.winC2}/>,document.getElementById("root"))
      // alert("meow")
    }
  }
  
  render() {
    return (
      <div>
        <audio autoPlay id="audio1"  src={aud} type="audio/mpeg"></audio>

        <div id="playe">
          <h1>Connect 4</h1>
          <h4>{this.state.time.toLocaleTimeString()}</h4>
          <h3>Player1: {this.props.player[0]} <button id="butIn1" type="button" disabled={true}></button></h3>
          <h3>Player2: {this.props.player[1]} <button id="butIn2" type="button" disabled={true}></button></h3>
        </div>

        <div id="playerInd">
          <h3>Next Player: {this.state.userName}</h3>
          <button id="butInd" type="button" disabled={true}></button>
        </div>

        <div id="tab">
         <table>
          <tbody>
            <tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
          </tbody>
        </table>
        </div>
        
      </div>
      
    );
  }
}

export default StartGame;
