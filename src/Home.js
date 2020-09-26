import React, { Component } from 'react';
import Header from './Components/Login';
import Login from './Components/Header';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <div>
        <Login />
        <Header />
      </div>
    );
  }
}

export default Home;



