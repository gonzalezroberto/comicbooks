import React, { Component } from 'react';
import axios from 'axios'
import { BrowserRouter as Router, Route,Switch, Link, redirect, withRouter} from 'react-router-dom'
class NewsProfile extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = { news:''};
  }
componentWillMount(){
    var newsId = this.props.match.params.id;
    console.log('newsId: ',newsId);
    axios.post('/news/getarticle', {newsId})
      .then(res =>{ console.log(res.data);
        if(res.data !== false){
        this.setState({ news: res.data });
      }
      }).catch(err => console.log(err));
  };
  render() {
    return (
    <div className="news-block">
    <h1>Title: {this.state.news.content} </h1>
    <img className="proCoverArt" src={this.state.news.coverart} width='400px' height='500px'/>

    <p>posted: {this.state.news.dateposted}</p>
    <p>Link to original post: {this.state.news.newslink} </p>
    </div>
  )
};

}
export default withRouter(NewsProfile);
