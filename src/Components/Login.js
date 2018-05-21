import "../stylesheets/Signup.css"
import React from 'react';
import { BrowserRouter as Router,Route, Redirect,Switch, withRouter, Link } from 'react-router-dom'
import axios from 'axios';
class Login extends React.Component {
  constructor(props){
    super(props);
    console.log(props)
    this.state = {username: '',password: '' }
  }
  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }
  // componentWillMount(){
  //   axios.get('auth/login')
  //   .then( res =>
  //     {
  //       console.log('axio.get:',res.data);
  //       this.setState({loggedIn:res.data});
  //     })
  //   .catch(error => {console.log("axios.get error");});
  // };

  logout(){
    axios.get('auth/logout')
    .then( res =>{this.setState({loggedIn:false})})
    .catch(error => {console.log(error.res);});}

  render()
  {
    console.log('loggedIn', this.loggedIn);
    if(this.loggedIn)
    return <h2>Logged in!</h2>;

    return(  <div>
        <h2>Log In</h2>
        <form onSubmit={this.handleSubmit}>
            <input className ="username"
            type ="text"
            placeholder ="username"
             onChange = {event => this.setState({username: event.target.value})}/>
          <p><input className ="password"
            type ="password"
            placeholder ="password"
             onChange = {event => this.setState({password: event.target.value})}/>
          </p>
          <p><button className ="submit" disabled={!this.validateForm()} type ="submit">Login</button></p>
        </form>
          <Link to="/register">Don't have an account? Signup! </Link>
      </div>
    );
  }
}
export default withRouter(Login);
