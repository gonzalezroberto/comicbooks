import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import "../stylesheets/Timeline.css"
import "../stylesheets/Posts.css"
import "../stylesheets/Profile.css"
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";
class ProfileVisit extends React.Component {
constructor(props){
  console.log("visitor props", props);
  super(props);
  this.state = {accounts:'', posts:[] ,followers:[], following:[], auth:props.state, id:props.match.params.id};
  this.handlePostChange = this.handlePostChange.bind(this);
}

componentWillMount(){
  var receiverid = this.props.match.params.id;
  var loadid = this.props.match.params.id;
  console.log('receiverid', receiverid);
  axios.post('getuser', {loadid})
    .then(res =>{ console.log('get.user data:', res.data);
      this.setState({ accounts: res.data });
    }).catch(err => console.log(err));

  axios.post('loadposts', {receiverid})
      .then(res =>{
        console.log('loadpost visitor data:',res.data)
        this.setState({posts: res.data});
    });
    axios.get('login') // authenticing
      .then(res =>{
        console.log('res in ProfileVisit:',res)
          this.setState({auth:res.data});
      }).catch(err => console.log(err));
}
handlePostChange(status)
{
  this.setState({posts:status});
}
makepost(content, receiverid)
{
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
          <h3>{this.state.accounts.firstname} {this.state.accounts.lastname}</h3>
          <img src={this.state.accounts.profilepicture} />
          <p className="changephoto"><Link className='changephotolink' to={`${this.props.match.url}/changephoto`}>change profile picture</Link></p>
          <h3>Name: {this.state.accounts.first} {this.state.accounts.last}</h3>
          <h7>username: @{this.state.accounts.username} </h7>
          <li>
            <Link to={`${this.props.match.url}/timeline`}>Timeline</Link>
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
          <Route exact path={this.props.match.url + '/timeline'}  render={(props) => <Timeline {...props} state={this.state}
            makePost={this.makepost} postChange ={this.handlePostChange}/>} />
      </div>
    </div>
  </Router>)
}
}
class Timeline extends React.Component {
  constructor(props) {
    super(props);
    console.log('props',props);
    this.state = { posts: props.state.posts, newPost:'', auth:props.state.auth, id:props.state.id};
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
  // deletePost(objId)
  // {
  //   var postid= objId;
  //   axios.post('deletepost', {postid})
  //       .then((res) => {
  //         console.log('deletepost data:',res.data)
  //     });
  //     axios.get('loadposts')
  //         .then((res) => {
  //           console.log('post data:',res.data)
  //           //console.log('props', props)
  //           //this.props.postChange(res.data);
  //           this.setState({posts: res.data});
  //       });
  // }
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
      <button>comment</button>
    </div>);
}
export default ProfileVisit;
