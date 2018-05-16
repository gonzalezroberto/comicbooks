import "../stylesheets/Signup.css"
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Route, Redirect,Switch, withRouter } from 'react-router'
import axios from 'axios';
class Login extends React.Component {
  constructor(){
    super();
    this.state = {email: '',pass: '',redirect:'' }
  }
  handleSubmit = event => {
      var username= this.state.email,password= this.state.pass;
    axios.post(`api/login`, { username, password })
    .then( res =>{console.log('res',res); this.setState({redirect:res.data})}
    ).then(this.forceUpdate())
    .then( () => {window.location.reload()}).catch(error => {
    console.log(error.response)
});
  }
componentWillMount(){
  fetch('api/login').then(res => res.json())
  .then( json =>{ console.log('json(fetch):',json);this.setState({redirect:json});})
  .catch(error => {console.log(error.response);});
};
logout(){
  fetch('api/logout'
  ).then(res => res.json()).then( json =>
  {console.log(json);this.setState({redirect:json})}).catch(error => {
  console.log(error.response)
})
};
  render(){
     var view = loginform(this);
     if(this.state.redirect){
      return (<Redirect to="/profile" />)
    }
      else{
        return(view)
      }
}
}
function loginform(props){
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
      <a href ="/register">Don't have an account? Signup! </a>
  </div>
);
}

export default withRouter(Login);
