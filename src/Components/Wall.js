import React from 'react';
import axios from 'axios';
import "../stylesheets/Posts.css"
import "../stylesheets/Wall.css"
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";

class Wall extends React.Component {
  constructor(props) {
    super(props);
    console.log('props',props);
    this.state = { posts: props.state.posts, newPost:''};
    this.deletePost=this.deletePost.bind(this)
    this.handleSubmit =this.handleSubmit.bind(this);
  }
componentWillMount(){
  this.setState({posts:this.props.state.posts})
  axios.get('loadposts')
      .then(res =>{
        this.props.postChange(res.data);
        this.setState({posts: res.data});
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    var content = this.state.newPost;
    axios.post(`makepost`, {content}).then(()=> {console.log("in handleSubmit")})
    .catch(err => console.log(err));

    axios.get('loadposts')
        .then((res) => {
          this.props.postChange(res.data);
          this.setState({posts: res.data});
      });
    }
  validateForm() {
    return this.state.newPost.length > 0;
  }
  deletePost(objId)
  {
    var postid= objId;
    axios.post('deletepost', {postid})
        .then((res) => {
      });
      axios.get('loadposts')
          .then((res) => {
            this.props.postChange(res.data);
            this.setState({posts: res.data});
        });
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
        {this.state.posts.map(post => {return(<Posts key= {post.id} delete={this.deletePost} post= {post}/>)})}
      </div>
  )
};

}
const Posts =(props) =>{
  var time = props.post.time;
  var date = (props.post.date).toString();
  var d = new Date();
  var year=d.getFullYear(),month = d.getMonth()+1, day=d.getDate()
  var todaysDate =month+"-"+day+"-"+year
  if(date.localeCompare(todaysDate)===0)
    {date =''}
  return(
    <div className="postblock">
      <j className="dateonpost">{time} {date}</j>
      <img className="posterpic "src={props.post.posterpicture}/>
      <h4>{props.post.postername}:{props.post.content}</h4>
      <button className ="delete-button" onClick={() => props.delete(props.post.postid)} type ="delete">delete post</button>
    </div>);
}
export default Wall;
