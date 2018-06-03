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
    this.state = { comic:'', isAuthenticated:false,
      rating:'', isHidden:!false, showPopup: false,
      comicsub:{img:'',title:'',series:'',writer:'', artist:'',editor:'',publisher:'',datepublished:'',characters:'',synopsis:''}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
  }
  componentWillMount(){
    var comicId = this.props.match.params.id;
    axios.get('/data/login')
      .then(res =>{console.log('login:', res.data)
        this.props.authCheck(res.data)
          this.setState({isAuthenticated:res.data});
      }).catch(err => console.log(err));
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
  componentDidMount(){
    var comicId = this.props.match.params.id;
  if(this.state.isAuthenticated || this.props.state.isAuthenticated){
    console.log('checking priv...')
    axios.post('/data/checkpriv',{comicId})
      .then(res =>{
          this.setState({isHidden:!res.data});
      }).catch(err => console.log(err));
  }
  }
  togglePopup(){
  this.setState({
    showPopup: !this.state.showPopup
  });
  var comicsub = Object.assign({}, this.state.comic);
  this.setState({comicsub});
}
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
handleChange2 =(event, value)=> {
  let comicsub = Object.assign({}, this.state.comicsub);
  comicsub[value] = event;
  this.setState({comicsub});
}
handleSubmit = event => {
  event.preventDefault()
  var comicchange = this.state.comicsub
  axios.post(`/data/update`, {comicchange})
    .catch(error => {console.log("error")});
  var comicId = this.props.match.params.id;
  axios.post('/data/comics', {comicId})
    .then(res =>{
      if(res.data !== false){
      this.setState({ comic: res.data });}
    }).catch(err => console.log(err));
  var comicsub = Object.assign({}, this.state.comic);
  this.setState({comicsub});
}
  render() {
    return (
    <div className="comic-block">
      <div className="comic-title"><h1>{this.state.comic.title} </h1></div>
      <img className="proCoverArt" src={this.state.comic.coverArt}/>
        <div className="rating"><Rating
          placeholderRating ={parseInt(this.state.rating)}
          emptySymbol={<img src="https://upload.wikimedia.org/wikipedia/commons/1/18/Five-pointed_star.svg" className="icon" />}
          placeholderSymbol={<img src="https://upload.wikimedia.org/wikipedia/commons/3/34/Red_star.svg" className="icon" />}
          fullSymbol={<img src="https://upload.wikimedia.org/wikipedia/commons/3/34/Red_star.svg" className="icon" />}
          onChange={(event) => {this.handleChange(event);}}/>
        <b>{this.state.rating} of 5</b>

      <div className="comic-info">
        <div>
          {!this.state.isHidden && <button className ="editCom"
                type ="button"
                onClick = {this.togglePopup.bind(this)}
                >
                Edit Comic
                </button>}
                {this.state.showPopup? <Popup text ='close'
                  comic ={this.state.comic}
                  change={this.handleChange2.bind(this)}
                  submit={this.handleSubmit.bind(this)}
                  closePopup={this.togglePopup.bind(this)}/>
                  :null}
        </div>
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
class Popup extends React.Component{
  constructor(props)
  {
    console.log('popup props:' , props)
    super(props);
  }
  render(){
    return(
      <div className='popup'>
        <div className='popup_inner'>
          <div className='inputs'>
         <input className="img" id="coverArt"type="text"
           onChange =  {event => this.props.change(event.target.value,event.target.id)}
           placeholder="img URL" defaultValue ={this.props.comic.coverArt}/>
         <input className="title" id="title"type="text"
           onChange =  {event => {this.props.change(event.target.value,event.target.id)}}
           placeholder="Title" defaultValue ={this.props.comic.title}/>
         <input className="series" id="series"type="text"
           onChange =  {event => {this.props.change(event.target.value,event.target.id)}}
           placeholder="Series" defaultValue ={this.props.comic.series}/>
         <input className="writer" id="writers"type="text"
           onChange = {event => this.props.change(event.target.value,event.target.id)}
           placeholder="Writer" defaultValue ={this.props.comic.writers}/>
         <input className="artist" id="coverArtists"type="text"
           onChange =  {event => this.props.change(event.target.value,event.target.id)}
           placeholder="Cover Artists" defaultValue ={this.props.comic.coverArtists}/>
         <input className="editor" id="editors"type="text"
           onChange =  {event => this.props.change(event.target.value,event.target.id)}
           placeholder="Editor" defaultValue ={this.props.comic.editors}/>
         <input className="publish" id="publisher"type="text"
           onChange =  {event => this.props.change(event.target.value,event.target.id)}
           placeholder="Publisher" defaultValue ={this.props.comic.publisher}/>
         <input className="date" id="datePublished" type="text"
           onChange =  {event => this.props.change(event.target.value,event.target.id)}
            placeholder="Data Published" defaultValue ={this.props.comic.datePublished}/>
          <input className="characters-form" id="characters"type="text"
           onChange =  {event => this.props.change(event.target.value,event.target.id)}
            placeholder="Characters" defaultValue ={this.props.comic.characters}/>
          <input className="synopsis" id="synopsis"type="text"
           onChange = {event => this.props.change(event.target.value,event.target.id)}
            placeholder="Synopsis" defaultValue ={this.props.comic.synopsis}/>
        </div>
        <button onClick = {this.props.submit}type="button">Submit Change</button>
        <button onClick={this.props.closePopup}>Close</button>
      </div>
    </div>
    );
  }
}
export default withRouter(ComicProfile);
