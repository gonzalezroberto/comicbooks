import React from 'react';
import axios from 'axios';
import "../stylesheets/UsersOnProfile.css"
import { BrowserRouter as Router, Route,Switch, Link, withRouter, Redirect} from 'react-router-dom'

class UsersFollower extends React.Component {
  constructor(props) {
    super(props);
    console.log('User props',props);
    this.state = { users: props.users };
  }
  render() {
    return (
      <Router>
      <div>
      Followers:
        {this.state.users.map(user => {return(<User2 key={user.followed} users={user}/>)})}
      </div>
      </Router>
  )};
}
const User2 =(props) =>{
  return(
    <a href={'/users/' + props.users.follower}>
    <div className="followed-block">
      <img className="followedpic "src={props.users.followerpic}/>
      <h4 className="followedname">{props.users.followername}</h4>
    </div></a>
  );
}
export default UsersFollower;
