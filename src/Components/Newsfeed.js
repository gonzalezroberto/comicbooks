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
    axios.get('/api/loadnews')
      .then(res =>{ console.log(res.data)
        this.setState({news:res.data});
      }).catch(err => console.log(err));
  };
  render() {
    return (
      <div className ="main-news">
        <div className="news-title-area"><h5 className="newsfeed-title"></h5></div>
        <ul className="news-block">
        {this.state.news.map(news => {return( <News key= {news.id} news= {news}/>)})}
        </ul>
      </div>
  )};

}
export default withRouter(Newsfeed);
