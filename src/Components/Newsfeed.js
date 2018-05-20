import React, { Component } from 'react';
import News from './News'
import "../stylesheets/newsfeed.css"
import { BrowserRouter as Router, Route,Switch, Link, redirect, withRouter} from 'react-router-dom'
class Newsfeed extends Component {
  constructor(props) {
    super(props);
    this.state = { news: [], loggedIn: props.state.data };
    console.log("this.state.loggedIn :" , this.state.loggedIn )
  }
  // componentDidMount(){
  //   fetch('/api/loadnews')
  //     .then(result => result.json())
  //     .then(json => {
  //       console.log(json)
  //       this.setState({news:json});
  //     });
  // };
  render() {
    return (
      <div className ="main">
        <h5>Newsfeed v100</h5>
  <ul>
  {this.state.news.map(news => {
  return <News news= {news}/>;
  })}
  </ul>
    </div>

  )};

}

export default Newsfeed;
