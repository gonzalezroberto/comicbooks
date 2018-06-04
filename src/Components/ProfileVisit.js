import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import "../stylesheets/Timeline.css"
import "../stylesheets/Posts.css"
import "../stylesheets/Profile.css"
import UsersFollowed from "./UsersFollowed"
import UsersFollower from "./UsersFollowers"
import { BrowserRouter as Router, Route, Link, withRouter, Switch } from "react-router-dom";
class ProfileVisit extends React.Component {
constructor(props){
  console.log("visitor props", props);
  super(props);
  this.state = {accounts:'',currentId:'',isFollowed:'', posts:[] ,followers:[], following:[], auth:props.state, id:props.match.params.id};
  this.handlePostChange = this.handlePostChange.bind(this);
  this.follow = this.follow.bind(this);
}

componentWillMount(){
  var receiverid = this.props.match.params.id;
  this.setState({currentId:receiverid});
  var loadid = receiverid;
  axios.post('getuser', {loadid})
    .then(res =>{this.setState({ accounts: res.data });})
    .catch(err => console.log(err));
  axios.post('/users/loadposts', {receiverid})
    .then(res => {this.setState({ posts: res.data })})
    .catch(err => console.log(err))
  axios.get('login')
    .then(res =>{this.setState({auth:res.data});})
    .catch(err => console.log(err));
  axios.post('checkIfFollowed', {receiverid})
    .then(res =>{this.setState({isFollowed:res.data})})
    .catch(err => console.log(err));
  axios.post('loadfollowers', {receiverid})
    .then(res =>{this.setState({followers: res.data});});
  axios.post('loadfollowing',{receiverid})
    .then(res =>{this.setState({following: res.data})})
}
validateUser(){
  return (this.state.auth && !this.state.isFollowed)
}
follow(){
  var receiverid = this.state.currentId;
  var receiverInfo = this.state.accounts;
  axios.post('/users/follow', {receiverid, receiverInfo})
  .then(res => {console.log('follow res', res);this.setState({isFollowed:res.data})})
}
handlePostChange(status){
  this.setState({posts:status});
}
makepost(content, receiverid){
  axios.post('/users/makepost', {content, receiverid})
  .catch(err => console.log(err));
  axios.post('/users/loadposts', {receiverid})
}
render()
{
  return(<Router>
    <div style={{ display: "flex" }}>
      <div
        style={{
          padding: "10px",
          width: "40%",
          background: "#f0f0f0"
        }}
      >
        <ul style={{ listStyleType: "none", padding: 0 }}>
          <div>{this.state.accounts.firstname} {this.state.accounts.lastname}</div>
          <img src={this.state.accounts.profilepicture} />
          <div>Name: {this.state.accounts.firstname} {this.state.accounts.lastname}</div>
          <h7>username: @{this.state.accounts.username}</h7> <button className ="followbutton" onClick={this.follow} disabled={!this.validateUser()} type ="submit">follow+</button>
          <li>
            <Link to={`${this.props.match.url}`}>Wall</Link>
          </li>
          <li>
            <Link to={`${this.props.match.url}/followers`}>Followers</Link>
          </li>
          <li>
            <Link to={`${this.props.match.url}/following`}>Following</Link>
          </li>
        </ul>
      </div>
      <div style={{ flex: 1, padding: "10px" }}>
        <Switch>
            <Route exact path={this.props.match.url}  render={(props) =>
                <Timeline {...props} state={this.state} makePost={this.makepost} postChange ={this.handlePostChange}/>}/>
            <Route exact path={this.props.match.url + '/following'}  render={(props) => <UsersFollowed {...props} users={this.state.following}/>} />
            <Route exact path={this.props.match.url + '/followers'}  render={(props) => <UsersFollower {...props} users={this.state.followers}/>} />
          </Switch>
    </div>
    </div>
  </Router>)
}
}
class Timeline extends React.Component {
  constructor(props) {
    super(props);
    console.log('Timeline props',props);
    this.state = { posts: props.state.posts, newPost:'', auth:props.state.auth, id:props.state.id};
  }
  componentWillMount()
  {
    var receiverid=this.props.state.currentId
    axios.post('/users/loadposts', {receiverid})
      .then(res => {this.setState({ posts: res.data })})
      .catch(err => console.log(err))
  }
  handleSubmit = event => {
    event.preventDefault();
    var content = this.state.newPost;
    var receiverid = this.state.id;
    this.props.makePost(content, receiverid);
    axios.post('/users/loadposts', {receiverid})
        .then(res =>{
          console.log('loadpost visitor data:', res.data)
          this.props.postChange(res.data);
          this.setState({posts: res.data});})
  }
  validateForm() {
    return (this.state.newPost.length > 0 && this.state.auth)
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
        <input className ="user-post"
        type ="text"
        placeholder ={"Say hi to " + this.props.state.accounts.firstname}
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
  var d = new Date();
  var time = props.post.time, date = (props.post.date).toString();
  var year=d.getFullYear(),month = d.getMonth()+1, day=d.getDate()
  var todaysDate =month+"-"+day+"-"+year
  if(date.localeCompare(todaysDate)===0){date =''}
  return(
    <div className="postblock">
      <j className="dateonpost">{time} {date}</j>
      <img className="posterpic "src={props.post.posterpicture}/>
      <div><h4>{props.post.postername}:</h4> {props.post.content}</div>
    </div>);
}
export default ProfileVisit;
