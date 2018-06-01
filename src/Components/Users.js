import React from 'react';
import axios from 'axios';
import "../stylesheets/Users.css"
class Users extends React.Component {
  constructor(props) {
    super(props);
    console.log('User props',props);
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
        <li>{this.state.users.map(user => {return(<User key={user.id} users={user}/>)})}</li>
      </ul>
      </div>
  )
};
}
const User = (props) =>{
  console.log('User func props', props);
  return(
    <div className="userblock">
      <img className="propic "src={props.users.profilepicture}/>
      <h4>{props.users.username} ({props.users.lastname}, {props.users.firstname})</h4>
    </div>);
}
export default Users;
