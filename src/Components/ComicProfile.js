import React, { Component } from 'react';
import News from './News'
import axios from 'axios'
import "../stylesheets/Comicprofile.css"
import { BrowserRouter as Router, Route,Switch, Link, redirect, withRouter} from 'react-router-dom'
var Rating = require('react-rating');
class ComicProfile extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = { comic:'', isAuthenticated:props.state, rating:''};
    this.handleChange = this.handleChange.bind(this);
  }
  componentWillMount(){
    axios.get('/data/login')
      .then(res =>{
          this.setState({isAuthenticated:res.data});
      }).catch(err => console.log(err));
    var comicId = this.props.match.params.id;
    axios.post('/data/comics', {comicId})
      .then(res =>{
        if(res.data !== false){
        this.setState({ comic: res.data });}
      }).catch(err => console.log(err));
    axios.post('/data/getrating', {comicId})
      .then(res =>{
        this.setState({ rating: res.data })
      }).catch(err => console.log(err));
  };
handleChange = event =>
{
  var comicId = this.props.match.params.id;
  var rating = event;
  console.log(event);
  axios.post('/data/rating', {comicId, rating})
    .catch(err => console.log(err));
  axios.post('/data/getrating', {comicId})
    .then(res =>{
      this.setState({ rating: res.data })
    }).catch(err => console.log(err));
}
  render() {
    return (
    <div className="comic-block">
      <h1>{this.state.comic.title} </h1>
      <img className="proCoverArt" src={this.state.comic.coverArt}/>
        <div className="rating"><Rating
          placeholderRating ={this.state.rating}
          emptySymbol={<img src="https://upload.wikimedia.org/wikipedia/commons/1/18/Five-pointed_star.svg" className="icon" />}
          placeholderSymbol={<img src="https://upload.wikimedia.org/wikipedia/commons/3/34/Red_star.svg" className="icon" />}
          fullSymbol={<img src="https://upload.wikimedia.org/wikipedia/commons/3/34/Red_star.svg" className="icon" />}
          onChange={(event) => {this.handleChange(event);}}/>
        <b>{this.state.rating} of 5</b>
      <div>
        <ul>
      <li>Series: {this.state.comic.series}</li>
      <li>Writers: {this.state.comic.writers}</li>
      <li>Editors: {this.state.comic.editors}</li>
      <li>Cover Artists: {this.state.comic.coverArtists}</li>
      <li>Publisher: {this.state.comic.publisher}</li>
      <li>Published: {this.state.comic.datePublished}</li>
      <li>Characters: {this.state.comic.characters}</li>
      <li>Synopsis: {this.state.comic.synopsis}</li>
      </ul>
      </div>
      </div>
    </div>
  )
};

}
export default withRouter(ComicProfile);
