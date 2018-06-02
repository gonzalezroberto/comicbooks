import React, { Component } from 'react';
import axios from 'axios'
import "../stylesheets/NewsProfile.css"
import { BrowserRouter as Router, Route,Switch, Link, redirect, withRouter} from 'react-router-dom'
class NewsProfile extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = { news:'', comments:[], newComment:'', auth:''};
  }
componentWillMount(){
    var newsId = this.props.match.params.id;
    axios.get('login')
      .then(res =>{
          this.setState({auth:res.data});
      }).catch(err => console.log(err));
    axios.post('/news/getarticle', {newsId})
      .then(res =>{ console.log(res.data);
        if(res.data !== false){
        this.setState({ news: res.data });}
      }).catch(err => console.log(err));
    axios.post('/news/getcomments', {newsId})
      .then(res =>{ console.log(res.data);
        this.setState({ comments: res.data });})
      .catch(err => console.log(err));
  };
  handleSubmit = event => {
    event.preventDefault();
    var newsId = this.props.match.params.id;
    var comment = this.state.newComment;
    console.log('newcom', comment)
    axios.post(`/news/postcomment`, {comment, newsId})
    .catch(err => console.log(err));
    axios.post('/news/getcomments', {newsId})
      .then(res =>{ console.log(res.data);
        this.setState({ comments: res.data });})
      .catch(err => console.log(err));
    }
  validateForm() {
    return this.state.newComment.length > 0 &&this.state.auth;
  }
  render() {
    return (
    <div className="news-block">
    <h4 className="newstitle">{this.state.news.content} </h4>
    <img className="newsCoverArt" src={this.state.news.coverart} width='400px' height='500px'/>

    <p>posted: {this.state.news.dateposted}</p>
    <p>Link to original post: <a href={this.state.news.newslink}>{this.state.news.newslink}</a>  </p>
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
};

}
const Comment =(props) =>{
  return(
    <div className="comment">
      <j className="dateoncomment">{props.comment.time} {props.comment.date}</j>
      <img className="posterpic"src={props.comment.posterpic}/>
      <h4 className="commentername">{props.comment.postername}:{props.comment.comment}</h4>
    </div>);
}
export default withRouter(NewsProfile);
