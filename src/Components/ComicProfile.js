import React, { Component } from 'react';
import News from './News'
import axios from 'axios'
import "../stylesheets/Comicprofile.css"
import { BrowserRouter as Router, Route,Switch, Link, redirect, withRouter} from 'react-router-dom'
class ComicProfile extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = { comic:'', isAuthenticated:props.state};
  }
  componentWillMount(){
      axios.get('auth/login')
        .then(res =>{
            this.setState({isAuthenticated:res.data});
        }).catch(err => console.log(err));

    var comicId = this.props.match.params.id;
    console.log('comicID: ',comicId);
    axios.post('/data/comics', {comicId})
      .then(res =>{ console.log(res.data);
        if(res.data !== false){
        this.setState({ comic: res.data });
      }
      }).catch(err => console.log(err));
  };
  render() {
    return (
    <div className="comic-block">
    <img className="proCoverArt" src={this.state.comic.coverArt}/>
    <h1>Title: {this.state.comic.title} </h1>
    Series: {this.state.comic.series}
    <h3>Writers: {this.state.comic.writers}</h3>
    <h3>Editors: {this.state.comic.editors}</h3>
    <h4>Cover Artists: {this.state.comic.coverArtists}</h4>
    <p>Publisher: {this.state.comic.publisher}</p>
    <p>Date Published: {this.state.comic.datePublished}</p>
    <p>Characters: {this.state.comic.characters}</p>
    <p>Synopsis: {this.state.comic.synopsis}</p>
    </div>
  )
};

}
export default withRouter(ComicProfile);
