import React from 'react';
import axios from 'axios';
import "../stylesheets/Timeline.css"
import "../stylesheets/Posts.css"
import "../stylesheets/Profile.css"
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";

class Profile extends React.Component {
constructor(props){
  super(props);
  this.state = {accounts:'', followers:[], following:[], isAuthenticated:props.isAuthenticated};
  this.handlePostChange = this.handlePostChange.bind(this);
}

componentWillMount(){
  var user = {first:'',last:'',id: '',username: '',pic: ''}
  axios.get('/api/getuser')
      .then(res =>{
        user.first = res.data.firstname;
        user.last = res.data.lastname;
        user.id = res.data.id;
        user.username = res.data.username;
        user.pic = res.data.profilepicture;
        console.log(user.first)
        this.setState({accounts: user});
        console.log(this.state.accounts.pic)
    });
      axios.get('profile/loadposts')
          .then(res =>{
            console.log('post data:',res.data)
            this.setState({posts: res.data});
        });
}
handlePostChange(status)
{
  this.setState({posts:status});
}
logout()
{
  axios.get('/auth/logout').then( res =>
  {
    console.log('logout:', res.data)
    this.setState({isAuthenticated:false})
  }).then(() => this.props.authCheck(false));

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
          <h3>Welcome {this.state.accounts.first}!</h3>
          <img src={this.state.accounts.pic} />
          <p className="changephoto"><Link className='changephotolink' to={`${this.props.match.url}/changephoto`}>change profile picture</Link></p>
          <h3>Name: {this.state.accounts.first} {this.state.accounts.last}</h3>
          <h7>username: @{this.state.accounts.username} </h7>
            <button className ="logout-button"
                type ="button"
                onClick = {event => this.logout()}
                >
                Logout
                </button>
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
          <Route exact path={this.props.match.url + '/timeline'}  render={() => <Timeline state={this.state} postChange ={this.handlePostChange}/>} />
      </div>
    </div>
  </Router>)
}
}
class Timeline extends React.Component {
  constructor(props) {
    super(props);
    console.log('props',props);
    this.state = { posts: props.state.posts, newPost:''};
    this.deletePost=this.deletePost.bind(this)
  }
componentWillMount(){
  this.setState({posts:this.props.state.posts})
  axios.get('loadposts')
      .then(res =>{
        console.log('post data:',res.data)
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
          console.log('post data:',res.data)
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
          console.log('deletepost data:',res.data)
      });
      axios.get('loadposts')
          .then((res) => {
            console.log('post data:',res.data)
            //console.log('props', props)
            //this.props.postChange(res.data);
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
      <button>comment</button>
      <button className ="delete-button" onClick={() => props.delete(props.post.postid)} type ="delete">delete post</button>
    </div>);
}


export default withRouter(Profile);
