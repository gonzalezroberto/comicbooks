import React from 'react';
import axios from 'axios';
import "../stylesheets/Users.css"
import { BrowserRouter as Router, Route,Switch, Link, withRouter, Redirect} from 'react-router-dom'

class Users extends React.Component {
  constructor(props) {
    super(props);
    console.log('Users props',props);
    this.state = { users: [] };
  }
  componentWillMount()
  {
    axios.get('api/loadusers')
        .then(res =>{
          console.log('users:',res.data)
          this.setState({users: res.data});
      });
  }
  render() {
    return (
      <div>
      <ul>
        <li className="userrow">{this.state.users.map(user => {return(<User key={user.id} users={user}/>)})}</li>
      </ul>
      </div>
  )};
}
const User = (props) =>{
  console.log('User func props', props);
  return(
    <Link className="link"to={'/users/' + props.users.id} ><div className="userblock">
      <img className="propic "src={props.users.profilepicture}/>
      <h3>{props.users.username} ({props.users.lastname}, {props.users.firstname})</h3>
    </div></Link>
  );
}
export default Users;
