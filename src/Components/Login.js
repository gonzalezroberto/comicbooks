import "../stylesheets/Signup.css"
import React from 'react';
import axios from 'axios';
class Login extends React.Component {
  constructor(){
    super();
    this.state = {email: '',pass: '',redirect:'' }
  }
  handleSubmit = event => {
      var username= this.state.email,
      password= this.state.pass;
    axios.post(`api/login`, { username, password })
    .then( res =>
      {
        console.log(res);
        this.setState({redirect:res.data});

      })
  }
switchView(props){
  if(props.state.redirect === true)
  return loggedIn(props);
  else {
    return needsToLogin(props);
  }
}
componentWillMount(){
  fetch('api/login', {
  method: "GET",
  headers: {
    "Content-Type": "application/json"
  },
  credentials: "include"
}).then(res => res.json()).then( json =>
  {
    console.log(json);
    this.setState({redirect:json});

  })
}
logout()
{
  fetch('api/logout', {
  method: "GET",
  headers: {
    "Content-Type": "application/json"
  },
  credentials: "include"
}).then(res => res.json()).then( json =>
  {
    console.log(json);
    this.setState({redirect:json});
})
}
  render(){
    var view = this.switchView(this);
    return (
      <div className ="login-view">
        {view}
      </div>
    );
  }
}
  function loggedIn(props){
    return (
      <div>
        <h2>You are logged in!</h2>
          <p>
            <button className ="submit-button"
            type ="button"
            onClick = {event => props.logout()}
            >
            Logout
            </button>
          </p>
      </div>
    );
  }
  function needsToLogin(props){
    return (
      <div>
        <h2>Login form</h2>
          <p>
            <input className ="form-email"
            type ="text"
            placeholder ="username"
            onChange = {event => props.setState({email: event.target.value})}
            />
          </p>
          <p>
            <input className ="form-password"
            type ="password"
            placeholder ="password"
            onChange = {event => props.setState({pass: event.target.value})}
            />
          </p>
          <p>
            <button className ="submit-button"
            type ="button"
            onClick = {event => props.handleSubmit()}
            >
            Login
            </button>
          </p>
      </div>
    );
  }

export default Login;
