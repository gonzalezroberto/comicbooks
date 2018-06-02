import React from 'react';
import axios from 'axios';
import "../stylesheets/Timeline.css"
import "../stylesheets/Profile.css"
import "../stylesheets/UsersOnProfile.css"
import Timeline from "./Timeline"
import UsersFollowed from "./UsersFollowed"
import UsersFollower from "./UsersFollowers"
import Wall from "./Wall"
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, withRouter, Switch } from "react-router-dom";

class Profile extends React.Component {
constructor(props){
  super(props);
  console.log('profile props:', props);
  this.state = {accounts:'', posts:[] ,followers:[], following:[], isAuthenticated:props.state};
  this.handlePostChange = this.handlePostChange.bind(this);
}

componentWillMount(){

  axios.get('/api/getuser')
      .then(res =>{
        var user = {
          first:res.data.firstname,
          last:res.data.lastname,
          id: res.data.id,
          username: res.data.username,
          pic: res.data.profilepicture
        }
        this.setState({accounts: user});
    });
  axios.get('profile/loadposts')
      .then(res =>{
        console.log('post data:',res.data)
        this.setState({posts: res.data});
    });
  axios.get('profile/loadfollowers')
      .then(res =>{
        console.log('followers:',res.data)
        this.setState({followers: res.data});
    });
  axios.get('profile/loadfollowing')
      .then(res =>{
        console.log('following:',res.data)
        this.setState({following: res.data});
    });
}
handlePostChange(status)
{
  this.setState({posts:status});
}
logout()
{
  axios.get('/auth/logout').then( res =>{
    console.log('logout:', res.data)
    this.setState({isAuthenticated:false})})
    .then(() => this.props.authCheck(false));
}
render()
{
  return(
    <Router>
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
            <Link to={`${this.props.match.url}/wall`}>Your Wall</Link>
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
          <Route exact path={this.props.match.url + '/'}  render={() => <Timeline state={this.state} postChange ={this.handlePostChange}/>} />
          <Route exact path={this.props.match.url + '/wall'}  render={() => <Wall state={this.state} postChange ={this.handlePostChange}/>} />
          <Route exact path={this.props.match.url + '/following'}  render={(props) => <UsersFollowed {...props} users={this.state.following}/>} />
          <Route exact path={this.props.match.url + '/followers'}  render={(props) => <UsersFollower {...props} users={this.state.followers}/>} />

      </Switch>
    </div>
    </div>
  </Router>
)
}
}

export default Profile;
