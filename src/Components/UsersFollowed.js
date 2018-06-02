import React from 'react';
import axios from 'axios';
import "../stylesheets/UsersOnProfile.css"
import { BrowserRouter as Router, Route,Switch, Link, withRouter, Redirect} from 'react-router-dom'

class UsersFollowed extends React.Component {
  constructor(props) {
    super(props);
    console.log('User props',props);
    this.state = { users: props.users };
  }
  render() {
    return (
      <Router>
      <div>
        {this.state.users.map(user => {return(<User2 key={user.followed} users={user}/>)})}
      </div>
      </Router>
  )};
}
const User2 =(props) =>{
  return(
    <a href={'/users/' + props.users.followed}>
    <div className="followed-block">
      <img className="followedpic "src={props.users.followedpic}/>
      <h4 className="followedname">{props.users.followedname}</h4>
    </div></a>
  );
}
export default UsersFollowed;
