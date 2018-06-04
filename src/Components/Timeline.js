import React from 'react';
import axios from 'axios';
import "../stylesheets/Timeline.css"
import "../stylesheets/Posts.css"
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";

class Timeline extends React.Component {
  constructor(props) {
    super(props);
    console.log('props',props);
    this.state = { posts: [], newPost:'', following:[], currentId:''};
    this.deletePost=this.deletePost.bind(this)
  }
componentWillMount(){
  axios.get('profile/loadtimeline')
      .then(res =>{
        console.log('load timeline:',res.data)
        this.setState({posts: res.data});
    });
  axios.get('profile/loadfollowing')
      .then(res =>{this.setState({following: res.data});});
  axios.get('profile/getid')
      .then(res =>{this.setState({currentId: res.data});});
    var tempFollowing = this.state.following.slice();
    tempFollowing.push({followed:this.state.currentId})
    var posts = []
      for (var j = 0; i < this.state.posts.length; j++){
        for (var i = 0; i < tempFollowing.length; i++){
         if(this.state.posts[j].posterid === tempFollowing[i].followed){
           posts.push(this.state.posts[j]);
         }
       }
   }
   this.setState({posts:posts})
 };

  handleSubmit = event => {
    event.preventDefault();
    var content = this.state.newPost;
    axios.post(`profile/makepost`, {content})
    .then(()=> {console.log("in handleSubmit")})
    .catch(err => console.log(err));

    axios.get('profile/loadtimeline')
        .then(res =>{
          console.log('load timeline:',res.data)
          this.setState({posts: res.data});
      });
    var tempFollowing = this.state.following.slice();
    tempFollowing.push({followed:this.state.currentId})
    var posts = []
      for (var j = 0; i < this.state.posts.length; j++){
        for (var i = 0; i < tempFollowing.length; i++){
         if(this.state.posts[j].posterid === tempFollowing[i].followed){
           posts.push(this.state.posts[j]);
         }
       }
   }
   this.setState({posts:posts})
  }
  validateForm() {
    return this.state.newPost.length > 0;
  }
  deletePost(objId)
  {
    var postid = objId;
    axios.post('profile/deletepost', {postid})
    .then((res) => {
      console.log('deletepost data:',res.data)
      });
      axios.get('profile/loadtimeline')
          .then(res =>{
            console.log('load timeline:',res.data)
            this.setState({posts: res.data});
        });
      var tempFollowing = this.state.following.slice();
      tempFollowing.push({followed:this.state.currentId})
      var posts = []
        for (var j = 0; i < this.state.posts.length; j++){
          for (var i = 0; i < tempFollowing.length; i++){
           if(this.state.posts[j].posterid === tempFollowing[i].followed){
             posts.push(this.state.posts[j]);
           }
         }
     }
     this.setState({posts:posts})
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
        <input className ="user-post"
        type ="text"
        placeholder ="What is on your mind?"
        onChange = {(event) => this.setState({newPost: event.target.value})}
         />

       <button className ="submit" disabled={!this.validateForm()} type ="submit">Post</button>
       </form>
        {this.state.posts.map(post => {return(<Posts id={this.state.currentId}key={post.id} delete={this.deletePost} post= {post}/>)})}
      </div>
  )};
}

const Posts =(props) =>{
  var d = new Date();
  var time = props.post.time, date = (props.post.date).toString();
  var year=d.getFullYear(),month = d.getMonth()+1, day=d.getDate()
  var todaysDate =month+"-"+day+"-"+year
  if(date.localeCompare(todaysDate)===0){date =''}
  return(
    <div className="postblock">
      <j className="dateonpost">{time} {date}</j>
      <img className="posterpic "src={props.post.posterpicture}/>
      <div><h4>{props.post.postername}:</h4> <h7>{props.post.content}</h7></div>
      {(props.post.receiverid===props.id || props.post.posterid===props.id) &&
        <button className ="delete-button" onClick={() => props.delete(props.post.postid)}
          type ="delete">delete post</button>}
    </div>);
}

export default Timeline;
