import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './Home.css';
import StartGame from "./StartGame";
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Link,Route} from 'react-router-dom';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {p1:"",p2:"",c1:"",c2:""}
  }
  render() {
    return (
      <Router>
      <div className="App">
        <br/><br/><br/>
        <Link to="/"><button class="btn btn-primary">Home</button></Link>
        &nbsp;&nbsp;&nbsp;
        <Link to="/player"><button class="btn btn-info">Player Selection</button></Link><br/><br/>


          <Route exact path="/" render={
            () => {
              return (
                <div>
                  <br/>
                  <h1>Connect 4</h1>
                  <h2 id="sp">Objective</h2>
                  <p>Connect four of your checkers in a row either horizontally or vertically or diagonally</p>
                  <p> while preventing your opponent from doing the same</p>
                  <h2>Rules</h2>
                  <ul>
                    <li>Player cannot click on already occupied spot</li>
                    <li>Player has to wait for one turn after selecting a spot</li>
                    <li>Player cannot select from a coloumn which is already full</li>
                  </ul>
                </div>
              )
            }
          }/>

          <Route exact path="/player" render={
            () => {
              return (
                <div>
                  <h1>Player Selection</h1>
                  <br/><br/>
                  <input type="text" name="p1" onChange={this.changeName} placeholder="Enter player1 name"></input>&nbsp;&nbsp;
                  <input type="text" name="c1" onChange={this.changeColor} placeholder="Enter color1"></input><br/><br/>
                  <input type="text" name="p2" onChange={this.changeName} placeholder="Enter player2 name"></input>&nbsp;&nbsp;
                  <input type="text" name="c2" onChange={this.changeColor} placeholder="Enter color2"></input><br/><br/>
                  <button type="button" onClick={this.start} class="btn btn-success"><span class="spinner-border spinner-border-sm"></span>Start Game...</button>

                </div>
              )
            }
          }/>

      </div>
      </Router>
  );}
  changeName = (ele) => {
    if (ele.target.name ==="p1") {
      this.setState({p1:ele.target.value})
    }
    if (ele.target.name ==="p2") {
      this.setState({p2:ele.target.value})
    } 
  }
  changeColor = (ele) => {
    if (ele.target.name ==="c1") {
      this.setState({c1:ele.target.value})
    }
    if (ele.target.name ==="c2") {
      this.setState({c2:ele.target.value})
    } 
  }
  start = () => {
    var players = [this.state.p1,this.state.p2];
    var colors = [this.state.c1,this.state.c2];
    ReactDOM.render(<StartGame player={players} color={colors}/>,document.getElementById("root"))
  }
}

export default App;
