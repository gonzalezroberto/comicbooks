import React, { Component } from 'react';
import News from './News'
import axios from 'axios'
import "../stylesheets/newsfeed.css"
import { BrowserRouter as Router, Route,Switch, Link, redirect, withRouter} from 'react-router-dom'
class Newsfeed extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = { news: [] };
  }
  componentWillMount(){
    var hi = 0;
    axios.get('/api/loadnews')
      .then(res =>{
        hi =res;
        this.setState({news:res.data});
      }).catch(err => console.log(err));

  };
  render() {
    return (
      <div className ="main">
        <h5>Newsfeed</h5>
        <ul>
          <p>
        {this.state.news.map(news => {return( <News key= {news.id} news= {news}/>)})}
        </p>
        </ul>
      </div>
  )};

}
export default withRouter(Newsfeed);
