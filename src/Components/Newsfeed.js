import React, { Component } from 'react';
import Comicbook from './Comicbook';
import News from './News'
import "../stylesheets/newsfeed.css"
class Newsfeed extends Component {
  constructor() {
    super();
    this.state = { news: [] };
  }
  componentDidMount(){
    fetch('/api/loadnews')
      .then(result => result.json())
      .then(json => {
        console.log(json)
        this.setState({news:json});
      });
  };
  render() {
    return (
      <div className ="main">
        <h5>Newsfeed v1</h5>
  <ul>
  {this.state.news.map(news => {
  return <News news= {news}/>;
  })}
  </ul>
    </div>

  )};

}

export default Newsfeed;
