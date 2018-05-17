import "../stylesheets/Signup.css"
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Route, Redirect,Switch, withRouter } from 'react-router'
import axios from 'axios';
class Login extends React.Component {
  constructor(){
    super();
    this.state = {email: '',pass: '',loggedIn:false }
  }
  handleSubmit = event => {
      var username= this.state.email,password= this.state.pass;
    axios.post(`api/login`, { username, password })
    .then( res =>{console.log('res',res); this.setState({loggedIn:res.data})}
  ).catch(error => {  console.log(error.res)});
  }
// componentWillMount(){
//   axios.get('api/login')
//   .then( res =>{ console.log('axio.get(api/login):',res.data);this.setState({loggedIn:res.data});})
//   .catch(error => {console.log("axios.get error");});
// };
logout(){
  axios.get('api/logout')
  .then( res =>{ console.log(res);this.setState({loggedIn:false});})
  .catch(error => {console.log(error.res);});
}

  render()
  {
  return(  <div>
      <h2>logged in</h2>
        <p>
          <input className ="form-email"
          type ="text"
          placeholder ="username"
          />
        </p>
        <p>
          <input className ="form-password"
          type ="password"
          placeholder ="password"
          />
        </p>
        <p>
          <button className ="submit-button"
          type ="button"
          onClick = {event => this.handleSubmit()}
          >
          Login
          </button>
        </p>
        <a href ="/register">Don't have an account? Signup! </a>
    </div>
  );
}
}

export default Login;
