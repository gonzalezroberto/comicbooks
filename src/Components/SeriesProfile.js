import React from 'react';
import axios from 'axios';
import "../stylesheets/Searchbar.css";
import "../stylesheets/SeriesProfile.css";
import Comicbook from "../Components/Comicbook"
import { BrowserRouter as Router, Route,Switch, Link, withRouter, Redirect} from 'react-router-dom'
const Item = ({item}) =>
<li className="searchres"><Link to={'/comic/' + item.cid} > </Link>
  <Link to={"/comic/"+item.cid}> <img src={item.coverArt} className="searchpic"/>
  <div className ="searchres"><h2 className="searchrestitle">{item.title} by {item.writers}</h2>
  <container className="characters"> <h4>Characters: {item.characters}</h4><h5>Series: {item.series}</h5></container>
  </div>
  </Link>
    </li>
//const Item = ({item}) =>  <li><a href={'/comic/'+ String(item.id)}> {item.title} by {item.writers} </a> <a href={'/comic/'+String(item.id)}> <img src={item.coverArt}/> </a> </li>
const List = ({items,query}) => {
  let filteredItems = items.filter( item => item.title.toLowerCase().includes(query) || item.writers.toLowerCase().includes(query) || item.characters.toLowerCase().includes(query));
  if(!filteredItems.length && query) return <div> No Match for "{query}"</div>
  return (
    <ul2>
      {
        filteredItems.map( item => <Item key = {item.id} {...{item}}
        />)
      }
     </ul2>
  )
}

class SeriesProfile extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      items: [],
      query: '',
      comments:[],
      newComment:'',
      auth:''
    }
}

componentWillMount(){
  var series = this.props.match.params.series;
  axios.get('login')
    .then(res =>{
        this.setState({auth:res.data});
    }).catch(err => console.log(err));
  axios.post('/series/comics', {series})
    .then(res =>{ console.log(res.data);
      this.setState({ items: res.data });})
    .catch(err => console.log(err));
  axios.post('/series/getcomments', {series})
    .then(res =>{ console.log(res.data);
      this.setState({ comments: res.data });})
    .catch(err => console.log(err));
}
handleSubmit = event => {
  event.preventDefault();
  var series = this.props.match.params.series;
  var comment = this.state.newComment;
  console.log('newcom', comment)
  axios.post(`/series/postcomment`, {comment, series})
  .catch(err => console.log(err));
  axios.post('/series/getcomments', {series})
    .then(res =>{ console.log(res.data);
      this.setState({ comments: res.data });})
    .catch(err => console.log(err));
  }
  validateForm() {
    return this.state.newComment.length > 0 &&this.state.auth;
  }
render = () => (
    <div>
    <h2 className="series-header">{this.props.match.params.series}</h2>
      <List {...this.state} />
      <h4>Comments:</h4>
        <form className="commentform">
        <input className ="comment-post"
        type ="text"
        placeholder ="Leave a comment"
        onChange = {event => this.setState({newComment: event.target.value})}
         />
     </form>
     <button className ="submit" onClick={this.handleSubmit.bind(this)} disabled={!this.validateForm()} type ="submit">Post</button>
      <div className="commentblock">{this.state.comments.map(comment => {return(<Comment key= {comment.commentid} comment= {comment}/>)})}</div>
    </div>
)
}
const Comment =(props) => {
  return(
    <div className="comment">
      <j className="dateoncomment">{props.comment.time} {props.comment.date}</j>
      <img className="posterpic"src={props.comment.posterpic}/>
      <h4 className="commentername">{props.comment.postername}:{props.comment.comment}</h4>
    </div>);
}
export default SeriesProfile;
